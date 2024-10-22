import { calcOneRepMax } from "@/lib/calcOneRepMax";
import {
  DeepLoggedWorkout,
  DeepSet,
  LoggedWorkoutSplitResponse,
  SplitDeep,
} from "@repo/database";
import { Set } from "@prisma/client";

export type ChartData = {
  x: Date;
  y: number;
};
type ExerciseData = {
  [typeOfData: string]: ChartData[];
};

type ExercisesData = {
  [exerciseName: string]: ExerciseData;
};

export enum Y_LABEL {
  ONE_REP_MAX = "Est. One Rep Max",
  REP_COUNT = "Rep Count",
}

const determineChartType = (sets: Partial<Set>[]): Y_LABEL => {
  let label = Y_LABEL.REP_COUNT;

  sets.map((set) => {
    if (set?.weight) {
      label = Y_LABEL.ONE_REP_MAX;
    }
  });

  return label;
};

const calcEstimatedOneRepMaxFromSets = (sets: DeepSet[]): number => {
  let highestOneRepMax = 0;
  sets.map((set) => {
    if (set?.weight && set?.reps && set?.dateLogged) {
      let temp = calcOneRepMax(set.weight, set.reps);
      if (temp > highestOneRepMax) {
        highestOneRepMax = temp;
      }
    }
  });
  return highestOneRepMax;
};

const calcTotalRepCount = (sets: DeepSet[]): number => {
  let reps = 0;
  sets.map((set) => {
    if (set?.reps && set?.dateLogged) {
      reps += set.reps;
    }
  });
  return reps;
};

const convertLoggedWorkoutsToExerciseChartData = (
  loggedWorkouts: LoggedWorkoutSplitResponse["loggedWorkouts"],
) => {
  let result: ExercisesData = {};

  loggedWorkouts?.map((workout) => {
    const { strengthGroups } = workout;

    strengthGroups?.map((group) => {
      const { sets } = group;

      // setup
      let exerciseId: string | null = null;
      let label: Y_LABEL | null = null;
      let dataPoint: ExerciseData["data"][number] | null = null;
      label = determineChartType(sets);
      exerciseId = group.name;
      const x = workout?.dateLogged ? new Date(workout?.dateLogged) : null;

      // construct data point
      if (x) {
        if (label === Y_LABEL.ONE_REP_MAX) {
          let val = calcEstimatedOneRepMaxFromSets(sets);
          if (val) {
            dataPoint = {
              x,
              y: calcEstimatedOneRepMaxFromSets(sets),
            };
          }
        } else {
          let val = calcTotalRepCount(sets);
          if (val) {
            dataPoint = {
              x,
              y: calcTotalRepCount(sets),
            };
          }
        }
      }

      // append data point
      if (label && exerciseId && dataPoint) {
        let existingData = result?.[exerciseId]?.[label];
        if (existingData) {
          result[exerciseId][label] = [...existingData, dataPoint];
        } else {
          result[exerciseId] = { [label]: [dataPoint] };
        }
      }
    });
  });

  return result;
};

export const useExerciseData = (
  workouts: DeepLoggedWorkout[],
): {
  data: ExercisesData;
} => {
  let result = workouts
    ? convertLoggedWorkoutsToExerciseChartData(workouts)
    : {};
  return { data: result };
};
