import { DiscoverSplitDeep } from "@repo/database";

export const getUniqueEquipment = (split: DiscoverSplitDeep) => {
  const equipmentSet = new Set<string>();
  split.workouts.forEach((workout) => {
    workout.strengthGroups.forEach((group) => {
      group.sets.forEach((set) => {
        equipmentSet.add(set.exercise.equipment[0]?.name);
      });
    });
  });
  return Array.from(equipmentSet).filter(Boolean);
};
