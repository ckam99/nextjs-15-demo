import { Button } from "@/components/ui/button";
import { UserList } from "@/lib/test/users/components/UserList";
import Link from "next/link";
import { Suspense } from "react";





export default async function Page() {


  return (
    <div className="p-10">
      <div className="flex items-center gap-3 justify-between py-7">
        <h1 className="text-4xl">Users List</h1>
        <div>
          {/* <Button onClick={handleRefresh}>Refresh </Button> */}
          <Button asChild>
            <Link href="/tests/users/create-user">Create user</Link>
          </Button>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <UserList />
      </Suspense>
    </div>
  );
}