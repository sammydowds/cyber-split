import { z } from "zod";

export const equipment = z.object({
  id: z.string(),
  name: z.string(),
  mediaUrl: z.string().optional().nullable(),
});

export const exerciseSchema = z.object({
  id: z.string(),
  name: z.string(),
  mediaUrl: z.string().optional().nullable(),
  exRxLink: z.string().optional().nullable(),
  bodyPart: z.string().optional().nullable(),
  equipment: z.array(equipment.optional().nullable()).optional().nullable(),
});

export const setSchema = z.object({
  reps: z.number().optional().nullable(),
  previousReps: z.number().optional().nullable(),
  isInterval: z.boolean().optional().nullable(),
  weight: z.number().optional().nullable(),
  previousWeight: z.number().optional().nullable(),
  distance: z.number().optional().nullable(),
  duration: z.number().optional().nullable(),
  interval: z.number().optional().nullable(),
  restPeriod: z.number().optional().nullable(),
  exercise: exerciseSchema,
  dateLogged: z.date().optional().nullable().default(null),
});

export const strengthGroupSchema = z.object({
  name: z.string(),
  sets: z.array(setSchema),
});

export const schema = z.object({
  strengthGroups: z.array(strengthGroupSchema).optional(),
  name: z.string(),
  letterLabel: z.string(),
  id: z.string(),
  splitId: z.string().optional().nullable(),
});
