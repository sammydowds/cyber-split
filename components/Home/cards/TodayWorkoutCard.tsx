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
import { DashCard } from "../../DashCard";
import { estimateTimeOfWorkout } from "@/lib/estimateTimeOfWorkout";
import { getBodyPartsFromWorkout } from "@/lib/getBodyPartsFromWorkout";
import { MapPin, Palmtree } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TodayWorkCardProps {
  workout?: SplitDeep["workouts"][number];
  workoutLabel?: string | null;
}
export const TodayWorkoutCard = ({
  workout,
  workoutLabel,
}: TodayWorkCardProps) => {
  const router = useRouter();

  if (!workout || !workoutLabel) {
    return (
      <DashCard className="w-[500px] max-md:w-full">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="flex items-center gap-[4px]">
            <MapPin className="h-4 w-4" /> Today's Workout
          </CardTitle>
          <CardDescription>Rest Day</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-row items-center gap-[4px] p-4 pt-2">
          There is no workout on the schedule today. Rest and recover.
        </CardContent>
      </DashCard>
    );
  }

  const estimatedTime = estimateTimeOfWorkout(workout);
  const muscleGroupsWorked = getBodyPartsFromWorkout(workout);

  return (
    <DashCard className="w-[500px] max-md:w-full">
      <CardHeader className="p-4">
        <CardTitle className="flex items-center gap-[4px] mb-[4px]">
          <MapPin className="h-4 w-4" /> Today's Workout
        </CardTitle>
        <div className="flex flex-wrap gap-[4px]">
          <Badge variant="outline">
            {workout.strengthGroups.length} Exercises
          </Badge>
          <Badge variant="outline">{Math.round(estimatedTime / 60)} mins</Badge>
          {muscleGroupsWorked.map((g) => {
            return (
              <Badge key={g} variant="outline" className="capitalize">
                {g}
              </Badge>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="flex flex-row items-baseline gap-4 px-4 max-md:px-2">
        <Card className="w-full">
          <CardContent className="py-2 px-4">
            <div className="flex items-center gap-2 md:py-2 justify-between">
              <div className="flex items-center gap-[8px]">
                <WorkoutMarker
                  text={workoutLabel}
                  className="md:h-[36px] md:w-[36px] max-md:h-[24px] max-md:w-[24px]"
                />
                <div className="font-bold max-md:text-sm md:text-lg">
                  {workout.name}
                </div>
              </div>
              <div>
                <Button
                  onClick={() => router.push(`/log-workout/${workout.id}`)}
                >
                  Log Workout
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </DashCard>
  );
};
