import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    console.log("===GLOBAL MIDDLEWARE===");
  return NextResponse.next();
}
