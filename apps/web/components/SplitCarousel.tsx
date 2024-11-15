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
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useMemo, useState, useEffect, useRef } from "react";
import { SampleWeekSchedule } from "./SampleWeekSchedule";
import { cn } from "@/lib/utils";
import { HorizontalCarousel } from "./HorizontalCarousel";
import { SmallWorkoutTemplateCard } from "./SmallWorkoutTemplateCard";
import { Button } from "@/components/ui/button";

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

interface DiscoverCard {
  split: DiscoverSplitDeep;
}
const DiscoverCard = ({ split }: DiscoverCard) => {
  const difficultyLevel = useMemo(() => {
    return getDifficultyLevel({ split });
  }, [split]);
  return (
    <div className="min-h-[400px] w-[345px] max-md:w-screen max-md:rounded-none min-w-[345px] rounded bg-white flex flex-col justify-between gap-2">
      <div className="">
        <div className="flex items-center justify-between p-2 px-4">
          <div className="text tracking-tighter font-semibold">
            {SPLIT_TYPE_TO_DESCRIPTION[split.type as SPLIT_TYPES]}
          </div>
          <DifficultyDots level={difficultyLevel} />
        </div>
      </div>
      <div className="px-4">
        <SampleWeekSchedule split={split} />
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

interface SplitCarouselProps {
  splits: DiscoverSplitDeep[];
}
export const SplitCarousel = ({ splits }: SplitCarouselProps) => {
  const [index, setIndex] = useState(0);
  const [viewed, setViewed] = useState<number[]>([]);
  const [isAnimatingFoward, setIsAnimatingFoward] = useState(false);
  const [isAnimatingBackward, setIsAnimatingBackward] = useState(false);
  const [previousIndex, setPreviousIndex] = useState(1);

  const touchStart = useRef<number | null>(null);
  const touchEnd = useRef<number | null>(null);

  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };



  const handleNextClick = () => {
    setIsAnimatingFoward(true);
    setViewed([...viewed, index]);
    setPreviousIndex(index);
    setIndex((prevIndex) => (prevIndex + 1) % splits.length);
  };

  const handlePreviousClick = () => {
    setIsAnimatingBackward(true);
    setViewed([...viewed, index]);
    setPreviousIndex(index);
    setIndex((prevIndex) => (prevIndex - 1 + splits.length) % splits.length);
  };

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
        handleNextClick()
    } else if (isRightSwipe) {
        handlePreviousClick()
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
    <div className="flex flex-col w-full items-center min-h-[500px] gap-4">
      <div className="flex items-center gap-[4px] min-h-[30px]">
        {splits.map((s, idx) => {
          return (
            <div
              id={s.id}
              className={cn(
                "rounded-full h-[6px] w-[6px] border-black border-[1px] transition-all duration-300",
                idx === index
                  ? "bg-black h-3 w-3"
                  : viewed.includes(idx)
                    ? "bg-black"
                    : "",
              )}
            ></div>
          );
        })}
      </div>
      <div className="w-full relative">
        <Button
          className="bg-white text-black rounded-full h-12 w-12 absolute left-8 top-50% max-md:hidden z-50"
          size="icon"
          onClick={handlePreviousClick}
        >
          <ChevronLeft />
        </Button>
        <Button
          className="bg-white text-black rounded-full h-12 w-12 absolute right-8 top-50% max-md:hidden z-50"
          size="icon"
          onClick={handleNextClick}
        >
          <ChevronRight />
        </Button>
        <div className="relative w-full" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} onTouchMove={onTouchMove}>
          {/* from left old card*/}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${isAnimatingFoward ? "opacity-100 -translate-x-[100%]" : "opacity-0"}`}
          >
            <DiscoverCard split={splits[previousIndex]} />
          </div>
          {/* from right old card*/}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${isAnimatingBackward ? "opacity-100 translate-x-[100%]" : "opacity-0"}`}
          >
            <DiscoverCard split={splits[previousIndex]} />
          </div>
          <div
            className={`flex items-center justify-center transition-transform duration-300 ${isAnimatingFoward || isAnimatingBackward ? "opacity-0" : "opacity-100"}`}
          >
            <DiscoverCard split={splits[index]} />
          </div>
          {/* from right new card */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${isAnimatingFoward ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"}`}
          >
            <DiscoverCard split={splits[index]} />
          </div>
          {/* from left new card */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${isAnimatingBackward ? "opacity-100 -translate-x-0" : "opacity-0 -translate-x-full"}`}
          >
            <DiscoverCard split={splits[index]} />
          </div>
        </div>
      </div>
    </div>
  );
};
