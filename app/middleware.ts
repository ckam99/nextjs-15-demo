import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    console.log("===GLOBAL MIDDLEWARE===");
  return NextResponse.next();
}
