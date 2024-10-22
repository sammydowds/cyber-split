import { NextApiRequest, NextApiResponse } from "next";
import { createLoggedWorkout, getProfile } from "@repo/database";
import { LogWorkoutSchema } from "@/components/LogWorkout/types";
import { DeepLoggedWorkout } from "@repo/database";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  const { email } = req.headers ?? {};
  if (!email) {
    return res.status(500).json({ error: "No email passed" });
  }
  const profile = await getProfile(email as string);
  if (!profile) {
    return res.status(500).json({ error: "No profile found" });
  }

  const payload = req.body as LogWorkoutSchema;
  const { splitId, strengthGroups } = payload;
  if (!splitId || !strengthGroups?.length) {
    return res
      .status(400)
      .json({ error: "Missing data to create logged workout object" });
  }
  const loggedWorkout = await createLoggedWorkout({
    ...payload,
    splitId,
    strengthGroups: strengthGroups as DeepLoggedWorkout["strenghthGroups"],
    profileId: profile.id as string,
  });

  return res.status(200).json({ data: loggedWorkout });
};

export default handler;
