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
        <SectionHeader>
          <SectionTitle>Logged Workouts</SectionTitle>
          <SectionDescription>
            Here is all of the workouts you have logged.
          </SectionDescription>
        </SectionHeader>
      </Section>
      <Section>
        <div className="flex flex-col gap-12">
          {workouts?.map((workout) => {
            return <LoggedWorkoutData workout={workout} />;
          })}
        </div>
      </Section>
    </Page>
  );
};
