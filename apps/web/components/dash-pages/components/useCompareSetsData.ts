import { calcOneRepMax } from "@/lib/calcOneRepMax";
import { DeepLoggedWorkout } from "@repo/database";

interface DataObj {
  name: string;
  previousOneRepMax: number | null;
  currentOneRepMax: number | null;
}
interface Data {
  [k: string]: DataObj;
}
interface Args {
  workout: DeepLoggedWorkout;
  previousWorkout?: DeepLoggedWorkout;
}
export const useCompareSetsData = ({ workout, previousWorkout }: Args) => {
  let data: Data = {};

  // calc current one rep max for each exercise
  workout.strengthGroups.map((group) => {
    group.sets.map((set) => {
      let existingEntry = data[set.exercise.id];
      if (set.dateLogged && set.weight && set.reps) {
        let tempCurrentOneRepMax = calcOneRepMax(set.weight, set.reps);
        if (
          existingEntry?.currentOneRepMax &&
          tempCurrentOneRepMax > existingEntry.currentOneRepMax
        ) {
          data[set.exercise.id] = {
            ...existingEntry,
            currentOneRepMax: tempCurrentOneRepMax,
          };
        } else {
          data[set.exercise.id] = {
            name: set.exercise.name,
            currentOneRepMax: tempCurrentOneRepMax,
            previousOneRepMax: null,
          };
        }
      }
    });
  });

  // calc past one rep max for each exercise
  previousWorkout?.strengthGroups.map((group) => {
    group.sets.map((set) => {
      let existingEntry = data[set.exercise.id];

      if (!existingEntry) {
        return;
      }

      if (set.dateLogged && set.weight && set.reps) {
        let tempPreviousOneRepMax = calcOneRepMax(set.weight, set.reps);
        if (
          !existingEntry?.previousOneRepMax ||
          tempPreviousOneRepMax > existingEntry.previousOneRepMax
        ) {
          data[set.exercise.id] = {
            ...existingEntry,
            previousOneRepMax: tempPreviousOneRepMax,
          };
        }
      }
    });
  });
  return { data };
};
