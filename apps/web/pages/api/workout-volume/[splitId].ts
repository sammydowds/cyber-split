import { NextApiRequest, NextApiResponse } from "next";
import { findSplit, getSplitWorkoutVolume } from "@repo/database";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  const { splitId } = req.query;
  const split = await getSplitWorkoutVolume(splitId as string);
  return res.status(200).json({ data: split });
};

export default handler;
