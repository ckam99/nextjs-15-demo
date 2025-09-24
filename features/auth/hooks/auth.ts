import { useMutation, useQuery } from "@tanstack/react-query";
import { signInAction } from "../actions/login";

export const useLoginQuery = (callbacks: {
  onSuccess: () => Promise<void>;
}) => {
  return useMutation({
    mutationFn: signInAction,
    onSuccess: callbacks.onSuccess,
    onError: (error) => {
      console.error(error.message);
    },
  });
};

// export const useAuthUserQuery = () =>
//   useQuery({
//     queryKey: ["authUser"],
//     queryFn: () => getLoggedUserAction(),
// });
