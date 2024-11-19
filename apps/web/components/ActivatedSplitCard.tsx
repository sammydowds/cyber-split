import {
  ActiveSplitDeep,
  CADENCE_TO_DESCRIPTION_MAP,
  DiscoverSplitDeep,
  FB_CADENCE,
  SPLIT_TYPE_TO_DESCRIPTION,
  SPLIT_TYPE_TO_META_DESCRIPTION,
  SPLIT_TYPES,
  SplitDeep,
  THREE_DAY_CADENCE,
  TWO_DAY_CADENCE,
  WorkoutSchedule,
} from "@repo/database";
import { useMemo, ReactNode } from "react";
import { SampleWeekSchedule } from "./SampleWeekSchedule";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { isAfter, isToday } from "date-fns";
import { Button } from "./ui/button";
import { CalendarInfoIcon } from "./CalendarInfoIcon";
import { WorkoutMarker } from "./WorkoutMarker";
import { useRouter } from "next/router";

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

interface ActivatedSplitCardProps {
  activeSplit: ActiveSplitDeep;
  children: ReactNode;
}
export const ActivatedSplitCard = ({
  activeSplit,
  children,
}: ActivatedSplitCardProps) => {
  const router = useRouter();
  const { split, schedule } = activeSplit;
  const difficultyLevel = useMemo(() => {
    return getDifficultyLevel({ split });
  }, [split]);
  const equipment = getUniqueEquipment(split).filter(Boolean);
  return (
    <div className="max-w-[800px] max-md:w-screen max-md:rounded-none rounded bg-white flex flex-col justify-between gap-2 md:border-[1px] text-black">
      <div className="flex max-md:flex-col md:flex-row max-md:w-full items-center">
        <div className="flex flex-col justify-between md:max-w-[400px] p-[8px] gap-[12px]">
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
          <div className="flex items-center gap-[3px] overflow-y-auto overflow-hidden">
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
          <div className="p-2 w-full">{children}</div>
        </div>
        <div className="p-4 h-full w-full">
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-xl tracking-tighter flex items-center gap-[4px]">
              Upcoming
            </div>
            <div className="flex flex-col overflow-y-scroll overflow-hidden h-full max-h-[300px] w-full gap-2">
              {/* @ts-ignore json to WorkoutSchedule types */}
              {activeSplit?.schedule?.map((week, weekIdx) => {
                return week.map(
                  (day: WorkoutSchedule[number][number], dayIdx: number) => {
                    const { workout, date } = day;
                    const workoutData = activeSplit.split.workouts.filter(
                      (template) =>
                        template.letterLabel === workout?.letterLabel,
                    )[0];
                    const d = new Date(date);
                    if (
                      workout &&
                      workoutData &&
                      (isToday(d) || isAfter(d, new Date()))
                    ) {
                      return (
                        <div className="flex flex-col gap-[8px] border-[1px] rounded p-2 min-w-[345px]">
                          <div className="flex items-center justify-between px-2">
                            <div className="font-semibold text-xl flex items-center gap-2">
                              <WorkoutMarker text={workout.letterLabel ?? ""} />
                              {workout.name}
                            </div>
                            <div>
                              <CalendarInfoIcon date={d} />
                            </div>
                          </div>
                          <div>
                            <Button
                              className="font-bold w-full"
                              size="lg"
                              onClick={() =>
                                router.push(`/log-workout/${workoutData.id}`)
                              }
                            >
                              Log Workout
                            </Button>
                          </div>
                        </div>
                      );
                    }
                  },
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
