import { Brief } from "./Brief";
import { Dates } from "./Dates";
import { Schedule } from "./Schedule/Schedule";
import { SplitType } from "./SplitType";
import { Workouts } from "./Workouts/Workouts";
import { FormSchemaType } from "@/lib/formSchemas/create";
import { Name } from "./Name";

export const STEPS = [
  <Brief key="steps_brief" />,
  <SplitType key="steps_split_type" />,
  <Workouts key="steps_workouts" />,
  <Dates />,
  <Schedule key="steps_schedule" />,
  <Name />,
];
export const STEPS_DESCRIPTIONS = [
  "Brief",
  "Split",
  "Workouts",
  "Dates",
  "Schedule",
  "Name",
];

export const errorCheck = (step: number, values: FormSchemaType) => {
  const { splitType, muscles, cadence, workouts, name } = values;

  switch (step) {
    case 1: // Split Type
      return !splitType;
    case 2: // Muscles
      return !muscles || !workouts.length;
    case 4: // cadence
      return !cadence;
    case 5:
      return !name;

    default:
      return false; // No errors for other steps
  }
};
