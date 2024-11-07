import { useFormContext, useWatch } from "react-hook-form";
import { GroupSummary } from "./GroupSummary";
import { WorkoutMarker } from "@/components/WorkoutMarker";
import Link from "next/link";
import { deleteFromDB, LOG_WORKOUT_KEY } from "@/lib/indexedDb";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

export const WorkoutSummary = () => {
  const { control } = useFormContext();
  const queryClient = useQueryClient();
  const workout = useWatch({
    control,
  });

  const handleResetForm = async (e: React.MouseEvent) => {
    e?.preventDefault();
    await deleteFromDB(`${LOG_WORKOUT_KEY}-${workout.id}`);
    queryClient.invalidateQueries({ queryKey: ["logData", workout.id] });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-[8px] w-full">
        <div className="text-sm">
          <h2 className="text-2xl font-bold">{workout?.name}</h2>
          <div className="flex items-center gap-[6px]">
            Workout{" "}
            <WorkoutMarker
              className="text-xs h-4 w-4"
              text={workout?.letterLabel ?? ""}
            />{" "}
            of{" "}
            <Link href={"/dashboard/active"} className="underline text-sm">
              {workout.name}
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center w-full">
        <div className="font-bold">
          {workout.strengthGroups.length} Exercises{" "}
        </div>
        <div>
          <Button
            variant="link"
            className="flex items-center gap-[2px]"
            onClick={(e) => handleResetForm(e)}
          >
            <RotateCcw size={12} />
            Reset all
          </Button>
        </div>
      </div>
      {workout.strengthGroups?.map((group, idx) => {
        return <GroupSummary group={group} groupIdx={idx} />;
      })}
    </div>
  );
};
