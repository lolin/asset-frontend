import Login from "@/app/(auth)/login/page";
import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

const authPage = ["/login"];
export default function authMiddleware(
  middleware: NextMiddleware,
  requireAuth: string[] = []
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;
    if (requireAuth.includes(pathname)) {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });
      // console.log(token);
      if (!token && !authPage.includes(pathname)) {
        const url = new URL("/login", req.url);
        url.searchParams.set("callbackUrl", encodeURI(req.url));
        return NextResponse.redirect(url);
      }

      if (token) {
        if (authPage.includes(pathname)) {
          return NextResponse.redirect(new URL("/dashboard", req.url));
        }
      }
    }

    return middleware(req, next);
  };
}
