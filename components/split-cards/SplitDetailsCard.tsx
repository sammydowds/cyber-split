import { SplitDeep } from "@/types";
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { createWorkoutSchedule } from "@/lib/programming/createWorkoutSchedule";

import { BookOpenText } from "lucide-react";
import { About } from "./sections/About";
import { Schedule } from "./sections/Schedule";
import { Workouts } from "./sections/Workouts";

interface SplitDetailsCardProps {
  split: SplitDeep;
}
export const SplitDetailsCard = ({ split }: SplitDetailsCardProps) => {
  const { schedule } = createWorkoutSchedule(split);

  return (
    <Card className="w-full max-w-[545px] overflow-hidden rounded-[6px]">
      <CardHeader className="bg-stone-100/80 py-[6px] px-[8px]">
        <CardTitle className="text-xs text-stone-700 flex items-center justify-between">
          <div className="flex items-center gap-[4px]">
            <BookOpenText size={16} />
            Details
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 py-2 px-0">
        <About split={split} />
        <Separator />
        <Schedule weeks={schedule} split={split} />
        <Workouts split={split} />
      </CardContent>
    </Card>
  );
};
