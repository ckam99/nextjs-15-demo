

import { api } from "@/lib/api/client";
import type { LoginRequest } from "../schemas/auth";
import { User } from "@/features/users/types/user";


export const signInAction = async (body: LoginRequest) =>
  // await api.post(`tests/login`, { body });
 await api.post(`auth/login`, {body});

 export const fetchAuthUserAction = async () =>
  await api.get<User>(`/auth/user`);
  // await api.get<User>(`tests/users/me`);
