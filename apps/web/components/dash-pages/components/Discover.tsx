import { HorizontalCarousel } from "@/components/HorizontalCarousel";
import { Loading } from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { SmallWorkoutTemplateCard } from "@/components/SmallWorkoutTemplateCard";
import { useDiscoverSplits } from "@/hooks/useDiscoverSplits";
import {
  CADENCE_TO_DESCRIPTION_MAP,
  DiscoverSplitDeep,
  FB_CADENCE,
  SPLIT_TYPE_TO_DESCRIPTION,
  SPLIT_TYPE_TO_META_DESCRIPTION,
  SPLIT_TYPES,
  SplitDeep,
  THREE_DAY_CADENCE,
  TWO_DAY_CADENCE,
} from "@repo/database";
import { cn } from "@/lib/utils";

const DifficultyDots = ({ level }: { level: 0 | 1 | 2 }) => {
  const color =
    level === 0 ? "bg-green-600" : level === 1 ? "bg-orange-500" : "bg-red-600";
  return (
    <div className="flex items-center gap-[3px]">
      <div className={cn("h-2 w-5 rounded-l-sm bg-stone-200", color)}></div>
      <div
        className={cn(
          "h-2 w-5 rounded-none bg-stone-200",
          level >= 1 ? color : "",
        )}
      ></div>
      <div
        className={cn(
          "h-2 w-5 rounded-r-sm bg-stone-200",
          level >= 2 ? color : "",
        )}
      ></div>
    </div>
  );
};

interface DifficultyBadgeProps {
  split: SplitDeep;
}
const DiffcultyBadge = ({ split }: DifficultyBadgeProps) => {
  if (
    split.type === SPLIT_TYPES.FB &&
    split.cadence === FB_CADENCE.TWO_DAYS_PER_WEEK
  ) {
    return <DifficultyDots level={0} />;
  }

  if (
    split.type === SPLIT_TYPES.TWO_DAY &&
    (split.cadence === TWO_DAY_CADENCE.TWO_DAYS_PER_WEEK ||
      split.cadence === TWO_DAY_CADENCE.THREE_DAYS_PER_WEEK)
  ) {
    return <DifficultyDots level={0} />;
  }

  if (
    (split.type === SPLIT_TYPES.THREE_DAY &&
      (split.cadence === THREE_DAY_CADENCE.FIVE_DAYS_PER_WEEK ||
        split.cadence === THREE_DAY_CADENCE.SIX_DAYS_PER_WEEK ||
        split.cadence === THREE_DAY_CADENCE.THREE_ON_ONE_OFF)) ||
    split.type === SPLIT_TYPES.FOUR_DAY
  ) {
    return <DifficultyDots level={2} />;
  }
  return <DifficultyDots level={1} />;
};

interface DiscoverCard {
  split: DiscoverSplitDeep;
}
const DiscoverCard = ({ split }: DiscoverCard) => {
  return (
    <div className="min-h-[400px] w-[345px] min-w-[345px] rounded bg-gradient-to-br from-white from-40% to-stone-100 flex flex-col justify-between">
      <div className="">
        <div className="flex items-center justify-between p-2 px-4">
          <div className="text tracking-tighter font-semibold">
            {SPLIT_TYPE_TO_DESCRIPTION[split.type as SPLIT_TYPES]}
          </div>
          <DiffcultyBadge split={split} />
        </div>
      </div>
      <div className="px-4">
        <div className="flex inline">
          <div className="text-sm">
            In the gym{" "}
            <span className="lowercase">
              {" "}
              {CADENCE_TO_DESCRIPTION_MAP[split.type][split.cadence]}, rotating
              between{" "}
              {SPLIT_TYPE_TO_META_DESCRIPTION[split.type as SPLIT_TYPES]}.
            </span>
          </div>
        </div>
      </div>
      <HorizontalCarousel>
        {split.workouts.map((workout) => {
          return <SmallWorkoutTemplateCard workout={workout} hideCta />;
        })}
      </HorizontalCarousel>
      <div className="p-2 w-full">
        <Button className="w-full font-bold">Begin</Button>
      </div>
    </div>
  );
};

export const Discover = () => {
  const { data, isPending, isRefetching, refetch } = useDiscoverSplits();

  const handleReGenerate = () => {
    refetch();
  };
  return (
    <div className="flex flex-col w-full md:max-w-[800px] mx-auto justify-center">
      <div className="flex items-center justify-between">
        <div className="font-semibold tracking-tighter text-lg px-4 py-2 flex flex-col">
          <div>Discover</div>
          <div className="font-semibold text-stone-500 tracking-tighter leading-4">
            Choose a split to start.
          </div>
        </div>
        <div>
          <Button
            onClick={handleReGenerate}
            disabled={isRefetching}
            className="font-bold mr-2"
          >
            Regenerate
          </Button>
        </div>
      </div>
      <HorizontalCarousel>
        {isPending || isRefetching ? (
          <div className="h-[400px] flex items-center justify-center w-full">
            <Loading />
          </div>
        ) : (
          <>
            {data?.map((split) => {
              return <DiscoverCard split={split} />;
            })}
          </>
        )}
      </HorizontalCarousel>
    </div>
  );
};
