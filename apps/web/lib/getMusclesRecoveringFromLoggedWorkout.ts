import { DeepLoggedWorkout } from "@repo/database";

export const getMusclesRecoveringFromLoggedWorkout = (
  workout: DeepLoggedWorkout,
) => {
  const list: string[] = [];
  workout.strengthGroups.map((g) => {
    g.sets.map((set) => {
      if (set.exercise?.bodyPart && set.dateLogged) {
        list.push(...set.exercise.bodyPart.toLocaleLowerCase().split(","));
      }
    });
  });
  const uniqueList = new Set(list);
  return Array.from(uniqueList);
};
