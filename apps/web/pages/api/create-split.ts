import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/api/supabaseClient";
import { prisma } from "@repo/database";
import { Units } from "@prisma/client";
import { FormSchemaType } from "@/components/SplitForm/schema";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
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

  // find split with no end set
  const payload = req.body as FormSchemaType;
  const { cadence, splitType, workouts, skipDays, name, active } = payload;
  if (!cadence || !splitType || !workouts?.length) {
    return res
      .status(400)
      .json({ error: "Unable to build split with incomplete data." });
  }

  const split = await prisma.split.create({
    data: {
      profileId: profile.id,
      cadence,
      type: splitType,
      active,
      name,
      workouts: {
        create: workouts.map((w) => ({
          name: w.name,
          letterLabel: w.letterLabel,
          profileId: profile.id,
          units: Units.IMPERIAL,
          strengthGroups: {
            create: w.strengthGroups.map((g: any) => ({
              ...g,
              sets: {
                create: g.sets.map((s: any) => ({
                  ...s,
                  exercise: {
                    connect: { id: s.exercise.id },
                  },
                })),
              },
            })),
          },
        })),
      },
      skipDays: skipDays,
    },
    include: {
      workouts: {
        include: {
          strengthGroups: {
            include: {
              sets: true,
            },
          },
        },
      },
    },
  });

  return res.status(200).json({ data: split });
};

export default handler;
