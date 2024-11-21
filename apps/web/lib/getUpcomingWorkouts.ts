import { ActiveSplitDeep, WorkoutSchedule } from "@repo/database";
import { isAfter, isToday } from "date-fns";

export const getUpcomingWorkouts = (activeSplit: ActiveSplitDeep) => {
  const schedule = activeSplit.schedule as any;
  const tempUpcoming = schedule
    ?.flatMap((week: WorkoutSchedule[number]) =>
      week.map((day: WorkoutSchedule[number][number]) => {
        const { workout, date } = day;
        const workoutData = activeSplit.split.workouts.find(
          (template) => template.letterLabel === workout?.letterLabel,
        );
        const d = new Date(date);
        if (workout && workoutData && (isToday(d) || isAfter(d, new Date()))) {
          return { workout: { ...workoutData, workout }, date: d };
        }
        return null;
      }),
    )
    .filter(Boolean);
  return tempUpcoming;
};
