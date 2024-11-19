import { Form } from "@/components/ui/form";
import { LogExercise } from "./LogExercise/LogExercise";
import { WorkoutSummary } from "./WorkoutSummary/WorkoutSummary";
import { useLogForm } from "@/hooks/useLogForm";
import { DeepLoggedWorkout } from "@repo/database";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { Loading } from "../Loading";

interface LogWorkoutPageFormProps {
  workout: DeepLoggedWorkout;
}
export const LogWorkoutPageForm = ({ workout }: LogWorkoutPageFormProps) => {
  const { form, handleSubmit, isSaving } = useLogForm(workout);
  const params = useSearchParams();
  const name = params.get("name");
  const param_unique_name = name?.replace(/ /g, "");

  const groupIdx = workout.strengthGroups.findIndex(
    (group) => group.name.replace(/ /g, "") === param_unique_name,
  );
  return (
    <Form {...form}>
      <form
        id="log-workout"
        className="w-full flex flex-col gap-4"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        {name ? (
          <LogExercise groupIdx={groupIdx} />
        ) : (
          <>
            <WorkoutSummary />
            <Button
              disabled={isSaving}
              type="submit"
              className="max-md:w-full font-bold h-[50px] text-lg"
            >
              {isSaving ? <Loading /> : "Finish Workout"}
            </Button>
          </>
        )}
      </form>
    </Form>
  );
};
