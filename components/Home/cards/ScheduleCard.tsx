import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { MonthTable } from "@/components/MonthTable";
import { SplitDeep } from "@/types";
import { createWorkoutSchedule } from "@/lib/programming/createWorkoutSchedule";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

interface ScheduleCardProps {
  split: SplitDeep;
}
export const ScheduleCard = ({ split }: ScheduleCardProps) => {
  const { schedule } = createWorkoutSchedule({ ...split });
  return (
    <Card className="w-[500px] max-md:w-full">
      <CardHeader className="max-md:p-4 max-md:pb-0 pb-0">
        <CardTitle>Split Schedule</CardTitle>
        <CardDescription>
          This is your schedule starting on{" "}
          {new Date(split?.created).toLocaleDateString()}. This schedule skips{" "}
          {split.skipDays.map((d) => DAYS[d]).join(", ")}.{" "}
        </CardDescription>
      </CardHeader>
      <CardContent className="max-md:p-2 max-md:pt-0">
        <MonthTable weeks={schedule} />
      </CardContent>
    </Card>
  );
};
