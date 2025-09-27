import { User } from "@/features/users/types/user";
import { safeFetch } from "@/lib/api/client";

 export const logoutAction = async () => {
     const res = await fetch("/api/auth/logout");
     if (!res.ok) {
       const err = await res.json();
       throw new Error(err.message || "Erreur inconnue");
     }
     return await res.json();
 }

  export const fetchAuthUserAction = async (): Promise<User> => {
      return await safeFetch<User>("/auth/user");
  };
