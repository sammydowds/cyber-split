import { NextApiRequest, NextApiResponse } from "next";
import { getFirstOrLastLoggedWorkout, getProfile } from "@repo/database";

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

  const { dateLogged, type, templateWorkoutId } = req.query;
  console.log(req.query);

  const workouts = await getFirstOrLastLoggedWorkout(
    profile.id,
    new Date(dateLogged as string),
    templateWorkoutId as string,
    type as "FIRST" | "LAST",
  );

  return res.status(200).json({ data: workouts });
};

export default handler;
