import { useRouter } from "next/router";
import { useLogData } from "@/hooks/useLogData";
import { LogWorkout as LogWorkoutForm } from "@/components/LogWorkout/LogWorkout";

export default function LogWorkout() {
  const router = useRouter();
  const templateId = router?.query?.id as string;
  const { data, isPending } = useLogData(templateId);

  if (!data && !isPending) {
    return "Error looking up workout";
  }

  return (
    <main className="w-full md:bg-stone-200/80 h-screen">
      <div className="flex flex-col items-center md:justify-center w-full h-full max-md:pt-0">
        <div className="max-w-[500px] max-md:w-full">
          {data ? <LogWorkoutForm template={data} /> : null}
        </div>
      </div>
    </main>
  );
}
