
import { useMutation, useQuery } from "@tanstack/react-query";
import { signInAction } from "../actions/login";
import { fetchAuthUserAction, logoutAction } from "../actions/auth";

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

export const useAuthenticatedUserQuery = () =>{
  return  useQuery({
    queryKey: ["authUser"],
    queryFn: async () => fetchAuthUserAction(),
  });
}


export const useLogoutQuery = (callbacks: { onSuccess: () => Promise<void> }) => {
  return useMutation({
    mutationFn: logoutAction,
    onSuccess: callbacks.onSuccess,
  });
};