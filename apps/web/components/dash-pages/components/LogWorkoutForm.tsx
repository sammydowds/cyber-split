import { Form } from "../../ui/form";
import { Button } from "../../ui/button";
import { Loader } from "lucide-react";
import { DeepLoggedWorkout } from "@repo/database";
import { useLogForm } from "../hooks/useLogForm";
import { useWatch } from "react-hook-form";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { ExerciseFormSection } from "./ExerciseFormSection";

interface LogWorkoutFormProps {
  workout: DeepLoggedWorkout;
}
export const LogWorkoutForm = ({ workout }: LogWorkoutFormProps) => {
  const { form, handleSubmit, isSaving, loggedWorkout } = useLogForm(workout);
  const router = useRouter();

  const { control } = form;

  const strengthGroups = useWatch({
    control,
    name: "strengthGroups",
  });

  useEffect(() => {
    if (loggedWorkout) {
      toast.success("Workout saved to server.", { duration: 3000 });
      router.push("/dashboard/active");
    }
  }, [loggedWorkout]);

  return (
    <Form {...form}>
      <form
        id="log-workout"
        className="w-full"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="flex flex-col items-center gap-4">
          {strengthGroups?.map((group, idx) => {
            return <ExerciseFormSection group={group} groupIdx={idx} />;
          })}
          <Button
            disabled={isSaving}
            type="submit"
            className="max-md:w-full font-bold h-[40px] text-lg"
          >
            {isSaving ? <Loader className="animate-spin" /> : "Log Workout"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
