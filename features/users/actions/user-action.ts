import { ResponseResult } from "@/lib/api/utils";
import type { User } from "../types/user";
import { api } from "@/lib/api/client";


export const fetchUserAction = async (userId: string): Promise<User> => {
    const res = await fetch(`/${userId}`);
    const data = await res.json()
    return data
};

export const fetchUsersAction = async (): Promise<ResponseResult<User[]>> => {
  const result = await api.get<ResponseResult<User[]>>(`/users`);
    console.log("daata users", result);
  return result;
};