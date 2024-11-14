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
      <div className="flex flex-col items-center w-full gap-6 text-black">
        <div className="w-full bg-yellow-300 py-4 flex items-center">
          <Discover />
        </div>
        <UserStats activeSplit={activeSplit} />
        <WeeklyVolumeBarChart />
        <SplitUpcomingWorkouts activeSplit={activeSplit} />
      </div>
    </div>
  );
};
