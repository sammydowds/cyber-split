import { DiscoverSplitDeep } from "@repo/database";
import { ChevronLeft, ChevronRight, Pointer } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const visibleIndex = cardRefs.current.indexOf(
              entry.target as HTMLDivElement,
            );
            if (visibleIndex !== -1) {
              setIndex(visibleIndex);
              setViewed((prev) => new Set(prev).add(visibleIndex));
            }
          }
        });
      },
      { threshold: 0.5 },
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      observer.disconnect();
    };
  }, [splits]);

  // needed for now, because scroll-behavior: smooth not working
  const handleScroll = (direction: number) => {
    const targetIndex = index + direction;
    const targetElement = cardRefs.current[targetIndex];
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  };

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
          {viewed.size >= splits.length ? (
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
        <a
          className={cn(
            "h-12 w-12 rounded-full items-center justify-center flex bg-white absolute top-[30%] left-8 max-md:hidden hover:cursor-pointer z-10",
            index === 0 ? "hidden" : "",
          )}
          onClick={() => handleScroll(-1)}
        >
          <ChevronLeft />
        </a>
        <a
          className={cn(
            "h-12 w-12 rounded-full items-center justify-center flex bg-white absolute top-[30%] right-8 max-md:hidden hover:cursor-pointer z-10",
            index === splits.length - 1 ? "hidden" : "",
          )}
          onClick={() => handleScroll(1)}
        >
          <ChevronRight />
        </a>

        <div className="snap-x snap-mandatory flex flex-nowrap w-full gap-8 overflow-x-scroll py-2 px-3">
          {splits.map((split, idx) => {
            return (
              <div
                id={`discover-${idx}`}
                ref={(el) => (cardRefs.current[idx] = el)}
                className="flex items-center justify-center w-full max-w-full flex-shrink-0 snap-center"
              >
                <DiscoverSplitCard split={split}></DiscoverSplitCard>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
