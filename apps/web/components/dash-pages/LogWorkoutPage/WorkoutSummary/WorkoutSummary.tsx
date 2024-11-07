import { useFormContext, useWatch } from "react-hook-form";
import { GroupSummary } from "./GroupSummary";
import { WorkoutMarker } from "@/components/WorkoutMarker";
import Link from "next/link";

export const WorkoutSummary = () => {
  const { control } = useFormContext();
  const workout = useWatch({
    control,
  });
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-[8px] w-full">
        <div className="text-sm">
          <h2 className="text-2xl font-bold">{workout?.name}</h2>
          <div className="flex items-center gap-[6px]">
            Workout{" "}
            <WorkoutMarker
              className="text-xs h-4 w-4"
              text={workout?.letterLabel ?? ""}
            />{" "}
            of{" "}
            <Link href={"/dashboard/active"} className="underline text-sm">
              {workout.name}
            </Link>
          </div>
        </div>
      </div>
      {workout.strengthGroups?.map((group, idx) => {
        return <GroupSummary group={group} groupIdx={idx} />;
      })}
    </div>
  );
};
