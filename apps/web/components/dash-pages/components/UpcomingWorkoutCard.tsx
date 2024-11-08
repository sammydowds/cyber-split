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
    <div className="flex flex-col w-full w-[300px] min-w-[300px] relative border-[1px] rounded p-2 bg-white">
      <div className="flex flex-col gap-[4px] font-bold absolute top-[6px] right-2 text-[12px]">
        {scheduledDate && isToday(scheduledDate) ? (
          <div className="text-white bg-red-500 px-[12px] rounded">Today</div>
        ) : (
          untilText
        )}
      </div>
      <div className="flex flex-col gap-[4px] font-bold">
        <div className="uppercase text-[10px]">{indexText}</div>
        <div className="flex items-center gap-[4px] text-xl">
          <WorkoutMarker
            text={workout?.letterLabel ?? "-"}
            className="h-6 w-6 shadow-none"
          />
          <div className="font-bold tracking-tightest max-w-[120px] truncate">
            {workoutName}
          </div>
        </div>
      </div>
      <Separator className="my-[6px]" />
      <div className="flex flex-col overflow-auto h-[220px] px-2 gap-[4px]">
        {workout?.strengthGroups.map((group) => {
          return (
            <>
              <div className="font-semibold text-stone-700">{group.name}</div>
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
