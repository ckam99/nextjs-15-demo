import { z } from "zod";

export const UserFormSchema = z.object({
  name: z.string().min(3, "Full name must be at least 3 characters."),
  username: z.string().min(2, "Username is required."),
  email: z.string().email("Invalid email format."),
});

// Infer the TypeScript type from the schema for type safety
export type UserFormData = z.infer<typeof UserFormSchema>;
