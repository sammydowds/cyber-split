import { DeepTemplateWorkout } from "@repo/database";
import { Set } from "@prisma/client";

const roundTo5 = (n: number) => {
  return Math.ceil(n / 5) * 5;
};

const secsToMins = (secs: number) => {
  return Math.round(secs / 60);
};

const estimateTimeOfSets = (sets: Set[]) => {
  let time = 0;
  for (const set of sets) {
    const { reps, restPeriod } = set;
    if (reps) {
      time = time + 2 * reps + (restPeriod ?? 0);
    }
  }
  return time;
};

export const estimateTimeOfWorkout = (
  workout: Partial<DeepTemplateWorkout>,
) => {
  let time = 0;
  // estimate time for strength sets logged
  for (const group of workout?.strengthGroups ?? []) {
    time = time + estimateTimeOfSets(group.sets);
  }

  return roundTo5(secsToMins(time));
};

const estimateTimeOfLoggedSets = (sets: Set[]) => {
  let time = 0;
  for (const set of sets) {
    if (!set.dateLogged) {
      continue;
    }
    const { reps, restPeriod } = set;
    if (reps) {
      time = time + 2 * reps + (restPeriod ?? 0);
    }
  }
  return time;
};

export const estimateTimeOfLoggedWorkout = (
  workout: Partial<DeepTemplateWorkout>,
) => {
  let time = 0;
  // estimate time for strength sets logged
  for (const group of workout?.strengthGroups ?? []) {
    time = time + estimateTimeOfLoggedSets(group.sets);
  }

  return roundTo5(secsToMins(time));
};
