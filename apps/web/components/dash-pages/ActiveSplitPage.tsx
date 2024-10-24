import {
  ActiveSplitDeep,
  CADENCE_TO_DESCRIPTION_MAP,
  DayPayload,
  SPLIT_TYPE_TO_DESCRIPTION,
  SPLIT_TYPES,
} from "@repo/database";
import { ScheduleTable } from "../ScheduleTable";
import { SplitWorkoutCard } from "../SplitWorkoutCard";
import { Button } from "../ui/button";
import { useDeactivateSplit } from "@/hooks/useDeactivateSplit";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { differenceInDays, differenceInWeeks } from "date-fns";
import { useRouter } from "next/router";
import {
  Section,
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from "./components/sections";
import { Page } from "./components/pages";

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
  const router = useRouter();

  const { today } = useMemo(() => {
    const sched = activeSplit?.schedule as any;
    let upcomingDay: DayPayload | undefined;

    if (sched?.length) {
      const days = sched.flat();
      days.map((day: DayPayload) => {
        if (day.workout) {
          const now = new Date();
          const date = new Date(day.date);
          const isSameDay =
            date.getFullYear() === now.getFullYear() &&
            date.getMonth() === now.getMonth() &&
            date.getDate() === now.getDate();
          if (isSameDay) {
            upcomingDay = day;
          }
        }
      });
    }
    return { today: upcomingDay };
  }, [activeSplit.schedule]);

  return (
    <Page>
      <Section>
        <div className="flex flex-col">
          <div className="flex md:flex-row md:items-center max-md:flex-col gap-2 leading-3">
            <div className="flex gap-[8px] items-center">
              <div className="flex items-start justify-center h-full">
                <span
                  role="img"
                  aria-label="📓"
                  className="flex items-start text-[36px] p-0"
                >
                  📓
                </span>
              </div>
              <h2 className="text-3xl font-bold max-md:max-w-[300px] truncate">
                {activeSplit.split.name}
              </h2>
            </div>
          </div>
          <div className="flex items-center text-sm max-md:text-xs gap-2 max-md:gap-[8px] text-stone-500 text-[12px] leading-tightest">
            <div className="flex gap-2 items-center">
              Week{" "}
              {Math.floor(
                differenceInDays(new Date(), new Date(activeSplit.start)) / 7,
              ) + 1}{" "}
              of 4
            </div>
            <div className="text-stone-400">•</div>
            <div className="flex items-center gap-[2px] text-nowrap">
              {SPLIT_TYPE_TO_DESCRIPTION[activeSplit.split.type as SPLIT_TYPES]}
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
      {today?.workout ? (
        <div className="flex md:flex-row max-md:flex-col md:gap-8 md:w-[600px] max-md:w-full">
          <SectionHeader>
            <SectionDescription>Today's Workout</SectionDescription>
            <div className="flex items-center gap-12 max-md:justify-between">
              <SectionTitle>{today.workout.name}</SectionTitle>
              <div className="flex max-md:flex-col md:flex-row items-center justify-between">
                <Button
                  className="w-full font-bold"
                  onClick={() =>
                    router.push(
                      `/dashboard/active/log-workout/${today?.workout?.id}`,
                    )
                  }
                >
                  Workout
                </Button>
              </div>
            </div>
          </SectionHeader>
        </div>
      ) : null}

      <Section>
        <SectionHeader>
          <SectionDescription>Schedule</SectionDescription>
          <SectionTitle>
            {
              CADENCE_TO_DESCRIPTION_MAP[activeSplit.split.type][
                activeSplit.split.cadence
              ]
            }
          </SectionTitle>
        </SectionHeader>
        <SectionContent>
          <div className="md:w-max max-md:w-full">
            <ScheduleTable schedule={activeSplit.schedule as any} />
          </div>
        </SectionContent>
      </Section>
      <Section>
        <SectionHeader>
          <SectionDescription>Workouts</SectionDescription>
          <SectionTitle>
            {activeSplit.split.workouts.map((w) => w.name).join(", ")}
          </SectionTitle>
        </SectionHeader>
        <SectionContent>
          <div className="flex flex-wrap gap-4">
            {activeSplit.split.workouts?.map((_, idx: number) => {
              return (
                <SplitWorkoutCard
                  key={`workout-card-${idx}`}
                  split={activeSplit.split}
                  index={idx}
                  hideCta={false}
                />
              );
            })}
          </div>
        </SectionContent>
      </Section>
      <div></div>
    </Page>
  );
};
