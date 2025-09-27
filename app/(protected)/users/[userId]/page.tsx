"use client";

import { useFetchUserQuery } from "@/features/users/hooks/data/use-user-hook";

interface UserPageProps {
  params: {
    userId: string;
  };
}

export default function Page({ params }: UserPageProps) {
  const { userId } = params;

  const { data: user, isLoading, isError, error } = useFetchUserQuery(userId);

  if (isLoading) return <div>Loading...</div>;
  else if (isError) return <div>{error.message}</div>;

  // if (isLoading) return <div>Loading...</div>;

  // if (isError) {
  //   console.error(error); // Log error for debugging
  //   notFound(); // Trigger a 404 page if the user data is not found
  // }

  // if (!user) {
  //   notFound(); // If no user data is found, trigger a 404 page
  // }

  return (
    <div className="p-5">
      <h1 className=" text-3xl">{user?.first_name}</h1>
      <h1>{user?.email}</h1>
      <p>{user?.phone}</p>
    </div>
  );
}
