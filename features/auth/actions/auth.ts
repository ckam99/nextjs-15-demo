import { User } from "@/features/users/types/user";
import { api } from "@/lib/api/client";


 export const logoutAction = async () => {
     const res = await fetch("/api/auth/logout");
     if (!res.ok) {
       const err = await res.json();
       throw new Error(err.message || "Erreur inconnue");
     }
     return await res.json();
 }

  export const fetchAuthUserAction = async (): Promise<User> => {
    const res = await fetch("/api/auth/user");
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Erreur inconnue");
    }
    return await res.json();
  };
