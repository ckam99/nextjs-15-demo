import axios from "@/lib/axios";
import {z} from "zod";

export const loginRequestSchema = z.object({
  email: z.email("Invalid email address"),
  password: z
    .string("Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

type LoginRequest = z.infer<typeof loginRequestSchema>;

export const signInAction = async (data: LoginRequest) =>
  await axios.post(`auth/email/login`, data);
