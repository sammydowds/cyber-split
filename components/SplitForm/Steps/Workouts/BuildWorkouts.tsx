import { useFormContext, useWatch } from "react-hook-form";
import { useGenerateSplitWorkouts } from "@/hooks/useGenerateSplitWorkouts";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { IoDice } from "react-icons/io5";
import { SplitWorkoutCard } from "@/components/SplitWorkoutCard";
import { LoadingWorkoutCard } from "@/components/LoadingWorkoutCard";

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
      <div className="overflow-x-auto w-full">
        <div className="flex space-x-4 p-4 w-max">
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
      <Button
        className="flex items-center justify-center tracking-tighter gap-[4px] text-sm text-stone-500"
        onClick={handleReGenClick}
        variant="ghost"
      >
        Click here to rebuild
        <div className="relative">
          <IoDice size={20} className="text-red-600" />
          <IoDice
            size={20}
            className="absolute top-0 -right-4 rotate-45 z-50 text-red-600"
          />
        </div>
      </Button>
    </div>
  );
};
