import { useQuery } from "@tanstack/react-query";
import { fetchUserAction, fetchUsersAction } from "@/features/users/actions/user-action";


export const useFetchUserQuery = (userId: string) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn:  async() => fetchUserAction(userId),
    // staleTime: 1000 * 60 * 5, // 5 minutes
    // refetchOnWindowFocus: false,
  });
};

export const useFetchUsersQuery = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => fetchUsersAction(),
    //initialData: [],
    // staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
};
