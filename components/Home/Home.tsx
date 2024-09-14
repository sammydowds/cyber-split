import { SplitDeep } from "@/types";
import { TodayWorkoutCard } from "./cards/TodayWorkoutCard";
import { ScheduleCard } from "./cards/ScheduleCard";
import { DataCards } from "./cards/DataCards/DataCards";
import { WorkoutsCard } from "./cards/WorkoutsCard/WorkoutsCard";
import { createWorkoutSchedule } from "@/lib/programming/createWorkoutSchedule";
import { getWorkoutIndexFromLetter } from "@/lib/programming/getWorkoutIndexFromLetter";
import { CurrentProgrammingCard } from "./cards/CurrentProgrammingCard";
import { DashCard } from "../DashCard";
import { SplitForm } from "../SplitForm/SplitForm";

interface HomeProps {
  split?: SplitDeep;
}
export const Home = ({ split }: HomeProps) => {
  if (!split) {
    return (
      <div className="flex flex-col items-center p-4 mb-24 gap-4 max-md:px-2 max-md:py-6">
        <DashCard className="w-[500px] max-md:w-full">
          <SplitForm />
        </DashCard>
      </div>
    );
  }

  const { schedule, todaysWorkout } = createWorkoutSchedule(split);
  const index = getWorkoutIndexFromLetter(todaysWorkout);
  const workoutForToday =
    typeof index === "number" ? split.workouts[index] : undefined;

  return (
    <div className="flex flex-col items-center p-4 mb-[120px] pb-24 gap-6 max-xl:gap-4 max-md:p-2 my-4">
      <div className="flex gap-6 max-xl:gap-4 xl:flex-row max-xl:flex-col max-xl:w-full max-xl:items-center">
        <CurrentProgrammingCard split={split} />
        <TodayWorkoutCard
          workout={workoutForToday}
          workoutLabel={todaysWorkout}
        />
      </div>
      <div className="flex gap-6 max-xl:gap-4 xl:flex-row max-xl:flex-col max-xl:w-full max-xl:items-center">
        <ScheduleCard schedule={schedule} split={split} />
        <WorkoutsCard split={split} />
      </div>
      <DataCards split={split} />
    </div>
  );
};
