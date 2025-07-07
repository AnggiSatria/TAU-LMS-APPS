import { IRequestLogin } from "@/shared/lib/interfaces/auth.interfaces";
import { useMutation } from "@tanstack/react-query";
import { postLogin } from "./fetcher";
import { toast } from "sonner";
import Cookies from "js-cookie";

export const useLogin = ({
  setLoading,
  navigate,
}: {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  navigate: () => void;
}) => {
  const mutations = useMutation({
    mutationFn: async (payload: IRequestLogin) => postLogin(payload),
    mutationKey: ["post-login"],
    onSuccess: (res) => {
      Cookies.set(`token`, res?.data?.access_token);
      toast(`Login Succesfull`);
      setLoading(false);
      navigate();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      toast(err.response.data.message);
      setLoading(false);
    },
  });

  return { mutations };
};
