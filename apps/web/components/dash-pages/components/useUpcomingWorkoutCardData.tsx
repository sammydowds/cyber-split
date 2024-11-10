import { ActiveSplitDeep } from "@repo/database";
import {
  differenceInCalendarDays,
  differenceInHours,
  differenceInMinutes,
  getDay,
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
  const indexText =
    typeof weekIdx === "number" && typeof dayIdx === "number"
      ? `Week ${weekIdx + 1} / Day ${dayIdx + 1}`
      : null;

  const weekDay = scheduledDate
    ? new Date(scheduledDate).toLocaleDateString("en-us", { weekday: "short" })
    : null;
  const date = scheduledDate
    ? new Date(scheduledDate).toLocaleDateString("en-us", { day: "2-digit" })
    : null;

  return {
    indexText,
    workoutName: workout?.name,
    weekDay,
    date,
  };
};
