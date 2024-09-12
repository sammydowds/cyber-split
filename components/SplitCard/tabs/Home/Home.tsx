import { SplitDeep } from "@/types";
import { TodayWorkoutCard } from "./TodayWorkoutCard";
import { ScheduleCard } from "./ScheduleCard";

interface HomeProps {
  split: SplitDeep;
}
export const Home = ({ split }: HomeProps) => {
  return (
    <div className="flex flex-col p-4 gap-4">
      <TodayWorkoutCard split={split} />
      <ScheduleCard split={split} />
    </div>
  );
};
