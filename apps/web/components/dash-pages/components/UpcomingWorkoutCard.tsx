import { CalendarInfoIcon } from "@/components/CalendarInfoIcon";
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
        {scheduledDate ? <CalendarInfoIcon date={scheduledDate} /> : null}
      </div>
      <WorkoutTemplateCard workout={workout} />
    </div>
  );
};
