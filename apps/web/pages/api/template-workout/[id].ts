import { NextApiRequest, NextApiResponse } from "next";
import {
  findUniqueTemplate,
  getProfile,
  lastLoggedWorkout,
  prefillTemplate,
} from "@repo/database";

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
  const { id: templateId } = req.query;

  let template = await findUniqueTemplate(templateId as string);
  let lastLoggedWorkoutOfTemplate = template?.id
    ? await lastLoggedWorkout(profile.id, template?.id)
    : null;

  template = prefillTemplate(template, lastLoggedWorkoutOfTemplate);
  return res.status(200).json({ data: template });
};

export default handler;
