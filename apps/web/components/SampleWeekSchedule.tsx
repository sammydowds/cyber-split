import { createActiveSplitWorkoutSchedule, SplitDeep } from "@repo/database";
import { WorkoutMarker } from "./WorkoutMarker";

interface SampleWeekScheduleProps {
  split: SplitDeep;
}
export const SampleWeekSchedule = ({ split }: SampleWeekScheduleProps) => {
  const { schedule } = createActiveSplitWorkoutSchedule({
    split,
    startDate: new Date(),
  });
  const firstWeek = schedule[0];
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center text-xs text-stone-500 gap-2">
        {firstWeek.map((day) => {
          return (
            <div className="flex flex-col items-center">
              <div>
                {day.date.toLocaleDateString("en-us", { weekday: "short" })}
              </div>
              <div className="h-10 w-10 bg-stone-200 rounded flex items-center justify-center">
                {day?.workout?.letterLabel ? (
                  <WorkoutMarker
                    className="h-7 w-7 text-[14px]"
                    text={day.workout.letterLabel}
                  />
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
