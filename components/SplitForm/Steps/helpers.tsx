import { Brief } from "./Brief";
import { Schedule } from "./Schedule/Schedule";
import { SplitType } from "./SplitType";
import { Workouts } from "./Workouts/Workouts";

export const STEPS = [
  <Brief key="steps_brief" />,
  <SplitType key="steps_split_type" />,
  <Workouts key="steps_workouts" />,
  <Schedule key="steps_schedule" />,
];
export const STEPS_DESCRIPTIONS = ["Brief", "Split", "Workouts", "Schedule"];

export const STEP_FIELD_VALUES = [
  null,
  "splitType",
  "muscles",
  "cadence",
  "workouts",
];
