import { useTemplateWorkout } from "@/hooks/useTemplateWorkout";
import { useRouter } from "next/router";
import { LogWorkoutForm } from "@/components/LogWorkoutForm/LogWorkoutForm";
import { useLogData } from "@/hooks/useLogData";
import { LoadingLogWorkoutForm } from "@/components/LogWorkoutForm/LoadingLogWorkoutForm";
import { useCreateLoggedWorkout } from "@/hooks/useCreateLoggedWorkout";

export default function LogWorkout() {
  const router = useRouter();
  const templateId = router?.query?.id as string;
  const { data, isPending } = useLogData(templateId);

  if (isPending) {
    return <LoadingLogWorkoutForm />;
  }

  if (!data && !isPending) {
    return "Error looking up workout";
  }

  return (
    <main>
      <div className="flex flex-col items-center justify-start h-screen w-screen">
        <LogWorkoutForm template={data} />
      </div>
    </main>
  );
}
