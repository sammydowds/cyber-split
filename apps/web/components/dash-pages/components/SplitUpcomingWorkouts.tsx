import { HorizontalCarousel } from "@/components/HorizontalCarousel";
import { ActiveSplitDeep, WorkoutSchedule } from "@repo/database";
import { UpcomingWorkoutCard } from "./UpcomingWorkoutCard";
import { isAfter, isToday } from "date-fns";
import Link from "next/link";

interface SplitUpcomingWorkoutsProps {
  activeSplit?: ActiveSplitDeep;
}
export const SplitUpcomingWorkouts = ({
  activeSplit,
}: SplitUpcomingWorkoutsProps) => {
  if (!activeSplit?.schedule) {
    return null;
  }
  return (
    <div className="flex flex-col">
      <div className="font-semibold text-xl tracking-tighter flex items-center gap-[4px]">
        Upcoming Workouts
      </div>
      <HorizontalCarousel>
        {/* @ts-ignore json to WorkoutSchedule types */}
        {activeSplit?.schedule?.map((week, weekIdx) => {
          return week.map(
            (day: WorkoutSchedule[number][number], dayIdx: number) => {
              const { workout, date } = day;
              const workoutData = activeSplit.split.workouts.filter(
                (template) => template.letterLabel === workout?.letterLabel,
              )[0];
              const d = new Date(date);
              if (
                workout &&
                workoutData &&
                (isToday(d) || isAfter(d, new Date()))
              ) {
                return (
                  <UpcomingWorkoutCard
                    workout={workoutData}
                    dayIdx={dayIdx}
                    weekIdx={weekIdx}
                    scheduledDate={d}
                  />
                );
              }
            },
          );
        })}
      </HorizontalCarousel>
    </div>
  );
};
