import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ActiveSplitDeep } from "@repo/database";
import { Separator } from "@/components/ui/separator";
import { WorkoutMarker } from "./WorkoutMarker";
import { useRouter } from "next/router";
import { StrengthGroup } from "@repo/database/src/client";
import { SwapGroupDropdown } from "./SwapGroupDropdown";
import { FormSchemaType } from "@/lib/formSchemas/create";
import toast from "react-hot-toast";
import { ArrowRightLeft } from "lucide-react";

interface SmallWorkoutTemplateCardProps {
  workout?: ActiveSplitDeep["split"]["workouts"][number];
  onWorkoutChange?: (workout: FormSchemaType["workouts"][number]) => void;
  editable?: boolean;
  hideCta?: boolean;
}
export const SmallWorkoutTemplateCard = ({
  workout,
  onWorkoutChange,
  editable,
  hideCta,
}: SmallWorkoutTemplateCardProps) => {
  const router = useRouter();

  if (!workout) {
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
    router.push(`/dashboard/log-workout/${workout.id}`);
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
      <div className="flex flex-col text-xs gap-[4px] text-stone-500 w-[200px] z-[100]">
        <div className="flex gap-[6px] items-center font-bold text-xs tracking-tighter">
          <WorkoutMarker
            text={workout.letterLabel}
            className="h-[14px] w-[14px]"
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
    <Card className="min-w-[220px] overflow-hidden shadow-sm rounded-sm relative">
      <CardHeader className="p-[8px]">
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center gap-2 ml-[4px]">
            <WorkoutMarker
              className="h-4 w-4 shadow-none text-xs"
              text={workout.letterLabel}
            />
            <div className="text-sm max-w-[180px] truncate">{workout.name}</div>
          </div>
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="p-0 overflow-scroll h-[190px]">
        <Table className="bg-white flex flex-col gap-[4px]">
          <TableBody>
            {workout?.strengthGroups?.map((g, idx) => {
              return (
                <TableRow
                  key={g.name}
                  className="flex items-start justify-between text-xs px-[4px] py-[4px] border-dotted"
                >
                  <TableCell className="font-bold flex flex-col py-[6px] gap-[2px]">
                    <div className="leading-5 text-[13px]">{g.name}</div>
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
      <>
        <Separator />
      </>
    </Card>
  );
};