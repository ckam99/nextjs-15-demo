"use client";
import { useAuthUserQuery, useLogoutQuery } from "@/features/auth/hooks/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const { data: user, isLoading, isError, error } = useAuthUserQuery();

  const { isPending, mutate: logout } = useLogoutQuery({
    onSuccess: async () => {
      router.push("/auth/sign-in");
    },
  });

  if (isLoading) return <div>Loading...</div>;
  else if (isError) return <div>Error: {(error as Error).message}</div>;

  function handleLogout() {
    if (isPending) return;
    logout();
  }

  return (
    <div className="p-5">
      {user?.email}
      <div className="flex gap-6">

        <Link href={"/auth/sign-in"} className="text-blue-500 hover:underline">Lou out</Link>
       
        <button
          onClick={handleLogout}
          className="text-blue-500 hover:underline"
        >
          {isPending ? "..." : " Log out"}
        </button>
        
      </div>
    </div>
  );
}
