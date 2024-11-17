import { DiscoverSplitDeep } from "@repo/database";
import { ChevronLeft, ChevronRight, Pointer } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCreateActivateSplit } from "@/hooks/useCreateActivateSplit";
import { Loading } from "./Loading";
import { useQueryClient } from "@tanstack/react-query";
import { DiscoverSplitCard } from "./DiscoverSplitCard";

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
          className="bg-white text-black rounded-full h-12 w-12 absolute left-8 top-[30%] max-md:hidden z-50 hover:bg-white"
          size="icon"
          onClick={handlePreviousClick}
        >
          <ChevronLeft />
        </Button>
        <Button
          className="bg-white text-black rounded-full h-12 w-12 absolute right-8 top-[30%] max-md:hidden z-50 hover:bg-white"
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
            className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 z-0 ${isAnimatingFoward ? "opacity-100 -translate-x-[100%]" : "opacity-0"}`}
          >
            <DiscoverSplitCard
              split={splits[previousIndex]}
            ></DiscoverSplitCard>
          </div>
          {/* from right old card*/}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 z-0 ${isAnimatingBackward ? "opacity-100 translate-x-[100%]" : "opacity-0"}`}
          >
            <DiscoverSplitCard
              split={splits[previousIndex]}
            ></DiscoverSplitCard>
          </div>
          <div
            className={`flex items-center justify-center transition-transform duration-300 z-10 ${isAnimatingFoward || isAnimatingBackward ? "opacity-0" : "opacity-100"}`}
          >
            <DiscoverSplitCard split={splits[index]}></DiscoverSplitCard>
          </div>
          {/* from right new card */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 z-0 ${isAnimatingFoward ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"}`}
          >
            <DiscoverSplitCard split={splits[index]}></DiscoverSplitCard>
          </div>
          {/* from left new card */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 z-0 ${isAnimatingBackward ? "opacity-100 -translate-x-0" : "opacity-0 -translate-x-full"}`}
          >
            <DiscoverSplitCard split={splits[index]}></DiscoverSplitCard>
          </div>
        </div>
      </div>
    </div>
  );
};
