import { ActiveSplitDeep } from "@repo/database";
import { useMiniLoggedWorkout } from "./useMiniLoggedWorkoutCard";
import { useMemo } from "react";
import { WorkoutMarker } from "@/components/WorkoutMarker";

interface MiniLoggedWorkoutCardProps {
  workout: ActiveSplitDeep["split"]["loggedWorkouts"][number];
}
export const MiniLoggedWorkoutCard = ({
  workout,
}: MiniLoggedWorkoutCardProps) => {
  const { daysAgoText, workoutName } = useMiniLoggedWorkout({
    workout,
  });

  const volume = useMemo(() => {
    let tempVol = 0;
    workout?.strengthGroups?.map((group) => {
      group?.sets?.map((set) => {
        if (set?.reps && set?.weight) {
          tempVol = tempVol + set.reps * set.weight;
        }
      });
    });
    return tempVol;
  }, [workout]);

  return (
    <div className="flex flex-col w-full max-md:min-w-[250px] md:max-w-[250px] relative border-[1px] rounded p-2">
      <div className="font-bold absolute top-[4px] right-2 text-[10px]">
        {daysAgoText}
      </div>
      <div className="font-bold absolute top-[6px] left-2 text-[10px]">
        <WorkoutMarker
          text={workout.letterLabel}
          className="h-3 w-3 text-[8px] shadow-none"
        />
      </div>
      <div className="flex items-center justify-between px-2 pt-4 pb-2">
        <div className="font-bold tracking-tightest text-xl max-w-[120px] truncate">
          {workoutName}
        </div>
        <div className="font-bold tracking-tightest rounded-lg bg-green-50 px-[12px] tracking-tighter text-lg text-stone-800">
          {volume ? volume.toLocaleString() : "-"}
        </div>
      </div>
    </div>
  );
};
