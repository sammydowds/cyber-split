import { NextApiRequest, NextApiResponse } from "next";
import { createActiveSplit, getProfile } from "@repo/database";
import { ActivateSplitPayload } from "@/hooks/useActivateSplit";

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

  const payload = req.body as ActivateSplitPayload;
  const { splitId, startDate, endDate, schedule } = payload;
  await createActiveSplit(splitId, profile.id, startDate, endDate, schedule);
  return res.status(200).json({ success: true });
};

export default handler;
