import { NextApiRequest, NextApiResponse } from "next";
import { buildSplitWorkouts } from "@repo/database";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  const { splitType, muscles } = req.body as { [k: string]: string };
  const workouts = await buildSplitWorkouts(muscles, splitType);
  res.status(200).json({ data: workouts });
};

export default handler;
