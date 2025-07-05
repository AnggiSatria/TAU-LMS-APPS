import { IRequestRegister } from "@/shared/lib/interfaces/auth.interfaces";
import { useMutation } from "@tanstack/react-query";
import { postRegister } from "./fetcher";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useRegister = () => {
  const mutations = useMutation({
    mutationFn: async (payload: IRequestRegister) => postRegister(payload),
    mutationKey: ["post-register"],
    onError: (err) => {
      console.error(err);
    },
  });

  return { mutations };
};
