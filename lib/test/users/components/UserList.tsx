// "use client";

// import { useQuery } from "@tanstack/react-query";
// import { getUsers } from "../actions/user-fetch-actions";
import Link from "next/link";
import { getUsers } from "../actions/user-fetch-actions";

type UserListProps = {
  // onRefresh: () => void
};

export const UserList = async (props: UserListProps) => {
   const users = await getUsers();

//   const { refetch, data: users = [] } = useQuery({
//     queryKey: ["users"],
//     queryFn: async () => getUsers(),
//     //initialData: [],
//     staleTime: 1000 * 60 * 5, // 5 minutes
//     refetchOnWindowFocus: false,
//   });

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <Link href={"/tests/users/" + user.id}>
            <strong>{user.name}</strong> (@{user.username}) - {user.email}
          </Link>
        </li>
      ))}
    </ul>
  );
};
