import { NextApiRequest, NextApiResponse } from "next";
import { getAllWorkoutsForUser, getProfile } from "@repo/database";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
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

  const workouts = await getAllWorkoutsForUser(profile.id as string);

  return res.status(200).json({ data: workouts });
};

export default handler;