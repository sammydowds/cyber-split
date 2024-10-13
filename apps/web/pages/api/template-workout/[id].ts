import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/api/supabaseClient";
import { prisma } from "@repo/database";
import { Profile, Set } from "@prisma/client";
import { DeepTemplateWorkout } from "../../../types";

const lookupLastLoggedSet = async (profileId: string, exerciseId: string) => {
  const lastSets = await prisma.set.findMany({
    orderBy: {
      dateLogged: "desc",
    },
    where: {
      exerciseId,
      StrengthGroup: {
        LoggedWorkout: {
          profileId,
        },
      },
      weight: {
        not: null,
      },
      dateLogged: {
        not: null,
      },
    },
    take: 1,
  });

  return lastSets[0];
};

const populateWeight = async (
  profile: Profile,
  groups: DeepTemplateWorkout["strengthGroups"],
) => {
  const newStrengthGroups = [];
  const exerciseIdToLastSet: { [k: string]: Set } = {};

  if (groups) {
    for (const group of groups) {
      const updatedSets = [];
      for (const s of group.sets) {
        const { exercise } = s;
        let lastSet: Set | null = null;

        if (exercise.id in exerciseIdToLastSet) {
          lastSet = exerciseIdToLastSet[exercise.id];
        } else {
          lastSet = await lookupLastLoggedSet(profile.id, exercise.id);
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

  const token = req.headers.authorization?.split(" ")[1] as string;
  if (!token) {
    return res.status(401).json({ error: "Auth token missing" });
  }
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  const profile = await prisma.profile.findUnique({
    where: {
      email: user?.email,
    },
  });
  if (!profile) {
    return res.status(500).json({ error: "Unable to find profile." });
  }
  const { id: templateId } = req.query;

  const template = await prisma.templateWorkout.findUnique({
    where: {
      id: templateId as string,
    },
    include: {
      strengthGroups: {
        include: {
          sets: {
            include: {
              exercise: {
                include: {
                  equipment: true,
                },
              },
            },
          },
        },
      },
    },
  });

  // prefill strength sets weight
  if (template?.strengthGroups) {
    template.strengthGroups = await populateWeight(
      profile,
      template.strengthGroups,
    );
  }

  return res.status(200).json({ data: template });
};

export default handler;
