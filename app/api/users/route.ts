// import { api, HandleApiError } from "@/lib/api/server";
// import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { FetchRequest, HandleApiError } from "../utils";
import type { User } from "@/features/users/types/user";


export async function GET(request: NextRequest) {
  // try {
  //   const cookie = await cookies();
  //   const token = cookie.get("token")?.value;
  //   console.log("TOKEN SESSION USER REQ", token?.substring(0, 10) + "...");

  //   const t = request.cookies.get("token")?.value;
  //   console.log("TOKEN SESSION USER REQ T", t?.substring(0, 10) + "...");

  //   const res = await api.get("/users");
  //   console.log("daata users", res);
  //   return Response.json(res);
  // } catch (error) {
  //   return HandleApiError(error);
  // }

  try {
    const { status, data } = await FetchRequest<User[]>("/users", {
      method: "GET",
      request,
    });
    return NextResponse.json(data, { status });
  } catch (error) {
    return HandleApiError(error);
  }
}
