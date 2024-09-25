import { z } from "zod";

export const formSchema = z.object({
  splitType: z.string().nullable(),
  cadence: z.string().nullable(),
  muscles: z.string().nullable(),
  workouts: z.array(z.any()).default([]),
  skipDays: z.array(z.number()).default([]),
  name: z.string(),
  activeOn: z.string(),
});

export type FormSchemaType = z.infer<typeof formSchema>;
