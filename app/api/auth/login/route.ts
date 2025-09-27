import { FetchRequest } from "@/app/api/utils";
import { Token } from "@/features/auth/types/auth";
import {  api, HandleApiError } from "@/lib/api/server";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export async function POST(_request: NextRequest, _response: NextResponse) {
  // try {
  //   const body = await request.json();
  //    console.log("REQ body", body);
  //    const token = await api.post<Token>(`auth/email/login`, { body });
  //    console.log("REQ token response", token.accessToken.substring(0, 10)+ "...");
  //   const res = NextResponse.json({ success: true });

  //    const cookie = await cookies();
  //   const c = cookie.set("token", token.accessToken, { maxAge: 60 * 60 * 24 * 7 });
  //    res.cookies.set("token", token.accessToken, {
  //     httpOnly: true,
  //     secure: true,
  //    // sameSite: "strict",
  //     maxAge: 60 * 60 * 24 * 7,
  //     path: "/",
  //   });
  //   return res;
  // } catch (error) {
  //   return await HandleApiError(error);
  // }

  try {
    const body = await _request.json();
    console.log("REQ body", body);
    const { status, data } = await FetchRequest<Token>(
      "/auth/email/login",
      {
        method: "POST",
        body: body,
      }
    );
    const token = data!.accessToken
    //   const cookie = await cookies();
    //   const c = cookie.set("token", token.accessToken, { maxAge: 60 * 60 * 24 * 7 });
    _response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      // sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return NextResponse.json({ status });
  } catch (error) {
    return HandleApiError(error);
  }
}
