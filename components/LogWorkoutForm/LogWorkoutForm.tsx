import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./zodSchema";
import { Form } from "../ui/form";
import { StrengthGroups } from "./StrengthGroups/StrengthGroups";
import { TemplateWorkout } from "../../types";
import { useEffect } from "react";
import { LogWorkoutSchema } from "./types";
import { Button } from "../ui/button";
import { clearDB, LOG_WORKOUT_KEY, saveToDB } from "@/lib/indexedDb";
import { useCreateLoggedWorkout } from "@/hooks/useCreateLoggedWorkout";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

interface LogWorkoutProps {
  template: TemplateWorkout;
}
export const LogWorkoutForm = ({ template }: LogWorkoutProps) => {
  const queryCient = useQueryClient();
  const router = useRouter();
  const form = useForm<LogWorkoutSchema>({
    resolver: zodResolver(schema),
    defaultValues: template,
  });

  const { mutate: save, isPending: creatingLoggedWorkout } =
    useCreateLoggedWorkout({
      onSuccess: async () => {
        toast.success("Workout saved.");

        await clearDB();
        queryCient.invalidateQueries();
        form.reset();

        router.push("/dashboard");
      },
    });

  const handleSubmit = (data: LogWorkoutSchema) => {
    save(data);
  };

  const handleFormChange = async (data: LogWorkoutSchema) => {
    await saveToDB(`${LOG_WORKOUT_KEY}-${template.id}`, data);
  };

  const values = form.watch();
  useEffect(() => {
    if (!creatingLoggedWorkout) {
      handleFormChange?.(values);
    }
  }, [handleFormChange, values]);

  return (
    <div className="mx-auto max-md:mb-[150px] mb-[90px] mt-8 flex flex-col bg-white">
      <div className="flex w-full p-2 items-center relative justify-between text-xs text-stone-600">
        {template?.name ? (
          <div className="tracking-tighter font-bold pr-2">
            Name: <span className="italic">{template?.name}</span>
          </div>
        ) : null}
      </div>
      <div className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <StrengthGroups />
            <Button
              type="submit"
              disabled={creatingLoggedWorkout}
              className="w-full"
            >
              Finish
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
