import { Prisma } from "@prisma/client";

export interface MuscleSpec {
  target: string;
  optional?: boolean;
  filters?: Prisma.ExerciseWhereInput[];
}
export interface Splits {
  [k: string]: MuscleSpec[][];
}
export interface SplitLabels {
  [k: string]: string[];
}
