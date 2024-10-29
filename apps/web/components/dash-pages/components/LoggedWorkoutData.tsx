import { DeepLoggedWorkout } from "@repo/database";
import { Separator } from "../../ui/separator";
import { useLoggedWorkoutData } from "./useLoggedWorkoutData";
import { useState } from "react";
import { WorkoutComparison } from "./WorkoutComparison";
import { ChartNoAxesCombined } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface LoggedWorkoutDataProps {
  workout: DeepLoggedWorkout;
}
export const LoggedWorkoutData = ({ workout }: LoggedWorkoutDataProps) => {
  const { daysAgoText, workoutName, splitName } = useLoggedWorkoutData({
    workout,
  });
  const [showCompare, setShowCompare] = useState(false);

  return (
    <div className="flex flex-col w-full md:max-w-[300px] relative">
      <div className="font-bold absolute top-[4px] right-2 text-[10px]">
        {daysAgoText}
      </div>
      <div className="flex flex-col mb-2">
        <div className="font-bold tracking-tightest">{workoutName}</div>
        <div className="text-xs flex items-center justify-between">
          <div>
            {splitName ? (
              <>
                via <span className="italic">{splitName}</span>
              </>
            ) : null}
          </div>
          <div className="flex items-center justify-end gap-[4px]">
            <ChartNoAxesCombined size={16} />
            <Switch
              checked={showCompare}
              onCheckedChange={() => setShowCompare(!showCompare)}
              className="text-xs"
            ></Switch>
          </div>
        </div>
      </div>

      <Separator />

      <div className="mt-2">
        {showCompare ? (
          <WorkoutComparison workout={workout} />
        ) : (
          <>
            {workout.strengthGroups.map((group) => {
              const loggedSets = group.sets.filter((set) => set.dateLogged);
              if (!loggedSets.length) {
                return null;
              }

              const formattedSets = loggedSets
                .map((set) => `${set.reps ?? " - "}x${set.weight ?? " - "}`)
                .join(", ");
              return (
                <div className="flex items-center justify-between">
                  <div className="text-xs">{group.name}</div>
                  <div className="flex items-center text-xs">
                    {formattedSets}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};
