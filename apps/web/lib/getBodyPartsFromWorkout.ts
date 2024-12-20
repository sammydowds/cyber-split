import { SplitDeep } from "@repo/database";

export const getBodyPartsFromWorkout = (
  workout: SplitDeep["workouts"][number],
) => {
  const list: string[] = [];
  workout.strengthGroups.map((g) => {
    g.sets.map((set) => {
      if (set.exercise?.bodyPart) {
        list.push(...set.exercise.bodyPart.toLocaleLowerCase().split(","));
      }
    });
  });
  const uniqueList = new Set(list);
  return Array.from(uniqueList);
};
