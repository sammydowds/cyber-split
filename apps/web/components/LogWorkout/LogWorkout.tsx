import { Form } from "../ui/form";
import { DeepTemplateWorkout } from "../../types";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigateGroups } from "./hooks/useNavigateGroups";
import { useLogForm } from "./hooks/useLogForm";
import { Page } from "./Page";
import { TopNav } from "./TopNav";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { Check, CheckCircle, CheckCircle2, LoaderCircle } from "lucide-react";

export function SavedDialog() {
  return (
    <AlertDialog open>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{}</AlertDialogTitle>
          <AlertDialogDescription>
            Your workout data has been persisted to the database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Dashboard</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

interface LogWorkoutProps {
  template: DeepTemplateWorkout;
}
export const LogWorkout = ({ template }: LogWorkoutProps) => {
  const { form, handleSubmit, isSaving, loggedWorkout } = useLogForm(template);
  const router = useRouter();
  const { selected, handleSelectGroup, handleClickNext, handleClickPrevious } =
    useNavigateGroups(template);

  const groupIdx = template.strengthGroups.indexOf(selected);
  const isLastGroup = groupIdx + 1 === template.strengthGroups.length;

  return (
    <div
      className={cn(
        "max-md:mb-[150px] mb-[90px] flex flex-col w-full md:border-b-[1px] md:border-black md:border-x-[1px] bg-white",
      )}
    >
      <AlertDialog open={isSaving || !!loggedWorkout}>
        <AlertDialogContent className="bg-white p-0 border-y-[1px] border-black flex-none">
          <table className="w-full border-collapse">
            <thead className="">
              <tr>
                <th
                  colSpan={2}
                  className="border border-gray-400 p-2 text-left bg-yellow-300 bg-opacity-80"
                >
                  Persisting to Database
                </th>
              </tr>
              <tr>
                <th className="border border-gray-400 p-2">Status</th>
                <th className="border border-gray-400 p-2">Message</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-400 p-2">
                  <div className="flex items-center justify-center">
                    {isSaving ? (
                      <div className="flex items-center gap-[4px]">
                        <LoaderCircle className="animate-spin" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-[4px] h-6 w-6 rounded-full bg-green-600">
                        <Check className="text-white" size={14} />
                      </div>
                    )}
                  </div>
                </td>
                <td className="border border-gray-400 p-2">
                  <div className="flex items-center justify-center font-bold">
                    {isSaving ? (
                      <span className="text-stone-500">
                        Connecting to servers...
                      </span>
                    ) : (
                      "Saved to database"
                    )}
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan={2} className="border border-gray-400 h-[50px]">
                  <button
                    disabled={isSaving}
                    className={cn(
                      "font-bold h-full w-full p-0 bg-black text-white",
                      isSaving ? "opacity-50" : "",
                    )}
                    onClick={() => router.push("/dashboard")}
                  >
                    Return to Dashboard
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </AlertDialogContent>
      </AlertDialog>
      <div className="relative">
        <TopNav
          selectedGroup={selected}
          onClickGroup={handleSelectGroup}
          template={template}
        />
        <div className="grow w-full">
          <Form {...form}>
            <form id="log-workout" onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="flex items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    className="w-full"
                    key={selected.id}
                    initial={{
                      opacity: 0,
                    }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  >
                    <Page
                      group={selected}
                      key={selected.id}
                      groupIdx={groupIdx}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </form>
          </Form>
        </div>

        <div className="max-md:fixed bottom-0 left-0 w-full h-[75px] flex justify-end border-t-[1px] bg-white border-black text-lg">
          <button
            className="h-full w-[125px] border-l-[1px] border-black"
            onClick={handleClickPrevious}
          >
            Previous
          </button>
          {isLastGroup ? (
            <button
              className="h-full w-[125px] bg-red-300 font-bold border-l-[1px] border-black"
              type="submit"
              form="log-workout"
            >
              End
            </button>
          ) : (
            <button
              className="h-full w-[125px] bg-black text-white"
              onClick={handleClickNext}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
