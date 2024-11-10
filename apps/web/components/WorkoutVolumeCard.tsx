"use client";

import { Activity, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { WorkoutMarker } from "./WorkoutMarker";
import { WorkoutVolumeApiPayload } from "@repo/database";

const chartConfig = {
  desktop: {
    label: "Volume",
    color: "hsl(var(--chart-1))",
    icon: Activity,
  },
} satisfies ChartConfig;

interface WorkoutVolumeCardProps {
  workoutVolumeData: WorkoutVolumeApiPayload[string];
}
export function WorkoutVolumeCard({
  workoutVolumeData,
}: WorkoutVolumeCardProps) {
  if (!workoutVolumeData?.data) {
    return null;
  }

  return (
    <Card className="w-[300px] min-w-[300px] shadow-none border-none">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            <WorkoutMarker text={workoutVolumeData.workoutLabel} />
            <div>{workoutVolumeData.workoutName}</div>
          </div>
        </CardTitle>
        <CardDescription className="min-h-[45px] py-2">
          {" "}
          <div className="flex w-full items-start gap-2 text-sm">
            {workoutVolumeData.trend ? (
              <div className="flex gap-2 font-medium leading-none">
                <TrendingUp size={24} />
                {workoutVolumeData.trend}
              </div>
            ) : (
              <div className="flex gap-2 font-medium leading-none text-stone-500">
                No trend found at this time.
              </div>
            )}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-[4px]">
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={workoutVolumeData.data}
            margin={{
              top: 8,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="dateLogged"
              tickFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(value, name, props) => {
                    const date = new Date(
                      props.payload.dateLogged,
                    ).toLocaleDateString();
                    return (
                      <div>
                        <div>Volume: {value}</div>
                        <div>Logged: {date}</div>
                      </div>
                    );
                  }}
                />
              }
            />
            <Area
              dataKey="volume"
              type="step"
              fill="#fef08a"
              fillOpacity={0.4}
              stroke="black"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
