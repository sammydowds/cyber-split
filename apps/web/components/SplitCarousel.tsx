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
import { ChevronLeft, ChevronRight, Pointer } from "lucide-react";
import { useMemo, useState, useEffect, useRef } from "react";
import { SampleWeekSchedule } from "./SampleWeekSchedule";
import { cn } from "@/lib/utils";
import { HorizontalCarousel } from "./HorizontalCarousel";
import { Button } from "@/components/ui/button";
import { Badge } from "./ui/badge";
import { WorkoutTemplateCard } from "./WorkoutTemplateCard";

const ScrollInstructions = () => {
  return (
    <div className="relative flex items-center text-stone-600 gap-[4px]">
      <Pointer strokeWidth={1.5} className="z-10" size={18} />
      <div className="text-xs tracking-tighter font-bold">Swipe to explore</div>
      <div className="h-[1px] w-[6px] bg-red-600 absolute top-[2px] -left-[3px] z-0"></div>
      <div className="h-[1px] w-[6px] bg-red-600 absolute top-[4px] -left-[3px] z-0"></div>
      <div className="h-[1px] w-[6px] bg-red-600 absolute top-[2px] left-[9px] z-0"></div>
      <div className="h-[1px] w-[6px] bg-red-600 absolute top-[4px] left-[9px] z-0"></div>
    </div>
  );
};

interface Level {
  level: 0 | 1 | 2;
}
const getBgColorByDifficulty = ({ level }: Level) => {
  return level === 0
    ? "bg-green-600"
    : level === 1
      ? "bg-orange-500"
      : "bg-red-600";
};

interface GetDifficultyArgs {
  split: SplitDeep;
}
const getDifficultyLevel = ({ split }: GetDifficultyArgs) => {
  if (
    split.type === SPLIT_TYPES.FB &&
    split.cadence === FB_CADENCE.TWO_DAYS_PER_WEEK
  ) {
    return 0;
  }

  if (
    split.type === SPLIT_TYPES.TWO_DAY &&
    (split.cadence === TWO_DAY_CADENCE.TWO_DAYS_PER_WEEK ||
      split.cadence === TWO_DAY_CADENCE.THREE_DAYS_PER_WEEK)
  ) {
    return 0;
  }

  if (
    (split.type === SPLIT_TYPES.THREE_DAY &&
      (split.cadence === THREE_DAY_CADENCE.FIVE_DAYS_PER_WEEK ||
        split.cadence === THREE_DAY_CADENCE.SIX_DAYS_PER_WEEK ||
        split.cadence === THREE_DAY_CADENCE.THREE_ON_ONE_OFF)) ||
    split.type === SPLIT_TYPES.FOUR_DAY
  ) {
    return 2;
  }
  return 1;
};

const DifficultyDots = ({ level }: { level: 0 | 1 | 2 }) => {
  const color = getBgColorByDifficulty({ level });
  return (
    <div className="flex items-center gap-[3px]">
      <div className={cn("h-2 w-8 rounded-l-sm bg-stone-200", color)}></div>
      <div
        className={cn(
          "h-2 w-8 rounded-none bg-stone-200",
          level >= 1 ? color : "",
        )}
      ></div>
      <div
        className={cn(
          "h-2 w-8 rounded-r-sm bg-stone-200",
          level >= 2 ? color : "",
        )}
      ></div>
    </div>
  );
};

const getUniqueEquipment = (split: DiscoverSplitDeep) => {
  const equipmentSet = new Set<string>();

  split.workouts.forEach((workout) => {
    workout.strengthGroups.forEach((group) => {
      group.sets.forEach((set) => {
        equipmentSet.add(set.exercise.equipment[0]?.name);
      });
    });
  });

  return Array.from(equipmentSet);
};

interface SplitCardProps {
  split: DiscoverSplitDeep;
}
const SplitCard = ({ split }: SplitCardProps) => {
  const difficultyLevel = useMemo(() => {
    return getDifficultyLevel({ split });
  }, [split]);

  const equipment = getUniqueEquipment(split).filter(Boolean);
  return (
    <div className="max-w-[800px] max-md:w-screen max-md:rounded-none rounded bg-white flex flex-col justify-between gap-2">
      <div className="flex md:flex-row max-md:flex-col">
        <div className="flex flex-col justify-between md:max-w-[400px] max-md:min-h-[275px] p-[8px] gap-[12px]">
          <div className="flex items-center justify-between p-2 px-4">
            <div className="text-2xl tracking-tighter font-semibold">
              {SPLIT_TYPE_TO_DESCRIPTION[split.type as SPLIT_TYPES]}
            </div>
            <DifficultyDots level={difficultyLevel} />
          </div>
          <div className="px-4 flex flex-col gap-[4px]">
            <SampleWeekSchedule split={split} />
            <div className="flex inline">
              <div className="">
                In the gym{" "}
                <span className="lowercase">
                  {" "}
                  {CADENCE_TO_DESCRIPTION_MAP[split.type][split.cadence]},
                  rotating between{" "}
                  {SPLIT_TYPE_TO_META_DESCRIPTION[split.type as SPLIT_TYPES]}.
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-[3px] h-[150px] px-2 overflow-y-auto overflow-hidden">
            <div className="flex flex-wrap gap-[4px] items-center">
              {equipment.map((e) => {
                return (
                  <Badge className="bg-stone-100 text-black shadow-none h-[20px]">
                    {e}
                  </Badge>
                );
              })}
            </div>
          </div>
          <div className="p-2 w-full">
            <Button className="w-full font-bold text-xl h-[40px]">Begin</Button>
          </div>
        </div>
        <div className="h-fill w-[1px] bg-stone-300 max-md:hidden z-10"></div>
        <div className="h-[1px] w-fill bg-stone-300 md:hidden mx-6 my-4"></div>
        <div className="md:max-w-[400px] py-4 flex flex-col justify-center">
          <div className="tracking-tighter font-semibold pl-4">Workouts</div>
          <HorizontalCarousel>
            {split.workouts.map((workout) => {
              return <WorkoutTemplateCard workout={workout} hideCta />;
            })}
          </HorizontalCarousel>
        </div>
      </div>
    </div>
  );
};

