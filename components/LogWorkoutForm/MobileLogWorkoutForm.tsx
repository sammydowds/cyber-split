import { useForm, useFormContext, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./zodSchema";
import { Form } from "../ui/form";
import { DeepLoggedWorkout, DeepTemplateWorkout } from "../../types";
import { useEffect, useState } from "react";
import { LogWorkoutSchema } from "./types";
import { clearDB, LOG_WORKOUT_KEY, saveToDB } from "@/lib/indexedDb";
import { useCreateLoggedWorkout } from "@/hooks/useCreateLoggedWorkout";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { MobileNavBackground } from "../MobileNavBackground";

export const ExerciseData = ({
  group,
}: {
  group: DeepTemplateWorkout["strengthGroups"][number];
}) => {
  return (
    <div className="w-full h-full flex flex-col relative">
      <div className="flex items-center px-6 py-2 font-bold text-xl tracking-tighter relative border-b-[1px] border-black">
        <span className="z-50">{group.name}</span>
      </div>
      <div className="flex flex-col text-center">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b border-x border-gray-300 p-2">Set</th>
              <th className="border-b border-x border-gray-300 p-2">Reps</th>
              <th className="border-b border-x border-gray-300 p-2">Weight</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">Data 1</td>
              <td className="border border-gray-300 p-2">Data 2</td>
              <td className="border border-gray-300 p-2">Data 3</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Data 1</td>
              <td className="border border-gray-300 p-2">Data 2</td>
              <td className="border border-gray-300 p-2">Data 3</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Data 1</td>
              <td className="border border-gray-300 p-2">Data 2</td>
              <td className="border border-gray-300 p-2">Data 3</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Data 1</td>
              <td className="border border-gray-300 p-2">Data 2</td>
              <td className="border border-gray-300 p-2">Data 3</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Data 1</td>
              <td className="border border-gray-300 p-2">Data 2</td>
              <td className="border border-gray-300 p-2">Data 3</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

interface MobileLogWorkoutFormProps {
  template: DeepTemplateWorkout;
}
export const MobileLogWorkoutForm = ({
  template,
}: MobileLogWorkoutFormProps) => {
  const [summary, setSummary] = useState<DeepLoggedWorkout | undefined>();
  const queryCient = useQueryClient();
  const form = useForm<LogWorkoutSchema>({
    resolver: zodResolver(schema),
    defaultValues: template,
  });
  const [selected, setSelected] = useState<{
    group: DeepTemplateWorkout["strengthGroups"][number];
    swipeDirection: "left" | "right";
  }>({ group: template.strengthGroups[0], swipeDirection: "left" });

  const { mutate: save, isPending: creatingLoggedWorkout } =
    useCreateLoggedWorkout({
      onSuccess: async (data) => {
        const { data: loggedWorkout } = data;
        // clear state
        await clearDB();
        queryCient.invalidateQueries();
        form.reset();

        setSummary(loggedWorkout);
      },
    });

  const handleSubmit = (data: LogWorkoutSchema) => {
    save(data);
  };

  const handleFormChange = async (data: LogWorkoutSchema) => {
    await saveToDB(`${LOG_WORKOUT_KEY}-${template.id}`, data);
  };

  const values = form.watch();
  useEffect(() => {
    if (!creatingLoggedWorkout) {
      handleFormChange?.(values);
    }
  }, [handleFormChange, values]);

  const handleClickExercise = (
    group: DeepTemplateWorkout["strengthGroups"][number],
  ) => {
    const prevIdx = template.strengthGroups.indexOf(selected.group);
    const nextIdx = template.strengthGroups.indexOf(group);
    setSelected({
      group,
      swipeDirection: prevIdx > nextIdx ? "right" : "left",
    });
  };

  return (
    <div
      className={cn(
        "max-md:mb-[150px] mb-[90px] flex flex-col",
        summary ? "blur-md" : "",
      )}
    >
      <div className="relative">
        <div className="w-full overflow-x-scroll snap-x snap-mandatory flex divide-x divide-dashed shadow z-[100]">
          <div className="flex w-max divide-x divide-solid divide-black border-y-[1px] border-black">
            {template.strengthGroups.map((g) => (
              <div
                key={g.id}
                id={g.id}
                onClick={() => handleClickExercise(g)}
                className={cn(
                  "h-[75px] min-w-[150px] snap-start flex flex-col font-bold text-stone-400 items-center justify-center bg-stone-200/80 cursor-pointer p-2 flex-nowrap",
                  selected.group.id === g.id ? "bg-white text-black" : "",
                )}
              >
                <div className="whitespace-nowrap text-[16px]">{g.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="h-max w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="flex items-center">
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
                  <ExerciseData
                    group={selected.group}
                    key={selected.group.id}
                  />
                </motion.div>
              </div>
            </form>
          </Form>
        </div>
        <div className="fixed bottom-0 left-0 w-full h-[50px] flex justify-end border-t-[1px] bg-white border-black">
          <button className="h-full w-[100px] border-l-[1px] border-black">
            Previous
          </button>
          <button className="h-full w-[100px] bg-black text-white">Next</button>
        </div>
      </div>
    </div>
  );
};
