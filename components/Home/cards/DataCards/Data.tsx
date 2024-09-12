import { SplitDeep } from "@/types";
import { ExerciseChart } from "./ExerciseChart";
import { useSplitChartData, Y_LABEL } from "@/hooks/useSplitChartData";

interface DataProps {
  split: SplitDeep;
}
export const Data = ({ split }: DataProps) => {
  const { data } = useSplitChartData(split);
  return (
    <div className="flex gap-4 p-4 h-full flex-wrap">
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
      {Object.keys(data)?.length === 0 ? (
        <div className="w-full h-full flex items-center justify-center text-sm text-stone-600">
          Log workouts to record data
        </div>
      ) : null}
    </div>
  );
};
