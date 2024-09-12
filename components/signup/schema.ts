"use client";

import { z } from "zod";

export const schema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6).max(20),
    confirmPassword: z.string().min(6).max(20),
  })
  .refine((schema) => schema?.confirmPassword === schema?.password, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
