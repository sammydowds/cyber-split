import { Card } from "@/components/ui/card";
import { ActiveSplitResponse } from "@/types";
import { Separator } from "@/components/ui/separator";
import { getWorkoutLetterFromIndex } from "../helpers/getWorkoutLetterFromIndex";
import { WorkoutMarker } from "../../WorkoutMarker";
import { Button } from "@/components/ui/button";
import { estimateTimeOfWorkout } from "@/lib/estimateTimeOfWorkout";
import { useRouter } from "next/router";

interface WorkoutCardProps {
  split: Partial<ActiveSplitResponse>;
  index: number;
}
export const MiniSplitWorkoutCard = ({ split, index }: WorkoutCardProps) => {
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
    <Card className="overflow-hidden shadow-sm flex items-center justify-between p-2">
      <div className="flex gap-[6px] font-bold text-sm tracking-tighter">
        <WorkoutMarker text={letter} className="h-[28px] w-[28px]" />
        <div className="flex flex-col pt-[2px]">
          <div className="leading-3">{workout.name}</div>
          <div className="flex items-center text-xs text-stone-400 gap-[4px]">
            <div>{estTimeMins} mins</div>
            <Separator orientation="vertical" className="w-[2px] h-[12px]" />
            <div>{workout.strengthGroups?.length} exercises</div>
          </div>
        </div>
      </div>
      <Button onClick={handleClickLog}>Log</Button>
    </Card>
  );
};
