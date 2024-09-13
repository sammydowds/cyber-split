import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { MonthTable } from "@/components/MonthTable";
import { SplitDeep } from "@/types";
import {
  createWorkoutSchedule,
  WorkoutScheduleResult,
} from "@/lib/programming/createWorkoutSchedule";
import { DashCard } from "../../DashCard";
import { Calendar } from "lucide-react";

const DAYS = [
  "Sundays",
  "Mondays",
  "Tuesdays",
  "Wednesdays",
  "Thursdays",
  "Fridays",
  "Saturdays",
] as const;

interface ScheduleCardProps {
  schedule: WorkoutScheduleResult["schedule"];
  split: SplitDeep;
}
export const ScheduleCard = ({ schedule, split }: ScheduleCardProps) => {
  const skipDayText = split.skipDays?.length
    ? `This schedule skips ${split.skipDays.map((d) => DAYS[d]).join(", ")}.`
    : "";
  const dayStartedText = `This schedule was created on ${new Date(split.created).toLocaleDateString()}.`;
  return (
    <DashCard className="w-[500px] max-md:w-full">
      <CardHeader className="max-md:p-4 max-md:pb-0 pb-0">
        <CardTitle className="flex items-center gap-[4px]">
          <Calendar className="h-4 w-4" /> Schedule
        </CardTitle>
        <CardDescription>
          {dayStartedText}
          {skipDayText}
        </CardDescription>
      </CardHeader>
      <CardContent className="max-md:p-2 max-md:pt-0">
        <MonthTable weeks={schedule} />
      </CardContent>
    </DashCard>
  );
};
