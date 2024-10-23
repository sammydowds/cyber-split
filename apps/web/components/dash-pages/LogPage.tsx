import { DeepLoggedWorkout } from "@repo/database";
import { Page } from "./components/pages";
import {
  Section,
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from "./components/sections";
import {
  differenceInCalendarDays,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  formatDistanceToNow,
} from "date-fns";
import { Separator } from "../ui/separator";

interface LoggedWorkoutDataProps {
  workout: DeepLoggedWorkout;
}
const LoggedWorkoutData = ({ workout }: LoggedWorkoutDataProps) => {
  if (!workout.dateLogged) {
    return null;
  }

  const diffMinutes = differenceInMinutes(
    new Date(),
    new Date(workout.dateLogged),
  );
  const diffHours = differenceInHours(new Date(), new Date(workout.dateLogged));
  const diffDays = differenceInCalendarDays(
    new Date(),
    new Date(workout.dateLogged),
  );
  const daysAgoText =
    diffDays > 0
      ? `${diffDays}d`
      : diffHours > 0
        ? `${diffHours}h`
        : `${diffMinutes}m`;

  return (
    <div className="flex flex-col w-full md:max-w-[300px]">
      <div className="flex items-center justify-between w-full">
        <div className="font-bold">{workout.name}</div>
        <div className="text-xs font-bold">{daysAgoText} ago</div>
      </div>

      <Separator />
      <div className="text-xs mt-[4px]">
        via <span className="italic">{workout.Split?.name}</span>
      </div>
      <div className="mt-4">
        {workout.strengthGroups.map((group) => {
          const loggedSets = group.sets.filter((set) => set.dateLogged);
          if (!loggedSets.length) {
            return null;
          }

          const formattedSets = loggedSets
            .map((set) => `${set.reps ?? " - "}x${set.weight ?? " - "}`)
            .join(", ");
          return (
            <div className="flex items-center justify-between">
              <div className="text-xs">{group.name}</div>
              <div className="flex items-center text-xs">{formattedSets}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

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
