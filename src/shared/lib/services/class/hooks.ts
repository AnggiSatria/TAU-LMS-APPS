import { useMutation, useQuery } from "@tanstack/react-query";
import { listFilter } from "../../interfaces/filter.interfaces";
import { getClasses, postClasses } from "./fetcher";
import { IRequestCreateClass } from "../../interfaces/classes.interface";
import { toast } from "sonner";

export const useReadClasses = ({
  activeFilter,
}: {
  activeFilter: listFilter;
}) => {
  return useQuery({
    queryKey: ["read-classes", activeFilter],
    queryFn: async () => await getClasses({ activeFilter }),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });
};

export const useCreateClass = () => {
  const mutations = useMutation({
    mutationFn: async (payload: IRequestCreateClass) => postClasses(payload),
    mutationKey: ["post-class"],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      toast(err.response.data.message);
    },
  });

  return { mutations };
};
