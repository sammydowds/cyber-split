"use client";
import { Bar, BarChart, CartesianGrid, Cell, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { date: new Date(Date.now() - 13 * 7 * 24 * 60 * 60 * 1000), volume: 2200 },
  { date: new Date(Date.now() - 12 * 7 * 24 * 60 * 60 * 1000), volume: 2700 },
  { date: new Date(Date.now() - 11 * 7 * 24 * 60 * 60 * 1000), volume: 2000 },
  { date: new Date(Date.now() - 10 * 7 * 24 * 60 * 60 * 1000), volume: 2200 },
  { date: new Date(Date.now() - 9 * 7 * 24 * 60 * 60 * 1000), volume: 2200 },
  { date: new Date(Date.now() - 8 * 7 * 24 * 60 * 60 * 1000), volume: 2450 },
  { date: new Date(Date.now() - 7 * 7 * 24 * 60 * 60 * 1000), volume: 2150 },
  { date: new Date(Date.now() - 6 * 7 * 24 * 60 * 60 * 1000), volume: 2450 },
  { date: new Date(Date.now() - 5 * 7 * 24 * 60 * 60 * 1000), volume: 3120 },
  { date: new Date(Date.now() - 4 * 7 * 24 * 60 * 60 * 1000), volume: 2890 },
  { date: new Date(Date.now() - 3 * 7 * 24 * 60 * 60 * 1000), volume: 3340 },
  { date: new Date(Date.now() - 2 * 7 * 24 * 60 * 60 * 1000), volume: 2980 },
  { date: new Date(Date.now() - 1 * 7 * 24 * 60 * 60 * 1000), volume: 3250 },
  { date: new Date(), volume: 3250 },
];

const chartConfig = {
  volume: {
    label: "Volume",
    color: "#6ee7b7",
  },
} satisfies ChartConfig;

const getBarColor = (entry: any, index: number, data: any[]) => {
  if (index === 0) return chartConfig.volume.color; // First bar color
  const prevVolume = data[index - 1].volume;
  return entry.volume >= prevVolume ? "#6ee7b7" : "#fda4af";
};

export function WeeklyVolumeBarChart() {
  return (
    <div className="px-2 max-w-[500px] w-full">
      <div>
        <div className="font-semibold text-lg tracking-tighter">
          Weekly Volume
        </div>
      </div>
      <div>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={(date) =>
                new Date(date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="volume">
              {chartData.map((entry, index) => (
                <Cell fill={getBarColor(entry, index, chartData)} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}
