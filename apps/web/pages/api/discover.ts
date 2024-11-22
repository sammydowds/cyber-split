import { discoverSplits } from "@repo/database";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  const templates = await discoverSplits();
  return res.status(200).json({ data: templates });
};

export default handler;
