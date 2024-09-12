import { SplitWorkoutCard } from "@/components/SplitWorkoutCard";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SplitDeep } from "@/types";
import { DashCard } from "../../DashCard";

interface WorkoutsProps {
  split: SplitDeep;
}
export const WorkoutsCard = ({ split }: WorkoutsProps) => {
  const { workouts } = split;
  return (
    <DashCard className="flex flex-col overflow-hidden w-[500px] max-md:w-full">
      <CardHeader className="pb-0">
        <CardTitle>Workouts</CardTitle>
        <CardDescription>
          These are the workouts generated for your current active split.
        </CardDescription>
      </CardHeader>
      <div className="overflow-x-auto">
        <div className="flex w-max space-x-2 p-4">
          {workouts?.map((_, idx) => {
            return <SplitWorkoutCard key={idx} split={split} index={idx} />;
          })}
        </div>
      </div>
    </DashCard>
  );
};
