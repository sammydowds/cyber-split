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
import { useMemo } from "react";
import { SampleWeekSchedule } from "./SampleWeekSchedule";
import { cn } from "@/lib/utils";
import { HorizontalCarousel } from "./HorizontalCarousel";
import { Badge } from "./ui/badge";
import { WorkoutTemplateCard } from "./WorkoutTemplateCard";
import { Button } from "./ui/button";
import { Download, FileText } from "lucide-react";

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

interface DiscoverSplitCardProps {
  split: SplitDeep;
}
export const DiscoverSplitCard = ({ split }: DiscoverSplitCardProps) => {
  const difficultyLevel = useMemo(() => {
    return getDifficultyLevel({ split });
  }, [split]);

  const equipment = getUniqueEquipment(split).filter(Boolean);
  return (
    <div className="max-w-[800px] max-md:w-screen max-md:rounded-none rounded bg-white flex flex-col justify-between gap-2 text-black">
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
          {/* <div className="p-2 w-full">
            <Button
              className="w-full text-lg h-[40px] font-bold flex items-center gap-[8px]"
              onClick={() => console.log("HELLO WORLD")}
            >
              <Download />
              Download PDF
            </Button>
          </div> */}
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
