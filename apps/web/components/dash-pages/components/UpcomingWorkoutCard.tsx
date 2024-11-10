import {
  useUpcomingWorkoutCardData,
  UseUpcomingWorkoutCardProps,
} from "./useUpcomingWorkoutCardData";
import { WorkoutTemplateCard } from "@/components/WorkoutTemplateCard";

export const UpcomingWorkoutCard = ({
  workout,
  dayIdx,
  weekIdx,
  scheduledDate,
}: UseUpcomingWorkoutCardProps) => {
  const { indexText, date, weekDay } = useUpcomingWorkoutCardData({
    workout,
    weekIdx,
    dayIdx,
    scheduledDate,
  });

  return (
    <div className="flex flex-col w-full relative border-none rounded-lg p-2 bg-white gap-2 bg-gradient-to-tr from-yellow-50 to-stone-200 shadow-inner">
      <div className="flex items-center justify-between font-bold px-2 text-black">
        <div className="text-stone-700 text-[14px]">{indexText}</div>
        <div className="flex flex-col font-bold text-[10px] items-center h-9 w-9 rounded-[5px] overflow-hidden shadow">
          <div className="bg-red-600 text-white w-full text-center">
            {weekDay}
          </div>
          <div className="bg-white w-full text-center grow text-[14px]">
            {date}
          </div>
        </div>
      </div>
      <WorkoutTemplateCard workout={workout} />
    </div>
  );
};
