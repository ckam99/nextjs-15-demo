// import { api, HandleApiError } from "@/lib/api/server";
// import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { FetchRequest, HandleApiError } from "../utils";
import type { User } from "@/features/users/types/user";


export async function GET(_request: NextRequest) {
  try {
    const data = await FetchRequest<User[]>("/users", {
      method: "GET",
      request: _request,
    });
    return NextResponse.json(data);
  } catch (error) {
    return HandleApiError(error);
  }
}
