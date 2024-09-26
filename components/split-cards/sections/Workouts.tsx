import { SplitDeep } from "@/types";
import { SplitWorkoutCard } from "../../SplitWorkoutCard";

export const Workouts = ({ split }: { split: SplitDeep }) => {
  return (
    <div className="flex flex-col gap-[8px]">
      <div className="flex flex-col">
        <div className="px-4 font-bold">Workouts</div>
        <div className="flex items-center gap-[4px] text-xs text-stone-500 px-4">
          <div>{split?.workouts?.length} templates</div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="flex w-max space-x-2 px-4">
          {split.workouts?.map((_, idx: number) => {
            return (
              <SplitWorkoutCard
                key={`workout-card-${idx}`}
                split={split}
                index={idx}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
