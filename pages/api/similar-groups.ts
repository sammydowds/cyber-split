import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supbaseClient";
import {
  SPLIT_TYPE_PROGRAMMING_LABEL_MAP,
  SPLIT_TYPE_PROGRAMMING_MAP,
} from "@/lib/programming";
import { SPLIT_TYPES } from "@/lib/programming/enums";
import { buildSplitWorkouts } from "@/lib/api/buildSplitWorkouts";
import { StrengthGroup } from "@prisma/client";
import { DeepLoggedWorkout, DeepTemplateWorkout } from "@/types";
import { getSimilarExercises } from "@/lib/api/getSimilarExercises";
import { Payload } from "@/hooks/useGetSImilarGroups";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  const token = req.headers.authorization?.split(" ")[1] as string;
  const { splitType, muscles } = req.body as { [k: string]: string };

  if (!token) {
    return res.status(401).json({ error: "Auth token missing" });
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
  if (!user?.email) {
    return res.status(401).json({ error: "Invalid user" });
  }

  const payload = req.body as Payload;

  // create suggestions
  const oldExercise = payload.group.sets[0].exercise;
  const setNumber = payload.group.sets.length;
  const repsNumber = payload.group.sets[0].reps;
  let suggestedGroups = [];

  const similarExercises = await getSimilarExercises({
    exercise: oldExercise,
    limit: 5,
    ignoreExercises: payload.ignoreExercises,
  });
  for (const exercise of similarExercises) {
    let tempGroup: any = { name: exercise.name, sets: [] };
    for (let i = 0; i < setNumber; i++) {
      let tempSet = {
        reps: repsNumber,
        exercise,
      };
      tempGroup.sets.push(tempSet);
    }
    suggestedGroups.push(tempGroup);
  }

  res.status(200).json({ data: suggestedGroups });
};

export default handler;
