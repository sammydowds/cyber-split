import { Loader, Section } from "lucide-react";
import { useDraftLoggedWorkout } from "@/hooks/useDraftLoggedWorkout";
import { LogWorkoutPageForm } from "./LogWorkoutPageForm";
import { Loading } from "../Loading";

interface LogWorkoutPageProps {
  workoutId: string;
}
export const LogWorkoutPage = ({ workoutId }: LogWorkoutPageProps) => {
  const {
    data: workout,
    isPending,
    isRefetching,
  } = useDraftLoggedWorkout(workoutId);

  if (isPending) {
    return (
      <div className="w-full mt-12 flex flex-col items-center">
        <Loading />
      </div>
    );
  }

  if (isRefetching) {
    return (
      <div className="w-full mt-12 flex flex-col items-center">
        <Loading />
      </div>
    );
  }

  if (!isPending && !workout) {
    return (
      <div>
        <div>
          <div>Oops. We had an issue loading that workout.</div>;
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 px-4 flex mb-[75px] flex-col items-center gap-6 w-full">
      <div className="md:w-[500px] max-md:w-full">
        <LogWorkoutPageForm workout={workout} />
      </div>
    </div>
  );
};
