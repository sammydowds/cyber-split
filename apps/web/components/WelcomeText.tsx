import { ActiveSplitDeep } from "@repo/database";
import { getUpcomingWorkouts } from "../lib/getUpcomingWorkouts";
import { differenceInCalendarDays } from "date-fns";
import pluralize from "pluralize";
import { getBodyPartsFromWorkout } from "../lib/getBodyPartsFromWorkout";

interface WelcomeTextProps {
  activeSplit?: ActiveSplitDeep;
}

const getGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) return "Good morning";
  if (currentHour < 18) return "Good afternoon";
  return "Good evening";
};

export const WelcomeText = ({ activeSplit }: WelcomeTextProps) => {
  if (activeSplit) {
    const { workout, date } = activeSplit
      ? getUpcomingWorkouts(activeSplit)[0]
      : { workout: undefined, date: undefined };
    const daysAway = workout
      ? differenceInCalendarDays(new Date(date), new Date())
      : undefined;

    const workoutText =
      daysAway === 0
        ? "your next workout is today."
        : daysAway === 1
          ? "just one more day until your next workout."
          : `only ${daysAway} ${pluralize("day", daysAway)} to go until your next workout.`;
    const musclesWorked = workout
      ? `You'll be targeting your ${getBodyPartsFromWorkout(workout).join(", ")}`
      : "";

    return (
      <div className="w-full max-w-[300px] leading-6 max-md:pt-8">
        <span className="font-semibold">{getGreeting()}</span>, {workoutText}{" "}
        {musclesWorked}.
      </div>
    );
  }

  return (
    <div className="w-full text-lg max-w-[300px] leading-6 max-md:pt-8">
      <span className="font-semibold">{getGreeting()}</span>, and welcome to
      cyber split! Please find a split in the discover section to get started.
    </div>
  );
};
