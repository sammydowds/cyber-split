import { calcOneRepMax } from "@/lib/calcOneRepMax";
import { DeepSet, LoggedWorkoutSplitResponse, SplitDeep } from "@/types";
import { Set } from "@prisma/client";

export type ChartData = {
  x: Date;
  y: number;
};
type ExerciseData = {
  [typeOfData: string]: ChartData[];
};

type SplitData = {
  [exerciseName: string]: ExerciseData;
};

export enum Y_LABEL {
  ONE_REP_MAX = "Est. One Rep Max",
  REP_COUNT = "Rep Count",
}

const determineChartType = (sets: Partial<Set>[]) => {
  let label = Y_LABEL.REP_COUNT;
  let hasOneRepMaxData = true;

  sets.map((set) => {
    if (!set?.weight || !set?.reps) {
      hasOneRepMaxData = false;
    }
  });

  if (hasOneRepMaxData) {
    label = Y_LABEL.ONE_REP_MAX;
  }

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
  let result: SplitData = {};

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

      // construct data point
      if (label === "Est. One Rep Max") {
        let val = calcEstimatedOneRepMaxFromSets(sets);
        if (val) {
          dataPoint = {
            x: new Date(workout?.dateLogged ?? ""),
            y: calcEstimatedOneRepMaxFromSets(sets),
          };
        }
      } else {
        let val = calcTotalRepCount(sets);
        if (val) {
          dataPoint = {
            x: new Date(workout?.dateLogged ?? ""),
            y: calcTotalRepCount(sets),
          };
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

export const useSplitChartData = (
  split: SplitDeep,
): {
  data: SplitData;
} => {
  let result = split?.loggedWorkouts
    ? convertLoggedWorkoutsToExerciseChartData(split?.loggedWorkouts)
    : {};
  return { data: result };
};
