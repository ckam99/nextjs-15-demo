import { cookies } from "next/headers";

import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest) {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  _request.cookies.clear()
  return NextResponse.json({});
}