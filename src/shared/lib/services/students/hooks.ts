import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { IRequestCreateStudent } from "../../interfaces/students.interfaces";
import { postStudents } from "./fetcher";

export const useCreateStudent = ({ navigate }: { navigate: () => void }) => {
  const mutations = useMutation({
    mutationFn: async (payload: IRequestCreateStudent) => postStudents(payload),
    mutationKey: ["post-student"],
    onSuccess: () => {
      toast(`Register as student succesfull`);
      navigate();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      toast(err.response.data.message);
    },
  });

  return { mutations };
};
