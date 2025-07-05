import { IRequestLogin } from "@/shared/lib/interfaces/auth.interfaces";
import { useMutation } from "@tanstack/react-query";
import { postLogin } from "./fetcher";
import { toast } from "sonner";

export const useLogin = (
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const mutations = useMutation({
    mutationFn: async (payload: IRequestLogin) => postLogin(payload),
    mutationKey: ["post-login"],
    onSuccess: (res) => {
      console.log(res);
      toast(`Login Succesfull`);
      setLoading(false);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      toast(err.response.data.message);
      setLoading(false);
    },
  });

  return { mutations };
};
