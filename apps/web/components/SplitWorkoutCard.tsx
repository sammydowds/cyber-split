import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { SplitDeep } from "@repo/database";
import { Separator } from "@/components/ui/separator";
import { WorkoutMarker } from "./WorkoutMarker";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { StrengthGroup } from "@repo/database/src/client";
import { SwapGroupDropdown } from "./SwapGroupDropdown";
import { FormSchemaType } from "./SplitForm/schema";
import toast from "react-hot-toast";
import { ArrowRightLeft } from "lucide-react";

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
    router.push(`/dashboard/active/log-workout/${workout.id}`);
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
      <div className="flex flex-col text-sm gap-[4px] text-stone-500 w-[245px] z-[100]">
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

  return (
    <Card className="w-[245px] overflow-hidden shadow-sm rounded-lg shadow-[5px_5px_2px_rgba(0,0,0,0.15)] relative">
      <CardHeader className="p-[8px]">
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center gap-2 ml-[4px]">
            <WorkoutMarker
              className="h-6 w-6 shadow-none"
              text={workout.letterLabel}
            />
            <div className="text-lg max-w-[180px] truncate">{workout.name}</div>
          </div>
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="p-0 overflow-scroll h-[200px]">
        <Table className="bg-white flex flex-col gap-[4px]">
          <TableBody>
            {workout?.strengthGroups?.map((g, idx) => {
              return (
                <TableRow
                  key={g.name}
                  className="flex items-start justify-between text-xs px-[4px] border-dotted"
                >
                  <TableCell className="font-bold flex flex-col py-[6px] gap-[2px]">
                    <div className="text-xs flex items-center gap-[2px] text-stone-400">
                      <div>{idx + 1}.</div>
                      <div className="capitalize">
                        {g.sets[0].exercise.bodyPart?.toLocaleLowerCase()}
                      </div>
                    </div>
                    <div className="leading-5 text-[14px]">{g.name}</div>
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
          <CardFooter
            className={cn("flex items-center justify-center px-[4px] py-2")}
          >
            <Button className="w-full" onClick={handleClickLog}>
              Log Workout
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
};
