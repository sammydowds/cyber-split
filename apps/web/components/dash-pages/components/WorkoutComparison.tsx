import { usePreviousWorkout } from "@/hooks/usePreviousWorkout";
import { DeepLoggedWorkout } from "@repo/database";
import { useState } from "react";
import { useCompareSetsData } from "./useCompareSetsData";
import { ArrowDown, ArrowUp } from "lucide-react";

interface WorkoutComparisonProps {
  workout: DeepLoggedWorkout;
}
export const WorkoutComparison = ({ workout }: WorkoutComparisonProps) => {
  const [type, setType] = useState<"FIRST" | "LAST">("FIRST");
  const { data: previousWorkout, error } = usePreviousWorkout({
    templateWorkoutId: workout.templateWorkoutId,
    dateLogged: workout.dateLogged,
    type,
  });

  const { data } = useCompareSetsData({ workout, previousWorkout });

  return (
    <div className="text-xs">
      <div className="flex justify-end my-[4px]">
        {previousWorkout?.dateLogged ? (
          <div className="">
            <span className="text-stone-500 italic">
              since {new Date(previousWorkout?.dateLogged).toLocaleDateString()}
            </span>
          </div>
        ) : null}
      </div>

      {Object.entries(data)?.map((row) => {
        const [exerciseId, payload] = row;
        const { name, currentOneRepMax, previousOneRepMax } = payload;
        const ratio = Math.round(
          currentOneRepMax && previousOneRepMax
            ? ((currentOneRepMax - previousOneRepMax) / currentOneRepMax) * 100
            : 0,
        );

        return (
          <div key={exerciseId} className="flex items-center justify-between">
            <div>{name}</div>
            <div className="text-[12px] my-[1px]">
              {ratio > 1 ? (
                <div className="px-[4px] py-[0px] rounded-full bg-green-200 flex items-center gap-[2px] font-semibold">
                  <ArrowUp size={12} />
                  {Math.abs(ratio)}%
                </div>
              ) : !!ratio ? (
                <div className="px-[4px] py-[0px] rounded-full bg-red-200 flex items-center gap-[2px] font-semibold">
                  <ArrowDown size={12} />
                  {Math.abs(ratio)}%
                </div>
              ) : (
                "-"
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
