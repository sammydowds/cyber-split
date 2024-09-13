import { z } from "zod";
import {
  exerciseSchema,
  setSchema,
  strengthGroupSchema,
  schema,
} from "./zodSchema";

export type LogWorkoutSchema = z.infer<typeof schema>;

export type StrengthGroupSchemaType = z.infer<typeof strengthGroupSchema>;
export type ExerciseSchemaType = z.infer<typeof exerciseSchema>;
export type SetSchemaType = z.infer<typeof setSchema>;