interface SplitCarouselProps {
  splits: DiscoverSplitDeep[];
  refetch?: () => void;
}
export const SplitCarousel = ({ splits, refetch }: SplitCarouselProps) => {
  const [index, setIndex] = useState(0);
  const [viewed, setViewed] = useState<Set<number>>(new Set());
  const [isAnimatingFoward, setIsAnimatingFoward] = useState(false);
  const [isAnimatingBackward, setIsAnimatingBackward] = useState(false);
  const [previousIndex, setPreviousIndex] = useState(1);

  const touchStart = useRef<number | null>(null);
  const touchEnd = useRef<number | null>(null);
  const touchStartTime = useRef<number | null>(null);

  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = e.targetTouches[0].clientX;
    touchStartTime.current = Date.now();
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const handleNextClick = () => {
    setIsAnimatingFoward(true);
    setViewed((prev) => new Set(prev).add(index));
    setPreviousIndex(index);
    setIndex((prevIndex) => (prevIndex + 1) % splits.length);
  };

  const handlePreviousClick = () => {
    setIsAnimatingBackward(true);
    setViewed((prev) => new Set(prev).add(index));
    setPreviousIndex(index);
    setIndex((prevIndex) => (prevIndex - 1 + splits.length) % splits.length);
  };

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    const timeElapsed = touchStartTime?.current
      ? Date.now() - touchStartTime?.current
      : 0;
    const velocity = Math.abs(distance / timeElapsed);
    const velocityTriggered = velocity > 0.5;

    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (velocityTriggered) {
      if (isLeftSwipe) {
        handleNextClick();
      } else if (isRightSwipe) {
        handlePreviousClick();
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimatingBackward(false), 300);
    return () => clearTimeout(timer);
  }, [index, setIsAnimatingBackward]);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimatingFoward(false), 300);
    return () => clearTimeout(timer);
  }, [index, setIsAnimatingFoward]);

  if (!splits.length) {
    return null;
  }

  return (
    <div className="flex flex-col w-full items-center gap-4">
      <div className="flex justify-between max-md:items-center md:items-end w-full min-h-[30px] px-2 max-w-[700px] relative">
        <div className="">
          <div className="font-semibold tracking-tighter text-2xl max-md:text-lg gap-[4px] flex items-center">
            Discover
          </div>
          <div className="font-semibold tracking-tighter text-md max-md:text-sm text-stone-500">
            Find a split that works for you.
          </div>
        </div>
        <div className="flex flex-col items-center gap-[8px]">
          {viewed.size >= splits.length - 1 ? (
            <Button className="font-bold" size="sm" onClick={refetch}>
              View More
            </Button>
          ) : (
            <div className="md:hidden">
              <ScrollInstructions />
            </div>
          )}

          <div className="flex items-center gap-[4px]">
            {splits.map((s, idx) => {
              return (
                <div
                  id={s.id}
                  className={cn(
                    "rounded-full h-[6px] w-[6px] border-black border-[1px] transition-all duration-300",
                    idx === index
                      ? "bg-black h-3 w-3"
                      : viewed.has(idx)
                        ? "bg-black"
                        : "",
                  )}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-full relative">
        <Button
          className="bg-white text-black rounded-full h-12 w-12 absolute left-8 top-[30%] max-md:hidden z-50"
          size="icon"
          onClick={handlePreviousClick}
        >
          <ChevronLeft />
        </Button>
        <Button
          className="bg-white text-black rounded-full h-12 w-12 absolute right-8 top-[30%] max-md:hidden z-50"
          size="icon"
          onClick={handleNextClick}
        >
          <ChevronRight />
        </Button>
        <div
          className="relative w-full"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onTouchMove={onTouchMove}
        >
          {/* from left old card*/}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${isAnimatingFoward ? "opacity-100 -translate-x-[100%]" : "opacity-0"}`}
          >
            <SplitCard split={splits[previousIndex]} />
          </div>
          {/* from right old card*/}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${isAnimatingBackward ? "opacity-100 translate-x-[100%]" : "opacity-0"}`}
          >
            <SplitCard split={splits[previousIndex]} />
          </div>
          <div
            className={`flex items-center justify-center transition-transform duration-300 ${isAnimatingFoward || isAnimatingBackward ? "opacity-0" : "opacity-100"}`}
          >
            <SplitCard split={splits[index]} />
          </div>
          {/* from right new card */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${isAnimatingFoward ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"}`}
          >
            <SplitCard split={splits[index]} />
          </div>
          {/* from left new card */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${isAnimatingBackward ? "opacity-100 -translate-x-0" : "opacity-0 -translate-x-full"}`}
          >
            <SplitCard split={splits[index]} />
          </div>
        </div>
      </div>
    </div>
  );
};
