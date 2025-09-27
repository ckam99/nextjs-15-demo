import { cookies } from "next/headers";

import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  cookieStore.delete("token")
  console.log("=== logout ===");
  
   return NextResponse.json(
     { message: "Unauthorized", redirect: "/auth/sign-in" },
     { status: 401 }
   );
}