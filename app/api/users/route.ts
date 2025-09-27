// import { api, HandleApiError } from "@/lib/api/server";
// import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import type { User } from "@/features/users/types/user";
import { HandleApiError, safeFetch } from "@/lib/api/server";


export async function GET(_request: NextRequest) {
  try {
    const data = await safeFetch<User[]>("/users", {
      method: "GET",
      request: _request,
    });
    return NextResponse.json(data);
  } catch (error) {
    return HandleApiError(error, _request);
  }
}
