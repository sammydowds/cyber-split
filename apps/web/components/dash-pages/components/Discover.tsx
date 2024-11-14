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

interface DifficultyBadgeProps {
  split: SplitDeep;
}
const DiffcultyBadge = ({ split }: DifficultyBadgeProps) => {
  if (
    split.type === SPLIT_TYPES.FB &&
    split.cadence === FB_CADENCE.TWO_DAYS_PER_WEEK
  ) {
    return (
      <div className="bg-blue-100 text-blue-800 p-[6px] font-bold text-xs rounded-sm">
        Beginner
      </div>
    );
  }

  if (
    split.type === SPLIT_TYPES.TWO_DAY &&
    (split.cadence === TWO_DAY_CADENCE.TWO_DAYS_PER_WEEK ||
      split.cadence === TWO_DAY_CADENCE.THREE_DAYS_PER_WEEK)
  ) {
    return (
      <div className="bg-blue-100 text-blue-800 p-[6px] font-bold text-xs rounded-sm">
        Beginner
      </div>
    );
  }

  if (
    (split.type === SPLIT_TYPES.THREE_DAY && (split.cadence === THREE_DAY_CADENCE.FIVE_DAYS_PER_WEEK || split.cadence === THREE_DAY_CADENCE.SIX_DAYS_PER_WEEK || split.cadence === THREE_DAY_CADENCE.THREE_ON_ONE_OFF)) ||
    split.type === SPLIT_TYPES.FOUR_DAY
  ) {
    return (
      <div className="bg-red-100 text-red-900 p-[6px] font-bold text-xs rounded-sm">
        Advanced
      </div>
    );
  }
  return (
    <div className="bg-fuchsia-100 text-fuchsia-900 p-[6px] font-bold text-xs rounded-sm">
      Intermediate
    </div>
  );
};

interface DiscoverCard {
  split: DiscoverSplitDeep;
}
const DiscoverCard = ({ split }: DiscoverCard) => {
  return (
    <div className="min-h-[400px] w-[345px] min-w-[345px] rounded bg-gradient-to-br from-white from-40% to-stone-100 flex flex-col justify-between">
      <div className="">
        <div className="flex items-center justify-between p-2 pl-4">
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
  const { data, isPending } = useDiscoverSplits();
  return (
    <div className="flex flex-col w-full md:max-w-[800px] mx-auto justify-center">
      <div className="font-semibold tracking-tighter text-lg px-4 py-2 flex flex-col">
        <div>Discover</div>
        <div className="font-semibold text-stone-500 tracking-tighter leading-4">
          Choose a split to start.
        </div>
      </div>
      <HorizontalCarousel>
        {isPending ? (
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
