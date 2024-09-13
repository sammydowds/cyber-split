import { useTemplateWorkout } from "@/hooks/useTemplateWorkout";
import { useRouter } from "next/router";
import { LogWorkout as LogWorkoutForm } from "@/components/LogWorkout/LogWorkout";
import { useLogData } from "@/hooks/useLogData";
import { LogWorkoutSchema } from "@/components/LogWorkout/types";
import { LOG_WORKOUT_KEY, saveToDB } from "@/lib/indexedDb";

export default function LogWorkout() {
  const router = useRouter();
  const templateId = router?.query?.id as string;
  const { data, isPending } = useLogData(templateId);

  const handleFormChange = async (data: LogWorkoutSchema) => {
    await saveToDB(`${LOG_WORKOUT_KEY}-${data.id}`, data);
  };

  const handleSubmit = (data: LogWorkoutSchema) => {
    console.log("HELLO", data);
  };

  if (isPending) {
    return null;
  }

  return (
    <main>
      <div className="flex flex-col items-center justify-start h-screen w-screen">
        <LogWorkoutForm
          template={data}
          onFormChange={handleFormChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </main>
  );
}
