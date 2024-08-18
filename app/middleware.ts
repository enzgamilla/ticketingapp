// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { default } from 'next-auth/middleware'
import middleware from "next-auth/middleware";

export default middleware;

// See "Matching Paths" below to learn more
export const config = {
  //*: zero or more
  //+: one or more
  //?: zero or one
  matcher: ["/issues/:path*"],
};
