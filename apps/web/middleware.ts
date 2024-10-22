import { NextRequest, NextResponse } from "next/server";
import { supabase } from "./lib/api/supabaseClient";

export const middleware = async (request: NextRequest) => {
  let response = NextResponse;
  let requestHeaders = new Headers(request.headers);

  const token = request.headers.get("Authorization")?.split(" ")[1] as string;
  if (!token) {
    return response.json(
      { error: "Invalid or expired token" },
      { status: 401 },
    );
  }
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  // error and profile checks
  if (error || !user?.email) {
    return response.json(
      { error: "Invalid or expired token" },
      { status: 401 },
    );
  }

  // set email header
  requestHeaders.set("email", user.email);
  return response.next({
    request: {
      headers: requestHeaders,
    },
  });
};

export const config = {
  matcher: ["/api/:path*"],
};