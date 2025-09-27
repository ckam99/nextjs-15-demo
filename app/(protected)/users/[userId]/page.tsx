"use client";

import { useFetchUserQuery } from "@/features/users/hooks/data/use-user-hook";
import { use } from "react"; // Import use hook

interface UserPageProps {
  params: Promise<{
    userId: string;
  }>;
}

export default function Page({ params }: UserPageProps) {
  const resolvedParams = use(params); // Unwrap the promise

  // Accessing userId after unwrapping params
  const { userId } = resolvedParams;

  const { data: user, isLoading, isError, error } = useFetchUserQuery(userId);

  if (isLoading) return <div>Loading...</div>;
  else if (isError) return <div>{error.message}</div>;

  //   // if (!user) {
  //   //   notFound(); // If no user data is found, trigger a 404 page
  //   // }

  return (
    <div className="p-5">
      <h1 className="text-3xl">{user?.first_name}</h1>
      <h1>{user?.email}</h1>
      <p>{user?.phone}</p>
    </div>
  );
}
