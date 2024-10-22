import { schema } from "../../lib/formSchemas/signup";
import { supabase } from "@/lib/api/supabaseClient";
import { NextApiRequest, NextApiResponse } from "next";
import { getProfile } from "@repo/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      const formData = schema.parse(req.body);

      const { data, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });
      if (authError || !data?.user?.email) {
        return res.status(400).json({ error: authError?.message });
      }

      const profile = await getProfile(data.user.email);

      if (!profile) {
        return res
          .status(400)
          .json({ error: "We had an issue signing you up." });
      }

      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(400).json({ error: "We had an issue signing you up." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
