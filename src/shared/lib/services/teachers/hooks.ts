import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { postTeachers } from "../teachers/fetcher";
import { IRequestCreateTeacher } from "../../interfaces/teachers.interfaces";

export const useCreateTeacher = ({ navigate }: { navigate: () => void }) => {
  const mutations = useMutation({
    mutationFn: async (payload: IRequestCreateTeacher) => postTeachers(payload),
    mutationKey: ["post-teacher"],
    onSuccess: () => {
      toast(`Register as teacher succesfull`);
      navigate();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      toast(err.response.data.message);
    },
  });

  return { mutations };
};
