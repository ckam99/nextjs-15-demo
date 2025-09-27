

import type { LoginRequest } from "../schemas/auth";
import { User } from "@/features/users/types/user";

export const signInAction = async (body: LoginRequest) => {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Erreur inconnue");
  }
  return await res.json() ;
}


