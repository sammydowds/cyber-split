import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./zodSchema";
import { Form } from "../ui/form";
import { StrengthGroups } from "./StrengthGroups/StrengthGroups";
import { DeepLoggedWorkout, TemplateWorkout } from "../../types";
import { useEffect, useState } from "react";
import { LogWorkoutSchema } from "./types";
import { Button } from "../ui/button";
import { clearDB, LOG_WORKOUT_KEY, saveToDB } from "@/lib/indexedDb";
import { useCreateLoggedWorkout } from "@/hooks/useCreateLoggedWorkout";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Save } from "lucide-react";
import { estimateTimeOfLoggedWorkout } from "@/lib/estimateTimeOfWorkout";
import { getMusclesRecoveringFromLoggedWorkout } from "@/lib/getMusclesRecoveringFromLoggedWorkout";
import { cn } from "@/lib/utils";
import { WorkoutMarker } from "../WorkoutMarker";

interface LoggedWorkoutSuccessProps {
  workout: DeepLoggedWorkout;
}
export function LoggedWorkoutSuccess({ workout }: LoggedWorkoutSuccessProps) {
  const router = useRouter();
  const workingSets = workout.strengthGroups.flatMap((group) => {
    return group.sets.filter((set) => set.dateLogged);
  });
  const totalReps = workingSets.reduce((acc, set) => acc + (set.reps ?? 0), 0);
  const estimatedMins = estimateTimeOfLoggedWorkout(workout);
  const musclesRecovering = getMusclesRecoveringFromLoggedWorkout(workout);

  return (
    <AlertDialog open={true}>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-[4px] text-md">
            <Save className="text-fuchsia-600" />
            {workout.name} has been recoreded
          </AlertDialogTitle>
          <AlertDialogDescription>
            {workingSets.length} sets completed, {totalReps} reps done over an
            estimated duration of {estimatedMins} mins. Ensure to rest your{" "}
            <span className="capitalize">{musclesRecovering.join(", ")}</span>{" "}
            muscles for 48 hours.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction asChild>
            <Button onClick={() => router.push("/dashboard")}>
              Back to Dashboard
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

interface LogWorkoutProps {
  template: TemplateWorkout;
}
export const LogWorkoutForm = ({ template }: LogWorkoutProps) => {
  const [summary, setSummary] = useState<DeepLoggedWorkout | undefined>();
  const queryCient = useQueryClient();
  const form = useForm<LogWorkoutSchema>({
    resolver: zodResolver(schema),
    defaultValues: template,
  });

  const { mutate: save, isPending: creatingLoggedWorkout } =
    useCreateLoggedWorkout({
      onSuccess: async (data) => {
        const { data: loggedWorkout } = data;
        // clear state
        await clearDB();
        queryCient.invalidateQueries();
        form.reset();

        setSummary(loggedWorkout);
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
    <div
      className={cn(
        "max-md:mb-[150px] mb-[90px] mt-4 flex flex-col",
        summary ? "blur-md" : "",
      )}
    >
      {summary ? <LoggedWorkoutSuccess workout={summary} /> : null}

      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-[8px] px-4 py-2 w-[300px] rounded-lg overflow-hidden items-center relative text-xl bg-gradient-to-r from-yellow-100/60 from-10% via-stone-50 to-stone-200/60 shadow-lg border-none">
                <WorkoutMarker
                  className="h-10 w-10 text-xl z-50"
                  text={template.letterLabel}
                />
                {template?.name ? (
                  <div className="tracking-tighter font-bold pr-2 z-50">
                    <span>{template?.name}</span>
                  </div>
                ) : null}
              </div>
              <StrengthGroups />
              <Button
                type="submit"
                size="lg"
                disabled={creatingLoggedWorkout}
                className="text-lg font-bold"
              >
                Finish
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
