import { ActiveSplitDeep } from "@repo/database";
import { Section, SectionContent, SectionHeader } from "./components/sections";
import { Page } from "./components/pages";
import { WorkoutMarker } from "../WorkoutMarker";
import Link from "next/link";
import { Loader } from "lucide-react";
import { useDraftLoggedWorkout } from "./hooks/useDraftLoggedWorkout";
import { LogWorkoutForm } from "./components/LogWorkoutForm";

interface LogWorkoutPageProps {
  activeSplit: ActiveSplitDeep;
  workoutId: string;
}
export const LogWorkoutPage = ({
  activeSplit,
  workoutId,
}: LogWorkoutPageProps) => {
  const { data: workout, isPending } = useDraftLoggedWorkout(workoutId);

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

  return (
    <Page>
      <Section>
        <SectionHeader>
          <div className="flex items-center gap-[8px]">
            <div className="flex items-start h-full">
              <span
                role="img"
                aria-label="🗒️"
                className="flex items-start text-[36px] p-0 m-0"
              >
                🗒️
              </span>
            </div>
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
        </SectionHeader>
        <div className="mt-8">
          <LogWorkoutForm workout={workout} />
        </div>
      </Section>
    </Page>
  );
};
