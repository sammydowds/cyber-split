import { SplitDeep } from "@/types";
import { ExerciseChart } from "./ExerciseChart";
import { useSplitChartData, Y_LABEL } from "@/hooks/useSplitChartData";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartNoAxesCombined } from "lucide-react";
import { DashCard } from "@/components/DashCard";

interface DataProps {
  split: SplitDeep;
}
export const DataCards = ({ split }: DataProps) => {
  const { data } = useSplitChartData(split);
  return (
    <DashCard className="max-w-[1012px] w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-[4px]">
          <ChartNoAxesCombined className="h-4 w-4" /> Results
        </CardTitle>
        <CardDescription>
          Recorded from the current programming.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <div className="flex gap-4 h-full w-full overflow-hidden overflow-x-auto ">
          <div className="flex items-center flex-row w-max gap-4 px-4">
            {Object.keys(data).map((exerciseKey) => {
              const chosenLabel = data[exerciseKey][Y_LABEL.ONE_REP_MAX]
                ? Y_LABEL.ONE_REP_MAX
                : Y_LABEL.REP_COUNT;
              const chosenData = data[exerciseKey][chosenLabel] ?? [];
              return (
                <ExerciseChart
                  data={chosenData}
                  name={exerciseKey}
                  type={chosenLabel}
                />
              );
            })}
          </div>
          {Object.keys(data)?.length === 0 ? (
            <div className="w-full h-full flex items-center justify-center text-sm text-stone-600">
              Log workouts to record data
            </div>
          ) : null}
        </div>
      </CardContent>
    </DashCard>
  );
};
