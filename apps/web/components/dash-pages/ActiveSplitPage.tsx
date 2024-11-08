import {
  ActiveSplitDeep,
  CADENCE_TO_DESCRIPTION_MAP,
  SPLIT_TYPE_TO_DESCRIPTION,
  SPLIT_TYPES,
  WorkoutSchedule,
} from "@repo/database";
import { Button } from "../ui/button";
import { useDeactivateSplit } from "@/hooks/useDeactivateSplit";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import {
  Section,
  SectionContent,
  SectionDescription,
  SectionTitle,
} from "./components/sections";
import { Page } from "./components/pages";
import { HorizontalCarousel } from "../HorizontalCarousel";
import { isAfter, isToday } from "date-fns";
import { MiniLoggedWorkoutCard } from "./components/MiniLoggedWorkoutCard";
import { UpcomingWorkoutCard } from "./components/UpcomingWorkoutCard";
import { WorkoutTemplateCard } from "../WorkoutTemplateCard";

interface ActiveSplitPageProps {
  activeSplit: ActiveSplitDeep;
}
export const ActiveSplitPage = ({ activeSplit }: ActiveSplitPageProps) => {
  const queryClient = useQueryClient();
  const { mutate: deactivateActiveSplit } = useDeactivateSplit({
    onSuccess: () => {
      toast.success("Deactivated split");
      queryClient.invalidateQueries({ queryKey: ["activeSplit"] });
    },
  });

  return (
    <Page>
      <Section>
        <div className="flex flex-col px-6">
          <div className="flex md:flex-row md:items-center max-md:flex-col gap-2 leading-3">
            <div className="flex gap-[8px] items-center">
              <h2 className="text-3xl font-bold max-md:max-w-[300px] truncate">
                {activeSplit.split.name}
              </h2>
            </div>
          </div>
          <div className="flex items-center text-sm max-md:text-xs gap-2 max-md:gap-[8px] text-stone-500 text-[12px] leading-tightest">
            <div className="flex items-center gap-[2px] text-nowrap">
              {SPLIT_TYPE_TO_DESCRIPTION[activeSplit.split.type as SPLIT_TYPES]}
            </div>
            <div className="text-stone-400">•</div>
            <div>
              {
                CADENCE_TO_DESCRIPTION_MAP[activeSplit.split.type][
                  activeSplit.split.cadence
                ]
              }
            </div>
            <div className="text-stone-400">•</div>
            <Button
              variant="link"
              size="sm"
              className="px-0 text-destructive text-md underline"
              onClick={() => deactivateActiveSplit({ id: activeSplit.id })}
            >
              Deactivate
            </Button>
          </div>
        </div>
      </Section>
      <Section>
        <div className="px-6">
          <SectionDescription>Future</SectionDescription>
          <SectionTitle>Upcoming Workouts</SectionTitle>
        </div>
        <SectionContent>
          <HorizontalCarousel>
            {// @ts-ignore json to WorkoutSchedule types
            activeSplit?.schedule?.map((week, weekIdx) => {
              return week.map(
                (day: WorkoutSchedule[number][number], dayIdx: number) => {
                  const { workout, date } = day;
                  const workoutData = activeSplit.split.workouts.filter(
                    (template) => template.id === workout?.id,
                  )[0];
                  const d = new Date(date);
                  if (
                    workout &&
                    workoutData &&
                    (isToday(d) || isAfter(d, new Date()))
                  ) {
                    return (
                      <UpcomingWorkoutCard
                        workout={workoutData}
                        dayIdx={dayIdx}
                        weekIdx={weekIdx}
                        scheduledDate={d}
                      />
                    );
                  }
                },
              );
            })}
          </HorizontalCarousel>
        </SectionContent>
      </Section>
      {activeSplit?.split?.loggedWorkouts?.length ? (
        <Section>
          <div className="px-6">
            <SectionDescription>History</SectionDescription>
            <SectionTitle>Logged Volume</SectionTitle>
          </div>
          <SectionContent>
            <HorizontalCarousel>
              {activeSplit.split.loggedWorkouts?.map((workout, idx) => {
                return (
                  <MiniLoggedWorkoutCard
                    key={`workout-card-${idx}`}
                    workout={workout}
                  />
                );
              })}
            </HorizontalCarousel>
          </SectionContent>
        </Section>
      ) : null}
      <Section>
        <div className="px-6">
          <SectionDescription>Workout Templates</SectionDescription>
          <SectionTitle>
            {activeSplit.split.workouts.map((w) => w.name).join(", ")}
          </SectionTitle>
        </div>
        <SectionContent>
          <HorizontalCarousel>
            {activeSplit.split.workouts?.map((_, idx: number) => {
              return (
                <WorkoutTemplateCard
                  key={`workout-card-${idx}`}
                  workout={activeSplit.split.workouts[idx]}
                  hideCta
                  editable
                />
              );
            })}
          </HorizontalCarousel>
        </SectionContent>
      </Section>
    </Page>
  );
};
