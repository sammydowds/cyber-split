import { z } from "zod";

export const formSchema = z.object({
  splitType: z.string().nullable(),
  cadence: z.string().nullable(),
  muscles: z.string().nullable(),
  workouts: z.array(z.any()).nullable(),
  skipDays: z.array(z.number()).default([]),
});

export type FormSchemaType = z.infer<typeof formSchema>;
