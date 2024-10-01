import { Form } from "../ui/form";
import { DeepTemplateWorkout } from "../../types";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigateGroups } from "./hooks/useNavigateGroups";
import { useLogForm } from "./hooks/useLogForm";
import { Page } from "./Page";
import { TopNav } from "./TopNav";

interface MobileLogWorkoutFormProps {
  template: DeepTemplateWorkout;
}
export const MobileLogWorkoutForm = ({
  template,
}: MobileLogWorkoutFormProps) => {
  const { form, handleSubmit } = useLogForm(template);
  const { selected, handleSelectGroup, handleClickNext, handleClickPrevious } =
    useNavigateGroups(template);

  const isLastGroup =
    template.strengthGroups.indexOf(selected) + 1 ===
    template.strengthGroups.length;
  return (
    <div className={cn("max-md:mb-[150px] mb-[90px] flex flex-col")}>
      <div className="relative">
        <TopNav
          selectedGroup={selected}
          onClickGroup={handleSelectGroup}
          template={template}
        />
        <div className="h-max w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
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
                    <Page group={selected} key={selected.id} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </form>
          </Form>
        </div>
        <div className="fixed bottom-0 left-0 w-full h-[75px] flex justify-end border-t-[1px] bg-white border-black text-lg">
          <button
            className="h-full w-[125px] border-l-[1px] border-black"
            onClick={handleClickPrevious}
          >
            Previous
          </button>
          {isLastGroup ? (
            <button
              className="h-full w-[125px] bg-green-300 font-bold border-l-[1px] border-black"
              onClick={handleClickNext}
            >
              Finish
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
