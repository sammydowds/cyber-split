import {
  ActiveSplitDeep,
  DeepLoggedWorkout,
  DeepTemplateWorkout,
} from "@repo/database";
import {
  Section,
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from "./components/sections";
import { Page } from "./components/pages";
import { WorkoutMarker } from "../WorkoutMarker";
import { useLogForm } from "./hooks/useLogForm";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useWatch } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { NumberInput } from "../NumberInput";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
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
    return <Loader className="animate-spin" />;
  }

  if (!isPending && !workout) {
    return <div>Oops. We had an issue loading that workout.</div>;
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
        <LogWorkoutForm workout={workout} />
      </Section>
    </Page>
  );
};
