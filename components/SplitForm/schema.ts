import { z } from "zod";

export const formSchema = z.object({
  splitType: z.string(),
  cadence: z.string(),
  muscles: z.string(),
  workouts: z.array(z.any()).default([]),
  skipDays: z.array(z.number()).default([]),
  name: z.string(),
  notes: z.string().nullable().default(null),
  active: z.boolean().default(false),
});

export type FormSchemaType = z.infer<typeof formSchema>;
