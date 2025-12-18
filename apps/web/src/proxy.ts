import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function isMobileUserAgent(userAgent: string): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    userAgent
  );
}

export function proxy(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") || "";

  if (isMobileUserAgent(userAgent) && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/home", request.url));
  }
}

export const config = {
  matcher: "/",
};
