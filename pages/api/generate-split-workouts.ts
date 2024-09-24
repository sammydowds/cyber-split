import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/api/supabaseClient";
import {
  SPLIT_TYPE_PROGRAMMING_LABEL_MAP,
  SPLIT_TYPE_PROGRAMMING_MAP,
} from "@/lib/programming";
import { SPLIT_TYPES } from "@/lib/programming/enums";
import { buildSplitWorkouts } from "@/lib/api/buildSplitWorkouts";

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

  const program = SPLIT_TYPE_PROGRAMMING_MAP[splitType as SPLIT_TYPES][muscles];
  const labels =
    splitType === SPLIT_TYPES.FB
      ? ["Full Body"]
      : SPLIT_TYPE_PROGRAMMING_LABEL_MAP[
          splitType as
            | typeof SPLIT_TYPES.FOUR_DAY
            | SPLIT_TYPES.THREE_DAY
            | SPLIT_TYPES.TWO_DAY
        ][muscles];
  const workouts = await buildSplitWorkouts(program, labels);
  res.status(200).json({ data: workouts });
};

export default handler;
