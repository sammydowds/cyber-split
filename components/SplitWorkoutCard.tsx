import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { SplitDeep } from "@/types";
import { Separator } from "@/components/ui/separator";
import { WorkoutMarker } from "./WorkoutMarker";
import { useRouter } from "next/router";
import { estimateTimeOfWorkout } from "@/lib/estimateTimeOfWorkout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { StrengthGroup } from "@prisma/client";
import { SwapGroupDropdown } from "./SwapGroupDropdown";
import { FormSchemaType } from "./SplitForm/schema";
import toast from "react-hot-toast";
import {
  Anchor,
  ArrowRightLeft,
  Boxes,
  Focus,
  Group,
  Link,
  Target,
} from "lucide-react";
import { boolean } from "zod";
import { DesktopNavBackground } from "./DesktopNavBackground";
import { MobileNavBackground } from "./MobileNavBackground";

interface WorkoutCardProps {
  split: Partial<SplitDeep>;
  index: number;
  onWorkoutChange?: (workout: FormSchemaType["workouts"][number]) => void;
  hideCta?: boolean;
  editable?: boolean;
}
export const SplitWorkoutCard = ({
  split,
  index,
  hideCta,
  onWorkoutChange,
  editable = false,
}: WorkoutCardProps) => {
  const router = useRouter();
  const workout = split?.workouts?.[index];

  if (!split.workouts?.length || !workout) {
    return null;
  }

  const ignoreExercises = Array.from(
    new Set(
      workout.strengthGroups.flatMap((group) => {
        return group.sets.flatMap((set) => set?.exercise?.id);
      }),
    ),
  );

  const handleClickLog = () => {
    router.push(`/log-workout/${workout.id}`);
  };

  const handleWorkoutChange = (
    oldGroup: StrengthGroup,
    group: StrengthGroup,
  ) => {
    const newGroups = workout.strengthGroups.map((g) => {
      if (g.name === oldGroup.name) {
        return group;
      } else {
        return g;
      }
    });
    toast(
      <div className="flex flex-col text-sm gap-[4px] text-stone-500 w-[245px]">
        <div className="flex gap-[6px] items-center font-bold text-sm tracking-tighter">
          <WorkoutMarker
            text={workout.letterLabel}
            className="h-[28px] w-[28px]"
          />
          <div className="leading-3">{workout.name}</div>
        </div>
        <div className="font-semibold text-black flex items-center gap-[4px]">
          <ArrowRightLeft size="16px" className="text-stone-500" />
          <span className="truncate max-w-[160px]">{oldGroup.name}</span>
        </div>
        <div>
          to{" "}
          <span className="truncate max-w-[160px] font-semibold text-black">
            {group.name}
          </span>
        </div>
      </div>,
      {
        position: "top-right",
        style: { padding: "2px" },
      },
    );
    onWorkoutChange?.({ ...workout, strengthGroups: newGroups });
  };

  const estTimeMins = estimateTimeOfWorkout(workout);

  return (
    <Card className="w-[345px] overflow-hidden shadow-sm rounded-md shadow-[5px_5px_2px_rgba(0,0,0,0.15)] relative">
      <div className="h-[46px] w-full relative">
        <MobileNavBackground />
      </div>
      <CardHeader className="p-2 pl-4">
        <CardTitle className="flex justify-between items-center gap-2 pr-4">
          <div className="flex gap-[6px] font-bold text-sm tracking-tighter">
            <WorkoutMarker
              text={workout.letterLabel}
              className="h-[44px] w-[44px] absolute top-[18px] text-xl border-black border-[1px]"
            />
            <div className="flex flex-col py-[8px] mt-[12px] ml-[4px] gap-[6px]">
              <div className="leading-3 text-xl">{workout.name}</div>
              <div className="flex items-center text-xs text-stone-400 gap-[4px]">
                <div>{estTimeMins} mins</div>
                <Separator
                  orientation="vertical"
                  className="w-[2px] h-[12px]"
                />
                <div>{workout.strengthGroups?.length} exercises</div>
              </div>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="p-0 overflow-scroll h-[245px]">
        <Table className="bg-white flex flex-col gap-[4px]">
          <TableBody>
            {workout?.strengthGroups?.map((g) => {
              const parts = Array.from(
                new Set(
                  g.sets.map((s) => s.exercise?.bodyPart?.toLocaleLowerCase()),
                ),
              );
              const synergists = Array.from(
                new Set(
                  g.sets.flatMap((s) =>
                    s.exercise?.synergists?.flatMap((s) =>
                      s.toLocaleLowerCase().split("_").join(" "),
                    ),
                  ),
                ),
              );
              const targets = Array.from(
                new Set(
                  g.sets
                    .flatMap((s) => {
                      return s.exercise.target &&
                        parts.includes(s.exercise?.target?.toLocaleLowerCase())
                        ? undefined
                        : s.exercise?.target
                            ?.split("_")
                            .join(" ")
                            .toLocaleLowerCase();
                    })
                    .filter(Boolean),
                ),
              );
              const stabilizers = Array.from(
                new Set(
                  g.sets.flatMap((s) =>
                    s.exercise?.stabilizers?.flatMap((s) =>
                      s.toLocaleLowerCase().split("_").join(" "),
                    ),
                  ),
                ),
              );
              return (
                <TableRow
                  key={g.name}
                  className="flex items-start justify-between text-xs px-[4px]"
                >
                  <TableCell className="font-bold flex flex-col">
                    <div className="text-[14px]">{g.name}</div>
                    <div className="flex items-center flex-wrap gap-[4px] max-w-[245px] py-[4px]">
                      {parts.map((m) => {
                        return (
                          <>
                            <div key={m}>
                              <span className="capitalize text-stone-400/90 font-semibold flex items-center gap-[2px]">
                                <Group className="text-green-400" size={14} />
                                {m}
                              </span>
                            </div>
                          </>
                        );
                      })}
                      {synergists.map((s) => {
                        return (
                          <>
                            <div key={s}>
                              <span className="capitalize text-stone-400/90 font-semibold flex items-center gap-[2px]">
                                <Link className="text-stone-800" size={14} />
                                {s}
                              </span>
                            </div>
                          </>
                        );
                      })}
                      {targets.map((s) => {
                        return (
                          <>
                            <div key={s}>
                              <span className="capitalize text-stone-400/90 font-semibold flex items-center gap-[2px]">
                                <Target className="text-red-400" size={14} />
                                {s}
                              </span>
                            </div>
                          </>
                        );
                      })}
                      {stabilizers.map((s) => {
                        return (
                          <>
                            <div key={s}>
                              <span className="capitalize text-stone-400/90 font-semibold flex items-center gap-[2px]">
                                <Anchor className="text-blue-400" size={14} />
                                {s}
                              </span>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </TableCell>
                  <TableCell>
                    {editable ? (
                      <SwapGroupDropdown
                        oldGroup={g}
                        onClickGroup={handleWorkoutChange}
                        ignoreExercises={ignoreExercises}
                      />
                    ) : null}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
      {hideCta ? null : (
        <>
          <Separator />
          <CardFooter className={cn("p-2 flex items-center justify-center")}>
            <Button
              className="w-full font-bold text-md"
              size="lg"
              onClick={handleClickLog}
            >
              Log Workout
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
};
