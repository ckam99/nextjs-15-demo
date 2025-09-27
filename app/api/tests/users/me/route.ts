import { cookies } from "next/headers";

import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch("http://localhost:8080/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Redirection si 401 (non authentifié)
  if (res.status === 401) {
    return NextResponse.json(
      { message: "Unauthorized", redirect: "/auth/sign-in" },
      { status: 401 }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}