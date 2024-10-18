import { startOfWeek } from "date-fns";
import { Prisma, TemplateWorkout } from "@prisma/client";

export type DayPayload = {
  date: Date;
  workout?: Partial<TemplateWorkout>;
};

export type WorkoutSchedule = DayPayload[][];

export interface ActiveWorkoutScheduleResult {
  schedule: WorkoutSchedule;
  todaysWorkout: string | null;
}

interface Args {
  split: Prisma.SplitGetPayload<{
    select: { cadence: true; skipDays: true; workouts: true };
  }>;
  startDate?: Date;
  skipDays?: number[];
}
export const createActiveSplitWorkoutSchedule = ({
  split,
  startDate = new Date(),
  skipDays = [],
}: Args): ActiveWorkoutScheduleResult => {
  const processedCadence = split.cadence.split(", ").join("");
  const totalDays = 28;
  const cadenceLength = processedCadence.length;
  const schedule: WorkoutSchedule = [];
  let week: DayPayload[] = [];
  let cadenceIndex = 0;
  let todaysWorkout = null;

  for (let i = 0; i < totalDays; i++) {
    const workoutDate = startOfWeek(startDate, { weekStartsOn: 1 });
    workoutDate.setDate(workoutDate.getDate() + i);
    const letterLabel = processedCadence[cadenceIndex % cadenceLength];
    if (!skipDays.includes(workoutDate.getDay())) {
      cadenceIndex++;
      const matchingWorkout = split.workouts.filter(
        (w) => w.letterLabel === letterLabel,
      )[0];
      week.push({
        date: workoutDate,
        workout: matchingWorkout
          ? {
              id: matchingWorkout.id,
              name: matchingWorkout.name,
              letterLabel: matchingWorkout.letterLabel,
            }
          : undefined,
      });
      if (workoutDate.getDate() === new Date().getDate()) {
        todaysWorkout = matchingWorkout?.id;
      }
    } else {
      week.push({
        date: workoutDate,
      });
      letterLabel === "X" ? cadenceIndex++ : null;
    }

    // If it's Sunday, push the week to the schedule and reset the week array
    if (workoutDate.getDay() === 0 || i === totalDays - 1) {
      schedule.push(week);
      week = [];
    }
  }

  return { schedule, todaysWorkout };
};
