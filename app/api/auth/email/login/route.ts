// app/api/auth/email/login/route.ts
import { Token } from "@/features/auth/types/auth";
import { baseApi, HandleApiError } from "@/lib/api/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const token = await baseApi.post<Token>("/auth/email/login", {body});
    const res = NextResponse.json({ success: true });
    res.cookies.set("auth_token", token.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return res;
  } catch (error) {
    return HandleApiError(error);
  }
}
