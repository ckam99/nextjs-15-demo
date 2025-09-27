import { NextRequest, NextResponse } from "next/server";
import type { User } from "@/features/users/types/user";
import { FetchRequest, HandleApiError } from "../../utils";



type RouteParams = {
  id: string;
};

type RouteContext = {
  params: Promise<RouteParams>;
};

export async function GET(_request: NextRequest, ctx: RouteContext) {
  try {
    const { id } = await ctx.params;
    if (!id) {
      throw new Error("Invalid ID: " + id);
    }
    const data = await FetchRequest<User>(`/users/${id}`, {
      method: "GET",
      request: _request,
    });
    return NextResponse.json(data);
  } catch (error) {
    return HandleApiError(error);
  }
}
