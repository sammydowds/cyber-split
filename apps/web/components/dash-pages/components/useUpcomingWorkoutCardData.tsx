import { ActiveSplitDeep } from "@repo/database";
import {
  differenceInCalendarDays,
  differenceInHours,
  differenceInMinutes,
} from "date-fns";
import { useMemo } from "react";

export interface UseUpcomingWorkoutCardProps {
  workout?: ActiveSplitDeep["split"]["workouts"][number];
  weekIdx?: number;
  dayIdx?: number;
  scheduledDate?: Date;
}
export const useUpcomingWorkoutCardData = ({
  workout,
  weekIdx,
  dayIdx,
  scheduledDate,
}: UseUpcomingWorkoutCardProps) => {
  // wire in comparison data hook
  // calc other ui data
  const indexText =
    typeof weekIdx === "number" && typeof dayIdx === "number"
      ? `Week ${weekIdx + 1} - Day ${dayIdx + 1}`
      : null;

  const untilText = useMemo(() => {
    if (!scheduledDate) {
      return null;
    }
    const diffDays = differenceInCalendarDays(
      new Date(scheduledDate),
      new Date(),
    );
    return diffDays > 7
      ? `in ${Math.floor(diffDays / 7)}w`
      : diffDays === 1
        ? "Tomorrow"
        : `in ${diffDays}d`;
  }, [scheduledDate]);

  return {
    indexText,
    untilText,
    workoutName: workout?.name,
  };
};
