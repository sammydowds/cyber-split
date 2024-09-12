import { SplitWorkoutCard } from "@/components/SplitWorkoutCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SplitDeep } from "@/types";

interface WorkoutsProps {
  split: SplitDeep;
}
export const Workouts = ({ split }: WorkoutsProps) => {
  const { workouts } = split;
  return (
    <div className="flex flex-col w-full overflow-hidden">
      <div className="overflow-x-auto">
        <div className="flex w-max space-x-2 p-4">
          {workouts?.map((_, idx) => {
            return <SplitWorkoutCard split={split} index={idx} />;
          })}
        </div>
      </div>
    </div>
  );
};
