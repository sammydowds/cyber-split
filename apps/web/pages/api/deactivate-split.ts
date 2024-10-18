import { NextApiRequest, NextApiResponse } from "next";
import { deactivateActiveSplit } from "@repo/database";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  const payload = req.body as { id: string };
  const { id } = payload;

  await deactivateActiveSplit(id);

  return res.status(200).json({ success: true });
};

export default handler;
