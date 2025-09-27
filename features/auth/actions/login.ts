

import { safeFetch } from "@/lib/api/client";
import type { LoginRequest } from "../schemas/auth";

export const signInAction = async (body: LoginRequest) => {
  // const res = await fetch("/api/auth/login", {
  //   method: "POST",
  //   body: JSON.stringify(body),
  // });
  // if (!res.ok) {
  //   const err = await res.json();
  //   throw new Error(err.message || "Erreur inconnue");
  // }
  // return await res.json() ;
  await safeFetch("/auth/login", {
    method: "POST",
    body: body
  });
}


