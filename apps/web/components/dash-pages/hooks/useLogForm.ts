import { ActiveSplitDeep, DeepLoggedWorkout } from "@repo/database";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LogWorkoutSchema, schema } from "../../../lib/formSchemas/log";
import { useCreateLoggedWorkout } from "@/hooks/useCreateLoggedWorkout";
import { clearDB, LOG_WORKOUT_KEY, saveToDB } from "@/lib/indexedDb";

export const useLogForm = (
  template: ActiveSplitDeep["split"]["workouts"][number],
) => {
  const queryCient = useQueryClient();
  const [loggedWorkout, setLoggedWorkout] = useState<
    DeepLoggedWorkout | undefined
  >();
  const form = useForm<LogWorkoutSchema>({
    resolver: zodResolver(schema),
    defaultValues: template,
  });
  const { mutate: save, isPending: isSaving } = useCreateLoggedWorkout({
    onSuccess: async (data) => {
      setLoggedWorkout(data?.data);
      await clearDB();
      queryCient.invalidateQueries();
      form.reset();
    },
  });

  const handleSubmit = (data: LogWorkoutSchema) => {
    save(data);
  };

  const values = form.watch();
  useEffect(() => {
    if (!isSaving) {
      saveToDB(`${LOG_WORKOUT_KEY}-${template.id}`, values);
    }
  }, [values]);

  return { handleSubmit, form, isSaving, loggedWorkout };
};
