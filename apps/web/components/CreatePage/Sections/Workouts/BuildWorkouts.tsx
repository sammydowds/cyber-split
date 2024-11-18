import { useFormContext, useWatch } from "react-hook-form";
import { useGenerateSplitWorkouts } from "@/hooks/useGenerateSplitWorkouts";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { LoadingWorkoutCard } from "@/components/LoadingWorkoutCard";
import { Repeat2 } from "lucide-react";
import { motion } from "framer-motion";
import { FormSchemaType } from "@/lib/formSchemas/create";
import { HorizontalCarousel } from "@/components/HorizontalCarousel";
import { WorkoutTemplateCard } from "@/components/WorkoutTemplateCard";

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
      <HorizontalCarousel>
        {generatingWorkouts ? (
          <>
            <LoadingWorkoutCard hideCta />
            <LoadingWorkoutCard hideCta />
          </>
        ) : null}
        {!generatingWorkouts
          ? workouts?.map((_: any, idx: number) => (
              <WorkoutTemplateCard
                key={workouts[idx].name}
                workout={workouts[idx]}
                onWorkoutChange={(workout) => handleWorkoutChange(workout)}
                hideCta
                editable
              />
            ))
          : null}
      </HorizontalCarousel>
    </motion.div>
  );
};