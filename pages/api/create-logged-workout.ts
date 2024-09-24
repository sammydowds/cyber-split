import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/api/supabaseClient";
import { prisma } from "@/lib/prismaClient";
import { LogWorkoutSchema } from "@/components/LogWorkoutForm/types";

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

  const payload = req.body as LogWorkoutSchema;
  const now = new Date();
  const loggedWorkout = await prisma.loggedWorkout.create({
    data: {
      name: payload.name,
      profileId: profile.id,
      splitId: payload.splitId,
      letterLabel: payload.letterLabel,
      dateLogged: now,
      units: "IMPERIAL",
      strengthGroups: {
        create: payload?.strengthGroups?.map((group: any) => ({
          name: group.name,
          sets: {
            create: group.sets.map((set: any) => ({
              ...{ ...set, previousWeight: undefined, previousReps: undefined },
              created: now,
              exercise: {
                connect: { id: set.exercise.id },
              },
            })),
          },
        })),
      },
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

  return res.status(200).json({ data: loggedWorkout });
};

export default handler;
