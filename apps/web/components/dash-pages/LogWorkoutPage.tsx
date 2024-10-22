import { ActiveSplitDeep, DeepTemplateWorkout } from "@repo/database";
import {
  Section,
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from "./components/sections";
import { Page } from "./components/pages";
import { WorkoutMarker } from "../WorkoutMarker";
import { useLogForm } from "./hooks/useLogForm";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useWatch } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { NumberInput } from "../NumberInput";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { Loader } from "lucide-react";
import { useDraftLoggedWorkout } from "./hooks/useDraftLoggedWorkout";

interface LogWorkoutPageProps {
  activeSplit: ActiveSplitDeep;
  workoutId: string;
}
export const LogWorkoutPage = ({
  activeSplit,
  workoutId,
}: LogWorkoutPageProps) => {
  const { data: draft, isPending: loadingDraft } =
    useDraftLoggedWorkout(workoutId);
  const workout = activeSplit.split.workouts.filter(
    (w) => w.id === workoutId,
  )[0];
  const router = useRouter();
  const { form, handleSubmit, isSaving, loggedWorkout } = useLogForm(workout);

  useEffect(() => {
    if (!loadingDraft && draft) {
      form.reset(draft);
    }
  }, [loadingDraft]);

  const { control, setValue } = form;

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

  const handleWeightChange = (
    groupIdx: number,
    setIdx: number,
    num?: number,
  ) => {
    setValue(`strengthGroups.${groupIdx}.sets.${setIdx}.weight`, num);
  };
  const handleRepsChange = (groupIdx: number, setIdx: number, num?: number) => {
    setValue(`strengthGroups.${groupIdx}.sets.${setIdx}.reps`, num);
  };
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
    <Page>
      <Section>
        <SectionHeader>
          <div className="flex items-center gap-[8px]">
            <div className="flex items-start h-full">
              <span
                role="img"
                aria-label="🗒️"
                className="flex items-start text-[36px] p-0 m-0"
              >
                🗒️
              </span>
            </div>
            <div className="text-sm">
              <h2 className="text-2xl font-bold">{workout.name}</h2>
              <div className="flex items-center gap-[6px]">
                Workout{" "}
                <WorkoutMarker
                  className="text-xs h-4 w-4"
                  text={workout.letterLabel}
                />{" "}
                of{" "}
                <Link href={"/dashboard/active"} className="underline text-sm">
                  {activeSplit.split.name}
                </Link>
              </div>
            </div>
          </div>
        </SectionHeader>
      </Section>
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
                          <tr className="flex items-center gap-2">
                            <td className="flex items-center gap-2 w-[90px] text-nowrap">
                              <Checkbox
                                onCheckedChange={(checked) =>
                                  handleCheckToggle(groupIdx, setIdx, checked)
                                }
                                className="h-[30px] w-[30px] rounded-none border-2"
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
                              <NumberInput
                                value={reps}
                                onChange={(val?: number) =>
                                  handleRepsChange(groupIdx, setIdx, val)
                                }
                              ></NumberInput>
                            </td>
                            <td
                              className={cn(
                                "h-[40px] w-[60px]",
                                dateLogged ? "text-stone-400" : "",
                              )}
                            >
                              <NumberInput
                                value={weight}
                                onChange={(val?: number) =>
                                  handleWeightChange(groupIdx, setIdx, val)
                                }
                              ></NumberInput>
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
              className="max-md:w-full font-bold"
            >
              {isSaving ? <Loader className="animate-spin" /> : "Log Workout"}
            </Button>
          </div>
        </form>
      </Form>
    </Page>
  );
};
