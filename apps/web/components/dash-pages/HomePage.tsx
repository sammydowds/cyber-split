import { ActiveSplitDeep } from "@repo/database";
import { UserStats } from "./components/UserStats";
import { SplitUpcomingWorkouts } from "./components/SplitUpcomingWorkouts";
import { WeeklyVolumeBarChart } from "../WeeklyVolumeBarChart";
import { Discover } from "./components/Discover";

interface HomePageProps {
  activeSplit?: ActiveSplitDeep;
}
export const HomePage = ({ activeSplit }: HomePageProps) => {
  return (
    <div className="pt-8 flex justify-center">
      <div className="flex flex-col w-[500px] max-md:w-full gap-6 text-black">
        <Discover />
        <UserStats activeSplit={activeSplit} />
        <WeeklyVolumeBarChart />
        <SplitUpcomingWorkouts activeSplit={activeSplit} />
      </div>
    </div>
  );
};
