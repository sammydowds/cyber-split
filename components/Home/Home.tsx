import { SplitDeep } from "@/types";
import { TodayWorkoutCard } from "./cards/TodayWorkoutCard";
import { ScheduleCard } from "./cards/ScheduleCard";
import { Data } from "./cards/DataCards/Data";
import { Workouts } from "./cards/WorkoutsCard/Workouts";

interface HomeProps {
  split: SplitDeep;
}
export const Home = ({ split }: HomeProps) => {
  return (
    <div className="flex flex-col p-4 pb-24 gap-4">
      <TodayWorkoutCard split={split} />
      <ScheduleCard split={split} />
      <Workouts split={split} />
      <Data split={split} />
    </div>
  );
};
