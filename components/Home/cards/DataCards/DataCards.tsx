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
    <DashCard className="xl:w-[1012px] max-xl:w-[500px] max-md:w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-[4px]">
          <ChartNoAxesCombined className="h-5 w-5" /> Data
        </CardTitle>
        <CardDescription>
          Recorded from the current programming.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <div className="flex gap-4 h-full w-full overflow-hidden overflow-x-auto ">
          {Object.keys(data).length ? (
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
          ) : null}
          {Object.keys(data)?.length === 0 ? (
            <div className="w-full flex items-center justify-center text-sm text-stone-500 h-[200px]">
              Log workouts to populate exercise data.
            </div>
          ) : null}
        </div>
      </CardContent>
    </DashCard>
  );
};
