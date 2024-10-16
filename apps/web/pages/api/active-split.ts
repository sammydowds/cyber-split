import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/api/supabaseClient";
import { prisma } from "@repo/database";

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

  const split = await prisma.split.findFirst({
    where: {
      profileId: profile.id,
      active: true,
    },
    orderBy: [
      {
        created: "desc",
      },
    ],
    include: {
      workouts: {
        include: {
          strengthGroups: {
            include: {
              sets: {
                include: {
                  exercise: true,
                },
              },
            },
          },
        },
      },
      loggedWorkouts: {
        include: {
          strengthGroups: {
            include: {
              sets: {
                include: {
                  exercise: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return res.status(200).json({ data: split });
};

export default handler;
