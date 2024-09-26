import { SplitDeep } from "@/types";
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import {
  createWorkoutSchedule,
  Day,
} from "@/lib/programming/createWorkoutSchedule";
import { Button } from "../ui/button";
import { OctagonX, Zap } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useDeactivateSplit } from "@/hooks/useDeactivateSplit";
import { About } from "./sections/About";
import { Schedule } from "./sections/Schedule";
import { Workouts } from "./sections/Workouts";

interface ActiveSplitCardProps {
  split: SplitDeep;
}
export const ActiveSplitCard = ({ split }: ActiveSplitCardProps) => {
  const { schedule } = createWorkoutSchedule(split);
  const queryClient = useQueryClient();
  const { mutate: deativateSplit, isPending } = useDeactivateSplit({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activeSplit"] });
      queryClient.invalidateQueries({ queryKey: ["allSplits"] });
    },
  });
  return (
    <Card className="w-full max-w-[545px] overflow-hidden rounded-[6px]">
      <CardHeader className="bg-stone-100/80 py-[6px] px-[8px]">
        <CardTitle className="text-xs text-stone-700 flex items-center justify-between">
          <div className="flex items-center gap-[2px]">
            <Zap size={16} fill="#86efac" strokeWidth={0} />
            Active Programming
          </div>

          <Button
            variant="outline"
            className="font-bold bg-white flex items-center gap-[4px]"
            size="sm"
            onClick={() => deativateSplit({ id: split.id })}
          >
            <OctagonX size={14} className="text-red-500" />
            Deactivate
          </Button>
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
