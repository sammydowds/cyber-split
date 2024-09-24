import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/api/supabaseClient";
import { prisma } from "@/lib/prismaClient";

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
  if (!user?.email) {
    return res.status(401).json({ error: "Invalid user" });
  }

  const profile = await prisma.profile.findUnique({
    where: {
      email: user.email,
    },
  });
  res.status(200).json({ data: profile });
};

export default handler;
