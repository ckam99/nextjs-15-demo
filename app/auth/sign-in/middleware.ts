import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
   console.log("=== YOU ARE CONNECTED ===", !!token);
  if (token) {
    console.log("=== YOU ARE CONNECTED ===");
   //  return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}
