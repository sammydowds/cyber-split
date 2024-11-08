import { WorkoutMarker } from "@/components/WorkoutMarker";
import {
  useUpcomingWorkoutCardData,
  UseUpcomingWorkoutCardProps,
} from "./useUpcomingWorkoutCardData";
import { isToday } from "date-fns";
import { WorkoutTemplateCard } from "@/components/WorkoutTemplateCard";

export const UpcomingWorkoutCard = ({
  workout,
  dayIdx,
  weekIdx,
  scheduledDate,
}: UseUpcomingWorkoutCardProps) => {
  const { indexText, workoutName, untilText } = useUpcomingWorkoutCardData({
    workout,
    weekIdx,
    dayIdx,
    scheduledDate,
  });

  return (
    <div className="flex flex-col w-full w-[340px] min-w-[340px] relative border-[1px] rounded p-2 bg-white gap-2 shadow">
      <div className="flex items-center justify-between font-bold px-2 text-black">
        <div className="uppercase text-sm">{indexText}</div>
        <div className="flex flex-col gap-[4px] font-bold">
          {scheduledDate && isToday(scheduledDate) ? (
            <div className="text-white bg-red-600 px-[12px] rounded">Today</div>
          ) : (
            untilText
          )}
        </div>
      </div>
      <WorkoutTemplateCard workout={workout} />
    </div>
  );
};
