"use client";
import { Button } from "@/components/ui/button";
import { useFetchUsersQuery } from "@/features/users/hooks/data/use-user-hook";
import Link from "next/link";

export default function Page() {
  const { data, isLoading, isError, error, refetch } = useFetchUsersQuery();

  return (
    <div className="block p-4">
      <h2 className="text-2xl font-bold">Users List</h2>

      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div className="p-4">
          <pre className=" text-red-400">{(error as Error).message}</pre>
          <Button
            onClick={() => {
              refetch();
            }}
          >
            Retry
          </Button>
        </div>
      ) : (
        <>
          <div className="mt-10" />
          {data?.result.map((user) => (
            <div key={user.id}>
              <Link href={`/users/${user.id}`} className="underline">
                {user.first_name} {user.last_name}
              </Link>
              {/* <AppLink
                href={{ to: "/users/$userId", params: { userId: 123 } }}
                className="underline"
              >
                {user.first_name} {user.last_name}
              </AppLink> */}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
