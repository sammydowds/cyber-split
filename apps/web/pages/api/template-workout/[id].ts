import { NextApiRequest, NextApiResponse } from "next";
import {
  findUniqueTemplate,
  getProfile,
  lookupLastLoggedSet,
} from "@repo/database";
import { DeepTemplateWorkout } from "../../../types";

const populateWeight = async (
  profileId: string,
  groups: DeepTemplateWorkout["strengthGroups"],
) => {
  const newStrengthGroups = [];
  const exerciseIdToLastSet: { [k: string]: any } = {};

  if (groups) {
    for (const group of groups) {
      const updatedSets = [];
      for (const s of group.sets) {
        const { exercise } = s;
        let lastSet: any | null = null;

        if (exercise.id in exerciseIdToLastSet) {
          lastSet = exerciseIdToLastSet[exercise.id];
        } else {
          lastSet = await lookupLastLoggedSet(profileId, exercise.id);
          if (lastSet) {
            exerciseIdToLastSet[exercise.id] = lastSet;
          }
        }
        updatedSets.push({
          ...s,
          weight: lastSet?.weight,
          previousWeight: lastSet?.weight,
          previousReps: lastSet?.reps,
        });
      }
      newStrengthGroups.push({ ...group, sets: updatedSets });
    }
  }
  return newStrengthGroups;
};

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

  const template = await findUniqueTemplate(templateId as string);

  // prefill strength sets weight
  if (template?.strengthGroups) {
    template.strengthGroups = await populateWeight(
      profile.id as string,
      template.strengthGroups,
    );
  }

  return res.status(200).json({ data: template });
};

export default handler;
