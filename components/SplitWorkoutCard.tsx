import { ReactNode } from "react";
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

export const WORKOUT_LABELS = ["A", "B", "C", "D"] as const;

export const getWorkoutLetterFromIndex = (idx: number, count: number) => {
  if (count === 1) {
    return "W";
  }
  return WORKOUT_LABELS[idx];
};


interface WorkoutCardProps {
  split: Partial<SplitDeep>;
  index: number;
  hideCta?: boolean;
}
export const SplitWorkoutCard = ({
  split,
  index,
  hideCta,
}: WorkoutCardProps) => {
  const router = useRouter();
  const workout = split?.workouts?.[index];
  if (!split.workouts?.length || !workout) {
    return null;
  }

  const handleClickLog = () => {
    router.push(`/log-workout/${workout.id}`);
  };

  const letter = getWorkoutLetterFromIndex(index, split?.workouts?.length);
  const estTimeMins = Math.round(estimateTimeOfWorkout(workout) / 60);

  return (
    <Card className="w-[290px] overflow-hidden shadow-sm">
      <CardHeader className="p-2">
        <CardTitle className="flex justify-between items-center gap-2 pr-4">
          <div className="flex gap-[6px] font-bold text-sm tracking-tighter">
            <WorkoutMarker text={letter} className="h-[28px] w-[28px]" />
            <div className="flex flex-col pt-[2px]">
              <div className="leading-3">{workout.name}</div>
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
      <CardContent className="p-0 overflow-scroll h-[250px]">
        <Table className="bg-white flex flex-col gap-[4px]">
          <TableBody>
            {workout?.strengthGroups?.map((g) => {
              const targetMuscles = Array.from(
                new Set(
                  g.sets.map((s) => s.exercise.bodyPart?.toLocaleLowerCase()),
                ),
              );
              return (
                <TableRow
                  key={g.name}
                  className="flex items-start justify-between text-xs"
                >
                  <TableCell className="font-bold flex flex-col">
                    <div>{g.name}</div>
                    {targetMuscles.map((m) => {
                      return (
                        <div key={m}>
                          <span className="capitalize text-stone-400/90 text-xs font-semibold">
                            {m}
                          </span>
                        </div>
                      );
                    })}
                  </TableCell>
                  <TableCell>
                    {g.sets.length}x{g.sets.map((set) => set.reps).join(",")}
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
            <Button className="w-full" onClick={handleClickLog}>
              Log Workout
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
};
