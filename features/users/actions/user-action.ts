import { ResponseResult } from "@/lib/api/utils";
import type { User } from "../types/user";
import { safeFetch } from "@/lib/api/client";


export const fetchUserAction = async (userId: string): Promise<User> => {
    // const res = await fetch(`/api/users/${userId}`);
    // if (!res.ok) {
    //   const err = await res.json();
    //   throw new Error(err.message || "Erreur inconnue");
    // }
    // return await res.json();
     return await safeFetch(`/users/${userId}`);
};

export const fetchUsersAction = async (): Promise<ResponseResult<User[]>> => {
  return await safeFetch<ResponseResult<User[]>>(`/users`);
};