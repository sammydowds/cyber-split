import { WorkoutMarker } from "@/components/WorkoutMarker";
import {
  useUpcomingWorkoutCardData,
  UseUpcomingWorkoutCardProps,
} from "./useUpcomingWorkoutCardData";
import { isToday } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

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
  const router = useRouter();

  return (
    <div className="flex flex-col w-full max-md:min-w-[250px] md:max-w-[250px] relative border-[1px] rounded p-2 bg-white">
      <div className="flex flex-col gap-[4px] font-bold absolute top-[6px] right-2 text-[12px]">
        {scheduledDate && isToday(scheduledDate) ? (
          <div className="text-white bg-red-500 px-[6px] rounded-full">
            Today
          </div>
        ) : (
          untilText
        )}
      </div>
      <div className="flex flex-col gap-[4px] font-bold">
        <div className="uppercase text-stone-400 text-[10px]">{indexText}</div>
        <div className="flex items-center gap-[4px] text-lg">
          <WorkoutMarker
            text={workout?.letterLabel ?? "-"}
            className="h-4 w-4 text-[10px] shadow-none"
          />
          <div className="font-bold tracking-tightest max-w-[120px] truncate">
            {workoutName}
          </div>
        </div>
      </div>
      <Separator className="my-[6px]" />
      <div className="flex flex-col overflow-auto h-[140px] px-2 gap-[4px]">
        {workout?.strengthGroups.map((group) => {
          return (
            <>
              <div className="text-xs font-semibold text-stone-700">
                {group.name}
              </div>
            </>
          );
        })}
      </div>
      <Separator className="my-[6px]" />
      {scheduledDate && isToday(scheduledDate) ? (
        <Button
          className="font-bold"
          onClick={() =>
            router.push(`/dashboard/active/log-workout/${workout?.id}`)
          }
        >
          Do Workout
        </Button>
      ) : (
        <Button disabled className="font-bold italic" variant="outline">
          {untilText}
        </Button>
      )}
    </div>
  );
};
