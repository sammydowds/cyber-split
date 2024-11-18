import { CalendarInfoIcon } from "@/components/CalendarInfoIcon";
import {
  useUpcomingWorkoutCardData,
  UseUpcomingWorkoutCardProps,
} from "../hooks/useUpcomingWorkoutCardData";
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
    <div className="relative pt-[16px]">
      <div className="absolute top-0 right-1 bg-gradient-to-r from-yellow-300 to-stone-100 h-[75px] w-[50%] rounded-sm z-0">
        <div className="flex items-center justify-between font-bold px-[10px] text-black">
          <div className="text-black text-[11px] font-bold">{indexText}</div>
        </div>
      </div>
      <div className="relative w-max z-20">
        <WorkoutTemplateCard workout={workout} />
      </div>
      {scheduledDate ? (
        <div className="absolute -top-1 right-3 z-20">
          <CalendarInfoIcon date={scheduledDate} />
        </div>
      ) : null}
    </div>
  );
};
