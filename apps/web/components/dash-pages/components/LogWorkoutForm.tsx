import { Section } from "../components/sections";
import { Form } from "../../ui/form";
import { Checkbox } from "../../ui/checkbox";
import { cn } from "@/lib/utils";
import { Button } from "../../ui/button";
import { Loader, RotateCcw } from "lucide-react";
import { DeepLoggedWorkout } from "@repo/database";
import { useLogForm } from "../hooks/useLogForm";
import { useWatch } from "react-hook-form";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { deleteFromDB, LOG_WORKOUT_KEY } from "@/lib/indexedDb";
import { useQueryClient } from "@tanstack/react-query";

interface LogWorkoutFormProps {
  workout: DeepLoggedWorkout;
}
export const LogWorkoutForm = ({ workout }: LogWorkoutFormProps) => {
  const { form, handleSubmit, isSaving, loggedWorkout } = useLogForm(workout);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { control, setValue, reset } = form;

  const strengthGroups = useWatch({
    control,
    name: "strengthGroups",
  });

  useEffect(() => {
    if (loggedWorkout) {
      toast.success("Workout saved to server.", { duration: 3000 });
      router.push("/dashboard/active");
    }
  }, [loggedWorkout]);

  const handleCheckToggle = (
    groupIdx: number,
    setIdx: number,
    checked: boolean | string,
  ) => {
    setValue(
      `strengthGroups.${groupIdx}.sets.${setIdx}.dateLogged`,
      checked === true ? new Date() : null,
    );
  };

  return (
    <Form {...form}>
      <form
        id="log-workout"
        className="w-full"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="flex flex-col items-center gap-12">
          {strengthGroups?.map((group, groupIdx) => {
            return (
              <Section>
                <div className="flex items-center text-xl font-bold w-full">
                  {group.name}
                </div>
                <table className="w-full mx-2">
                  <thead className="flex items-center gap-2">
                    <th className="w-[90px]"></th>
                    <th className="w-[60px] flex justify-center text-xs font-normal">
                      Reps
                    </th>
                    <th className="w-[60px] flex justify-center text-xs font-normal">
                      Weight
                    </th>
                    <th className="w-[60px] flex justify-center text-xs font-normal"></th>
                  </thead>
                  <tbody>
                    {group.sets.map((set, setIdx) => {
                      const { reps, weight, dateLogged } = set;
                      return (
                        <tr className="flex items-center gap-2" key={setIdx}>
                          <td className="flex items-center gap-2 w-[90px] text-nowrap">
                            <Checkbox
                              onCheckedChange={(checked) =>
                                handleCheckToggle(groupIdx, setIdx, checked)
                              }
                              className="h-[30px] w-[30px]"
                              checked={!!dateLogged}
                            />
                            <div
                              className={cn(
                                dateLogged
                                  ? "line-through text-stone-400 decoration-[2px] decoration-stone-800/30"
                                  : "",
                              )}
                            >
                              Set {setIdx + 1}
                            </div>
                          </td>
                          <td
                            className={cn(
                              "h-[40px] w-[60px]",
                              dateLogged ? "text-stone-400" : "",
                            )}
                          >
                            <div className="flex items-center gap-[2px] justify-center h-full">
                              <input
                                type="text"
                                inputMode="numeric"
                                className={cn(
                                  "h-full w-full text-center rounded-sm bg-stone-50/80 focus:outline-black p-0",
                                )}
                                {...form.register(
                                  `strengthGroups.${groupIdx}.sets.${setIdx}.reps`,
                                )}
                              />
                            </div>
                          </td>
                          <td
                            className={cn(
                              "h-[40px] w-[60px]",
                              dateLogged ? "text-stone-400" : "",
                            )}
                          >
                            <div className="flex items-center gap-[2px] justify-center h-full">
                              <input
                                type="text"
                                inputMode="numeric"
                                className={cn(
                                  "h-full w-full text-center rounded-sm bg-stone-50/80 focus:outline-black p-0",
                                )}
                                {...form.register(
                                  `strengthGroups.${groupIdx}.sets.${setIdx}.weight`,
                                )}
                              />
                            </div>
                          </td>
                          <td></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Section>
            );
          })}
          <Button
            disabled={isSaving}
            type="submit"
            className="max-md:w-full font-bold h-[40px] text-lg"
          >
            {isSaving ? <Loader className="animate-spin" /> : "Log Workout"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
