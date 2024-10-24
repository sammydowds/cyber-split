import { NextApiRequest, NextApiResponse } from "next";
import { FormSchemaType } from "@/lib/formSchemas/create";
import { createSplit, getProfile } from "@repo/database";

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

  // find split with no end set
  const payload = req.body as FormSchemaType;
  const { cadence, splitType, workouts, skipDays, name } = payload;
  if (!cadence || !splitType || !workouts?.length) {
    return res
      .status(400)
      .json({ error: "Unable to build split with incomplete data." });
  }

  const split = await createSplit({
    cadence,
    type: splitType,
    workouts,
    skipDays,
    active: false,
    name,
    profileId: profile.id as string,
  });

  return res.status(200).json({ data: split });
};

export default handler;
