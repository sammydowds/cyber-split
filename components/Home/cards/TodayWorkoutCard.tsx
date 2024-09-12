"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WorkoutMarker } from "@/components/WorkoutMarker";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { SplitDeep } from "@/types";

interface TodayWorkCardProps {
  split: SplitDeep;
}
export const TodayWorkoutCard = ({ split }: TodayWorkCardProps) => {
  const router = useRouter();
  return (
    <Card className="w-[500px] max-md:w-full">
      <CardHeader className="p-4 pb-0">
        <CardTitle>Today's Workout</CardTitle>
        <CardDescription>
          This workout should take about 30 mins. It will focus on Chest, Back,
          Biceps, and Triceps.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-2">
        <Card className="w-full p-[8px] rounded-sm border-[1px] shadow-sm">
          <div className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-[8px]">
              <WorkoutMarker text="B" className="h-[32px] w-[32px]" />
              <div className="font-bold">Upper Body</div>
            </div>
            <div>
              <Button onClick={() => router.push(`/log/${123}`)}>
                Log Workout
              </Button>
            </div>
          </div>
        </Card>
      </CardContent>
    </Card>
  );
};
