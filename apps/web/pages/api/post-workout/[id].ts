import { NextApiRequest, NextApiResponse } from "next";
import { getPostWorkoutData } from "@repo/database";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  const { id: workoutId } = req.query;
  const data = await getPostWorkoutData(workoutId as string);
  return res.status(200).json({ data });
};

export default handler;
