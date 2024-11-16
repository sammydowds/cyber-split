import { ActiveSplitDeep } from "@repo/database";
import { UserStats } from "./components/UserStats";
import { SplitUpcomingWorkouts } from "./components/SplitUpcomingWorkouts";
import { WeeklyVolumeBarChart } from "../WeeklyVolumeBarChart";
import { SplitCarousel } from "../SplitCarousel";
import { useDiscoverSplits } from "@/hooks/useDiscoverSplits";
import { Loading } from "../Loading";

interface HomePageProps {
  activeSplit?: ActiveSplitDeep;
}
export const HomePage = ({ activeSplit }: HomePageProps) => {
  const { data, isPending, isRefetching, refetch } = useDiscoverSplits();
  return (
    <div className="pt-8 flex justify-center">
      <div className="flex flex-col items-center w-full gap-6 text-black">
        <div className="w-full bg-yellow-300 py-4 flex items-center">
          {isPending || isRefetching ? (
            <div className="min-h-[460px] flex items-center justify-center w-full">
              <Loading />
            </div>
          ) : (
            <SplitCarousel refetch={refetch} splits={data ?? []} />
          )}
        </div>
        <UserStats activeSplit={activeSplit} />
        <WeeklyVolumeBarChart />

        <SplitUpcomingWorkouts activeSplit={activeSplit} />
      </div>
    </div>
  );
};
