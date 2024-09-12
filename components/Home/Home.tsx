import { SplitDeep } from "@/types";
import { TodayWorkoutCard } from "./cards/TodayWorkoutCard";
import { ScheduleCard } from "./cards/ScheduleCard";
import { DataCards } from "./cards/DataCards/DataCards";
import { WorkoutsCard } from "./cards/WorkoutsCard/WorkoutsCard";

interface HomeProps {
  split: SplitDeep;
}
export const Home = ({ split }: HomeProps) => {
  return (
    <div className="flex flex-col p-4 pb-24 gap-4">
      <TodayWorkoutCard split={split} />
      <ScheduleCard split={split} />
      <WorkoutsCard split={split} />
      <DataCards split={split} />
    </div>
  );
};
