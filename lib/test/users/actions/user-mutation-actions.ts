// actions/userActions.ts
"use server";

import { User } from "./user-fetch-actions";

 // 💡 Mark this file as a Server Action

type NewUser = {
  name: string;
  username: string;
  email: string;
};

export type ActionResult<T> = {
  success: boolean;
  error?: string;
  data?: T;
};

export async function createUser(userData: NewUser): Promise<ActionResult<User>> {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      throw new Error(`Failed to create user: ${res.statusText}`);
    }

    const newUser = await res.json();

    return { success: true, data: newUser };

  } catch (error) {
    console.error("Error in createUser server action:", error);
    return {
      success: false,
      error: "Failed to submit the form. Please try again.",
    };
  }
}
