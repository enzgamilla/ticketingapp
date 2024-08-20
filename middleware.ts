import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(request: NextRequest) {
  // Get the token from the request cookies
  const token = await getToken({ req: request, secret });

  // If the token is not present, redirect to the login page
  if (
    !token &&
    !request.nextUrl.pathname.startsWith("/auth/login") &&
    !request.nextUrl.pathname.startsWith("/auth/singup")
  ) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Allow access to the requested page if authenticated
  return NextResponse.next();
}

// Specify which paths the middleware should apply to
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
