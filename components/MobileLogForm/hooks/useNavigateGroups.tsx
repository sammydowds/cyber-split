import { DeepTemplateWorkout } from "@/types";
import { useEffect, useState } from "react";

/**
 * Custom hook to manage page navigation for workout templates.
 * It handles the selection of strength groups and provides
 * functions to navigate to the next and previous groups - which will render the next or previous page.
 *
 * @param template - The workout template containing strength groups.
 * @returns An object containing the selected group and navigation functions.
 */
export const useNavigateGroups = (template: DeepTemplateWorkout) => {
  const [selected, setSelected] = useState<{
    group: DeepTemplateWorkout["strengthGroups"][number];
    swipeDirection: "left" | "right";
  }>({ group: template.strengthGroups[0], swipeDirection: "left" });
  const [nextGroup, setNextGroup] = useState<
    DeepTemplateWorkout["strengthGroups"][number]
  >(template.strengthGroups[1]);
  const [previousGroup, setPreviousGroup] =
    useState<DeepTemplateWorkout["strengthGroups"][number]>();

  useEffect(() => {
    if (selected.group.id) {
      const el = document.getElementById(selected.group.id);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selected.group.id]);

  const handleSelectGroup = (
    group: DeepTemplateWorkout["strengthGroups"][number],
  ) => {
    const idx = template.strengthGroups.indexOf(group);

    const nextIdx = idx + 1;
    const prevIdx = idx - 1;
    const previousGroup = template.strengthGroups[prevIdx];
    const nextGroup = template.strengthGroups[nextIdx];
    const previouslySelectedGroupIdx = template.strengthGroups.indexOf(
      selected.group,
    );

    setSelected({
      group,
      swipeDirection: previouslySelectedGroupIdx > idx ? "right" : "left",
    });
    setPreviousGroup(previousGroup);
    setNextGroup(nextGroup);
  };

  const handleClickNext = () => {
    if (nextGroup) {
      handleSelectGroup(nextGroup);
    }
  };

  const handleClickPrevious = () => {
    if (previousGroup) {
      handleSelectGroup(previousGroup);
    }
  };

  return {
    handleSelectGroup,
    handleClickNext,
    handleClickPrevious,
    selected,
  };
};
