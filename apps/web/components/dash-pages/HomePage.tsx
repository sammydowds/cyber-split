import { ActiveSplitDeep } from "@repo/database";
import { UserStats } from "./components/UserStats";
import { SplitUpcomingWorkouts } from "./components/SplitUpcomingWorkouts";
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
        <div className="w-[500px] max-md:w-full flex flex-col gap-4">
          <UserStats activeSplit={activeSplit} />
          <SplitUpcomingWorkouts activeSplit={activeSplit} />
        </div>
        {!activeSplit ? (
          <div className="w-full bg-yellow-300 py-4 flex items-center">
            {isPending || isRefetching ? (
              <div className="min-h-[460px] flex items-center justify-center w-full">
                <Loading />
              </div>
            ) : null}
            <SplitCarousel refetch={refetch} splits={data ?? []} />
          </div>
        ) : null}
      </div>
    </div>
  );
};
