import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import authMiddleware from "./middlewares/authmiddleware";

export function mainmiddleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  const res = NextResponse.next();
  return res;
}

export default authMiddleware(mainmiddleware, [
  "/dashboard",
  "/brands",
  "/assets",
  "/vendors",
  "/login",
  "/register",
  "/categories",
  "/vendors",
]);
