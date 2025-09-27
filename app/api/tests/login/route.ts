import type { Token } from "@/features/auth/types/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch("http://localhost:8080/auth/email/login", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  if(!res.ok){
    throw new Error(data?.message || "Inconnu err");
  }

  const token = data as Token

  console.log(
    "=== login ok, token===",
    token.accessToken.substring(0, 10) + "..."
  );
  // Créer une réponse et ajouter le cookie
  const response = NextResponse.json({ success: true });
  response.cookies.set("token", token.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  return response;
}
