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
  const [selected, setSelected] = useState<
    DeepTemplateWorkout["strengthGroups"][number]
  >(template.strengthGroups[0]);
  const [nextGroup, setNextGroup] = useState<
    DeepTemplateWorkout["strengthGroups"][number]
  >(template.strengthGroups[1]);
  const [previousGroup, setPreviousGroup] =
    useState<DeepTemplateWorkout["strengthGroups"][number]>();

  useEffect(() => {
    if (selected.id) {
      const el = document.getElementById(selected.id);
      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [selected.id]);

  const handleSelectGroup = (
    group: DeepTemplateWorkout["strengthGroups"][number],
  ) => {
    const idx = template.strengthGroups.indexOf(group);

    const nextIdx = idx + 1;
    const prevIdx = idx - 1;
    const previousGroup = template.strengthGroups[prevIdx];
    const nextGroup = template.strengthGroups[nextIdx];

    setSelected(group);
    setPreviousGroup(previousGroup);
    setNextGroup(nextGroup);
  };

  const handleClickNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    if (nextGroup) {
      handleSelectGroup(nextGroup);
    }
  };

  const handleClickPrevious = (e: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
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
