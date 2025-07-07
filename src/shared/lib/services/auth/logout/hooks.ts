import { useMutation } from "@tanstack/react-query";
import { postLogout } from "./fetcher";
import { toast } from "sonner";
import Cookies from "js-cookie";

export const useLogout = (navigate: () => void) => {
  const mutations = useMutation({
    mutationFn: async () => postLogout(),
    mutationKey: ["post-logout"],
    onSuccess: () => {
      Cookies.remove(`token`);
      localStorage.removeItem(`userData`);
      toast(`Logout Succesfull`);
      navigate();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      toast(err.response.data.message);
    },
  });

  return { mutations };
};
