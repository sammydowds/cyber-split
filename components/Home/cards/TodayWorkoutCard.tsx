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
import { MapPin } from "lucide-react";

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
      <DashCard className="w-[400px] max-md:w-full">
        <CardHeader className="p-4">
          <CardTitle className="flex items-center gap-[4px]">
            <MapPin className="h-4 w-4" /> Today's Workout
          </CardTitle>
          <CardDescription>
            There is no workout on the schedule today. Ensure to allow for
            proper muscle recovery.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-2"></CardContent>
      </DashCard>
    );
  }

  const estimatedTime = estimateTimeOfWorkout(workout);
  const muscleGroupsWorked = getBodyPartsFromWorkout(workout).join(", ");

  return (
    <DashCard className="w-[500px] max-md:w-full">
      <CardHeader className="p-4">
        <CardTitle className="flex items-center gap-[4px]">
          <MapPin className="h-4 w-4" /> Today's Workout
        </CardTitle>
        <CardDescription>
          This workout should take about {Math.round(estimatedTime / 60)} mins.
          You will work <span className="capitalize">{muscleGroupsWorked}</span>{" "}
          in this workout with a total of {workout.strengthGroups.length}{" "}
          exercises.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row items-baseline gap-4 px-2">
        <Card className="w-full p-[8px] rounded-sm border-[1px] shadow-lg">
          <div className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-[8px]">
              <WorkoutMarker
                text={workoutLabel}
                className="h-[32px] w-[32px]"
              />
              <div className="font-bold">{workout.name}</div>
            </div>
            <div>
              <Button onClick={() => router.push(`/log/${123}`)}>
                Log Workout
              </Button>
            </div>
          </div>
        </Card>
      </CardContent>
    </DashCard>
  );
};
