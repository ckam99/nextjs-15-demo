
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchAuthUserAction, signInAction } from "../actions/login";
import { logoutAction } from "../actions/logout";

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

export const useAuthUserQuery = () =>
  useQuery({
    queryKey: ["authUser"],
    queryFn: () => fetchAuthUserAction(),
  });


export const useLogoutQuery = (callbacks: { onSuccess: () => Promise<void> }) => {
  return useMutation({
    mutationFn: logoutAction,
    onSuccess: callbacks.onSuccess,
  });
};