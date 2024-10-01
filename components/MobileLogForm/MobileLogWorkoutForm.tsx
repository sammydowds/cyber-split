import { Form } from "../ui/form";
import { DeepTemplateWorkout } from "../../types";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigateGroups } from "./hooks/useNavigateGroups";
import { useLogForm } from "./hooks/useLogForm";
import { Page } from "./Page";
import { GroupNav } from "./GroupNav";

interface MobileLogWorkoutFormProps {
  template: DeepTemplateWorkout;
}
export const MobileLogWorkoutForm = ({
  template,
}: MobileLogWorkoutFormProps) => {
  const { form, handleSubmit } = useLogForm(template);
  const { selected, handleSelectGroup, handleClickNext, handleClickPrevious } =
    useNavigateGroups(template);

  return (
    <div className={cn("max-md:mb-[150px] mb-[90px] flex flex-col")}>
      <div className="relative">
        <GroupNav
          selectedGroup={selected.group}
          onClickGroup={handleSelectGroup}
          groups={template.strengthGroups}
        />
        <div className="h-max w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="flex items-center">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    className="w-full"
                    key={selected.group.id}
                    initial={{
                      x: selected.swipeDirection === "left" ? 100 : -100,
                      opacity: 0.5,
                    }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  >
                    <Page group={selected.group} key={selected.group.id} />
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
          <button
            className="h-full w-[125px] bg-black text-white"
            onClick={handleClickNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
