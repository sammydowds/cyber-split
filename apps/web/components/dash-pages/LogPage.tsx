import { DeepLoggedWorkout } from "@repo/database";
import { Page } from "./components/pages";
import {
  Section,
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from "./components/sections";
import { LoggedWorkoutData } from "./components/LoggedWorkoutData";

interface LogPageProps {
  workouts: DeepLoggedWorkout[];
}
export const LogPage = ({ workouts }: LogPageProps) => {
  return (
    <Page>
      <Section>
        <div className="px-4">
          <SectionTitle>Logged Workouts</SectionTitle>
          <SectionDescription>
            Here is all of the workouts you have logged.
          </SectionDescription>
        </div>
      </Section>
      <Section>
        <div className="flex flex-col gap-12 px-4">
          {workouts?.map((workout) => {
            return <LoggedWorkoutData workout={workout} />;
          })}
        </div>
      </Section>
    </Page>
  );
};
