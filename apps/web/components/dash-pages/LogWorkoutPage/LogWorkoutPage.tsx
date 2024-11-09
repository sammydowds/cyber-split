import { ActiveSplitDeep } from "@repo/database";
import { Loader, Section } from "lucide-react";
import { useDraftLoggedWorkout } from "../hooks/useDraftLoggedWorkout";
import { useQueryClient } from "@tanstack/react-query";
import { Page } from "../components/pages";
import { deleteFromDB, LOG_WORKOUT_KEY } from "@/lib/indexedDb";
import { LogWorkoutPageForm } from "./LogWorkoutPageForm";

interface LogWorkoutPageProps {
  activeSplit: ActiveSplitDeep;
  workoutId: string;
}
export const LogWorkoutPage = ({
  workoutId,
  activeSplit,
}: LogWorkoutPageProps) => {
  const {
    data: workout,
    isPending,
    isRefetching,
  } = useDraftLoggedWorkout(workoutId);

  if (isPending) {
    return (
      <div className="w-full mt-12 flex flex-col items-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (isRefetching) {
    return (
      <div className="w-full mt-12 flex flex-col items-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (!isPending && !workout) {
    return (
      <Page>
        <Section>
          <div>Oops. We had an issue loading that workout.</div>;
        </Section>
      </Page>
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
