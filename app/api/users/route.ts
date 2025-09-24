import { api, HandleApiError } from "@/lib/api/server";
import { NextRequest } from "next/server";
export const dynamic = "force-static";


export async function GET(_req: NextRequest) {
  try {
    const res = await api.get("/users");
    console.log("daata users", res);
    return Response.json(res);
  } catch (error) {
    return HandleApiError(error);
  }
}
