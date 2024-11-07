import { ActiveSplitDeep } from "@repo/database";
import { Section, SectionHeader } from "../components/sections";
import { Page } from "../components/pages";
import { WorkoutMarker } from "../../WorkoutMarker";
import Link from "next/link";
import { useDraftLoggedWorkout } from "../hooks/useDraftLoggedWorkout";
import { LogWorkoutForm } from "./LogWorkoutForm";
import { deleteFromDB, LOG_WORKOUT_KEY } from "@/lib/indexedDb";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "../../ui/button";
import { Loader, RotateCcw } from "lucide-react";

interface LogWorkoutPageProps {
  activeSplit: ActiveSplitDeep;
  workoutId: string;
}
export const LogWorkoutPage = ({
  activeSplit,
  workoutId,
}: LogWorkoutPageProps) => {
  const {
    data: workout,
    isPending,
    isRefetching,
  } = useDraftLoggedWorkout(workoutId);
  const queryClient = useQueryClient();

  if (isPending) {
    return (
      <Page>
        <Section></Section>
      </Page>
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

  const handleResetForm = async (e: React.MouseEvent) => {
    e?.preventDefault();
    await deleteFromDB(`${LOG_WORKOUT_KEY}-${workout.id}`);
    queryClient.invalidateQueries({ queryKey: ["logData", workout.id] });
  };

  return (
    <Page>
      <Section>
        <SectionHeader>
          <div className="flex items-center gap-[8px] px-4">
            <div className="text-sm">
              <h2 className="text-2xl font-bold">{workout?.name}</h2>
              <div className="flex items-center gap-[6px]">
                Workout{" "}
                <WorkoutMarker
                  className="text-xs h-4 w-4"
                  text={workout?.letterLabel ?? ""}
                />{" "}
                of{" "}
                <Link href={"/dashboard/active"} className="underline text-sm">
                  {activeSplit.split.name}
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between bg-stone-100 rounded m-4">
            <div className="px-4 font-bold">
              {workout.strengthGroups?.length} exercises
            </div>
            <Button
              variant="link"
              className="flex items-center font-bold gap-[4px] justify-between"
              onClick={handleResetForm}
            >
              <RotateCcw size="16" /> Reset All
            </Button>
          </div>
        </SectionHeader>

        {isRefetching ? (
          <div className="flex items-center justify-center w-full">
            <Loader className="animate-spin" />
          </div>
        ) : (
          <div className="px-4">
            <LogWorkoutForm workout={workout} />
          </div>
        )}
      </Section>
    </Page>
  );
};
