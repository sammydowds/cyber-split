import { ActiveSplitDeep, DeepLoggedWorkout } from "@repo/database";
import {
  differenceInCalendarDays,
  differenceInHours,
  differenceInMinutes,
} from "date-fns";
import { useMemo } from "react";

interface Args {
  workout?: ActiveSplitDeep["split"]["loggedWorkouts"][number];
}
export const useMiniLoggedWorkout = ({ workout }: Args) => {
  // wire in comparison data hook
  // calc other ui data
  const daysAgoText = useMemo(() => {
    if (!workout?.dateLogged) {
      return null;
    }
    const diffMinutes = differenceInMinutes(
      new Date(),
      new Date(workout.dateLogged),
    );
    const diffHours = differenceInHours(
      new Date(),
      new Date(workout.dateLogged),
    );
    const diffDays = differenceInCalendarDays(
      new Date(),
      new Date(workout.dateLogged),
    );
    return diffDays > 7
      ? `${new Date(workout.dateLogged).toLocaleDateString("en-us", { month: "2-digit", day: "2-digit", year: "2-digit" })}`
      : diffDays > 0
        ? `${diffDays}d`
        : diffHours > 0
          ? `${diffHours}h`
          : `${diffMinutes}m`;
  }, [workout?.id]);

  return {
    daysAgoText,
    workoutName: workout?.name,
  };
};
