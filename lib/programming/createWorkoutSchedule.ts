import { startOfWeek } from "date-fns";

export type Day = {
  date: Date;
  workout: string;
};

type WorkoutSchedule = Day[][];

interface Args {
  cadence: string;
  startDate?: Date;
  skipDays?: number[];
}
export const createWorkoutSchedule = ({
  cadence,
  startDate = new Date(),
  skipDays = [],
}: Args): { schedule: WorkoutSchedule; todaysWorkout: string | null } => {
  let processedCadence = cadence.split(", ").join("");
  const totalDays = 28;
  const cadenceLength = processedCadence.length;
  const schedule: WorkoutSchedule = [];
  let week: Day[] = [];
  let cadenceIndex = 0;
  let todaysWorkout = null;

  for (let i = 0; i < totalDays; i++) {
    const workoutDate = startOfWeek(startDate, { weekStartsOn: 1 });
    workoutDate.setDate(workoutDate.getDate() + i);
    const workout = processedCadence[cadenceIndex % cadenceLength];
    if (!skipDays.includes(workoutDate.getDay())) {
      cadenceIndex++;
      week.push({
        date: workoutDate,
        workout: workout,
      });
      if (workoutDate.getDate() === new Date().getDate()) {
        todaysWorkout = workout;
      }
    } else {
      week.push({
        date: workoutDate,
        workout: "S",
      });
      workout === "X" ? cadenceIndex++ : null;
    }

    // If it's Sunday, push the week to the schedule and reset the week array
    if (workoutDate.getDay() === 0 || i === totalDays - 1) {
      schedule.push(week);
      week = [];
    }
  }

  return { schedule, todaysWorkout };
};
