import { SplitDeep } from "@/types";
import { Day } from "@/lib/programming/createWorkoutSchedule";
import { MonthTable } from "../../MonthTable";

const DAYS = [
  "Sundays",
  "Mondays",
  "Tuesdays",
  "Wednesdays",
  "Thursdays",
  "Fridays",
  "Saturdays",
] as const;

export const Schedule = ({
  weeks,
  split,
}: {
  weeks: Day[][];
  split: SplitDeep;
}) => {
  const skipDayText = split.skipDays?.length
    ? `This schedule skips ${split.skipDays.map((d) => DAYS[d]).join(", ")}.`
    : undefined;
  return (
    <div className="text-sm flex flex-col px-4">
      <div className="font-bold">Schedule</div>
      <div className="flex items-center gap-[4px] text-xs text-stone-500">
        <div>{skipDayText ?? "No days are skipped for this schedule."}</div>
      </div>
      <MonthTable weeks={weeks} />
    </div>
  );
};
