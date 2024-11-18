import { ActiveSplitDeep } from "@repo/database";
import { SplitUpcomingWorkouts } from "./SplitUpcomingWorkouts";
import { SplitCarousel } from "./SplitCarousel";
import { useDiscoverSplits } from "@/hooks/useDiscoverSplits";
import { Loading } from "./Loading";
import { Button } from "./ui/button";
import { useDeactivateSplit } from "@/hooks/useDeactivateSplit";
import { useQueryClient } from "@tanstack/react-query";
import { ActivatedSplitCard } from "./ActivatedSplitCard";

interface HomePageProps {
  activeSplit?: ActiveSplitDeep;
}
export const HomePage = ({ activeSplit }: HomePageProps) => {
  const { data, isPending, isRefetching, refetch } = useDiscoverSplits();
  const queryClient = useQueryClient();
  const { mutate: deactivate, isPending: deactivating } = useDeactivateSplit({
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  if (!activeSplit?.split) {
    return (
      <div className="flex justify-center">
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
        </div>
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col gap-4 items-center h-full py-4">
      <ActivatedSplitCard activeSplit={activeSplit}>
        <Button
          variant="destructive"
          disabled={deactivating}
          className="w-full font-bold text-xl h-[40px]"
          onClick={() => deactivate({ id: activeSplit.id })}
        >
          End
        </Button>
      </ActivatedSplitCard>
    </div>
  );
};
