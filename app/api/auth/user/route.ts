import { NextRequest, NextResponse } from "next/server";
import type { User } from "@/features/users/types/user";
import { HandleApiError, safeFetch } from "@/lib/api/server";

export async function GET(request: NextRequest) {
  try {
    const data = await safeFetch<User[]>("/users/me", {
      method: "GET",
      request,
    });
    return NextResponse.json(data);
  } catch (error) {
    return HandleApiError(error);
  }
}
