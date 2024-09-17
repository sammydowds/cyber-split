import { useRouter } from "next/router";
import { LogWorkoutForm } from "@/components/LogWorkoutForm/LogWorkoutForm";
import { useLogData } from "@/hooks/useLogData";
import { LoadingLogWorkoutForm } from "@/components/LogWorkoutForm/LoadingLogWorkoutForm";

export default function LogWorkout() {
  const router = useRouter();
  const templateId = router?.query?.id as string;
  const { data, isPending } = useLogData(templateId);

  if (!data && !isPending) {
    return "Error looking up workout";
  }

  return (
    <main>
      <div
        className="flex flex-col items-center justify-start h-screen w-screen fixed overflow-hidden overflow-y-auto bg-stone-200"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='gray' fill-opacity='0.10'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      >
        {data ? <LogWorkoutForm template={data} /> : null}
      </div>
    </main>
  );
}
