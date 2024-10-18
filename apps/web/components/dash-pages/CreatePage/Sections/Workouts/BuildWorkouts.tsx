import { useFormContext, useWatch } from "react-hook-form";
import { useGenerateSplitWorkouts } from "@/hooks/useGenerateSplitWorkouts";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { SplitWorkoutCard } from "@/components/SplitWorkoutCard";
import { LoadingWorkoutCard } from "@/components/LoadingWorkoutCard";
import { Repeat2 } from "lucide-react";
import { motion } from "framer-motion";
import { FormSchemaType } from "@/lib/formSchemas/create";

export const BuildWorkouts = () => {
  const form = useFormContext();
  const { mutate: generateSplitWorkouts, isPending: generatingWorkouts } =
    useGenerateSplitWorkouts({
      onSuccess: (data) => {
        form.setValue("workouts", data.data ?? []);
      },
    });
  const { splitType, muscles, workouts } = useWatch({ control: form.control });

  const handleReGenClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    generateSplitWorkouts({ splitType, muscles });
  };

  const handleWorkoutChange = (
    newWorkout: FormSchemaType["workouts"][number],
  ) => {
    let tempWorkouts = form.getValues("workouts");
    tempWorkouts = tempWorkouts.map(
      (workout: FormSchemaType["workouts"][number]) => {
        if (newWorkout.name === workout.name) {
          return newWorkout;
        } else {
          return workout;
        }
      },
    );
    form.setValue("workouts", tempWorkouts);
  };

  useEffect(() => {
    if (muscles && !generatingWorkouts) {
      generateSplitWorkouts({ splitType, muscles });
    }
  }, [muscles]);

  if (!muscles) {
    return null;
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full max-md:w-full"
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Button
        className="flex items-center justify-center tracking-tighter gap-[4px] font-semibold text-sm text-stone-500 md:self-start"
        onClick={handleReGenClick}
        variant="ghost"
      >
        Rebuild
        <Repeat2 strokeWidth={1.5} />
      </Button>
      <div className="overflow-x-auto w-full">
        <div className="flex max-md:justify-center space-x-4 px-4 py-2 w-max mb-4 min-w-full">
          {generatingWorkouts ? (
            <>
              <LoadingWorkoutCard hideCta />
              <LoadingWorkoutCard hideCta />
            </>
          ) : null}
          {!generatingWorkouts
            ? workouts?.map((_: any, idx: number) => (
                <SplitWorkoutCard
                  key={workouts[idx].name}
                  split={{ workouts }}
                  index={idx}
                  onWorkoutChange={(workout) => handleWorkoutChange(workout)}
                  hideCta
                  editable
                />
              ))
            : null}
        </div>
      </div>
    </motion.div>
  );
};
