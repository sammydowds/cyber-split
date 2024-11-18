import { NextApiRequest, NextApiResponse } from "next";
import { findActiveSplit, findSplit } from "@repo/database";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  const { id: activeSplitId } = req.query;
  const split = await findActiveSplit(activeSplitId as string);
  return res.status(200).json({ data: split });
};

export default handler;
