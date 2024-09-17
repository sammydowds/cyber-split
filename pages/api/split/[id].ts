import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prismaClient";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  const { id: splitId } = req.query;

  const split = await prisma.split.findUnique({
    where: {
      id: splitId as string,
    },
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
    },
  });

  return res.status(200).json({ data: split });
};

export default handler;
