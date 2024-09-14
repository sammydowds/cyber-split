import { useFormContext, useWatch } from "react-hook-form";
import { useGenerateSplitWorkouts } from "@/hooks/useGenerateSplitWorkouts";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { SplitWorkoutCard } from "@/components/SplitWorkoutCard";
import { LoadingWorkoutCard } from "@/components/LoadingWorkoutCard";
import { Repeat2 } from "lucide-react";

export const BuildWorkouts = () => {
  const form = useFormContext();
  const { mutate: generateSplitWorkouts, isPending } = useGenerateSplitWorkouts(
    {
      onSuccess: (data) => {
        form.setValue("workouts", data.data ?? []);
      },
    },
  );
  const { splitType, muscles, workouts } = useWatch({ control: form.control });

  const handleReGenClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    generateSplitWorkouts({ splitType, muscles });
  };

  useEffect(() => {
    if (muscles && !workouts?.length) {
      generateSplitWorkouts({ splitType, muscles });
    }
  }, [muscles, generateSplitWorkouts, splitType, workouts]);

  if (!muscles) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Button
        className="flex items-center justify-center tracking-tighter gap-[4px] font-semibold text-sm text-stone-500"
        onClick={handleReGenClick}
        variant="ghost"
      >
        Rebuild
        <Repeat2 strokeWidth={1.5} />
      </Button>
      <div className="overflow-x-auto w-full">
        <div className="flex justify-center space-x-4 px-4 py-2 w-max min-w-full">
          {isPending ? (
            <>
              <LoadingWorkoutCard hideCta />
              <LoadingWorkoutCard hideCta />
              <LoadingWorkoutCard hideCta />
            </>
          ) : null}
          {workouts?.map((_: any, idx: number) => (
            <SplitWorkoutCard
              key={workouts[idx].name}
              split={{ workouts }}
              index={idx}
              hideCta
            />
          ))}
        </div>
      </div>
    </div>
  );
};
