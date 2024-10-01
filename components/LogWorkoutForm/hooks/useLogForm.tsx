import { DeepTemplateWorkout } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { LogWorkoutSchema } from "../types";
import { useForm } from "react-hook-form";
import { schema } from "../zodSchema";
import { useCreateLoggedWorkout } from "@/hooks/useCreateLoggedWorkout";
import { clearDB, LOG_WORKOUT_KEY, saveToDB } from "@/lib/indexedDb";

export const useLogForm = (template: DeepTemplateWorkout) => {
  const queryCient = useQueryClient();
  const form = useForm<LogWorkoutSchema>({
    resolver: zodResolver(schema),
    defaultValues: template,
  });
  const { mutate: save, isPending: creatingLoggedWorkout } =
    useCreateLoggedWorkout({
      onSuccess: async () => {
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
    if (!creatingLoggedWorkout) {
      saveToDB(`${LOG_WORKOUT_KEY}-${template.id}`, values);
    }
  }, [values]);

  return { handleSubmit, form };
};
