"use client";

import { Area, AreaChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChartData, Y_LABEL } from "@/hooks/useSplitChartData";

interface ExerciseChartProps {
  name: string;
  type: Y_LABEL;
  data: ChartData[];
}
export const ExerciseChart = ({ name, type, data }: ExerciseChartProps) => {
  const lastDataPoint = data[data.length - 1].y;
  return (
    <Card className="md:min-w-[245px] max-md:min-w-[345px]">
      <CardHeader className="space-y-0 p-2">
        <CardDescription>{name}</CardDescription>
        <CardTitle className="flex items-baseline gap-1 text-xl tabular-nums">
          {lastDataPoint} ({type})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer
          config={{
            time: {
              label: "Time",
              color: "hsl(var(--chart-2))",
            },
          }}
        >
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="x" hide />
            <YAxis dataKey="y" domain={["dataMin - 5", "dataMax + 2"]} hide />
            <defs>
              <linearGradient id="fillTime" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#c026d3" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#c026d3" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              dataKey="y"
              type="natural"
              fill="url(#fillTime)"
              fillOpacity={0.4}
              stroke="#c026d3"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
              formatter={(value) => (
                <div className="flex min-w-[120px] items-center text-xs text-muted-foreground">
                  One rep max
                  <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                    {value}
                    <span className="font-normal text-muted-foreground">
                      lb
                    </span>
                  </div>
                </div>
              )}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
