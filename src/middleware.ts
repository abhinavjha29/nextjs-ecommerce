import { NextResponse } from "next/server";
import { Routes } from "./utils/Routes";

export function middleware(req: any) {
  const isAdmin = req.cookies.get("isAdmin");
  const token = req.cookies.get("token");
  console.log(token);
  if (
    !token &&
    req.nextUrl.pathname.startsWith(Routes.Product || Routes.cart)
  ) {
    return NextResponse.redirect(new URL(Routes.Login, req.url));
  }
  if (!isAdmin && req.nextUrl.pathname.startsWith(Routes.ADMIN)) {
    return NextResponse.redirect(new URL(Routes.Product, req.url));
  }
  // Continue with the request
  return NextResponse.next();
}
// export const config = {
//   matcher: ["/product/:path*"], // Apply middleware to /product and its sub-paths
// };
// export const config = {
//   matcher: "/",
// };
