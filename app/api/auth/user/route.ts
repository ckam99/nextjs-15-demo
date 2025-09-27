import { NextRequest, NextResponse } from "next/server";
import type { User } from "@/features/users/types/user";
import { FetchRequest, HandleApiError } from "../../utils";

export async function GET(request: NextRequest) {
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
