import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listFilter } from "../../interfaces/filter.interfaces";
import {
  deletedClasses,
  getClasses,
  getClassesByID,
  patchClasses,
  postClasses,
} from "./fetcher";
import {
  IRequestCreateClass,
  IRequestUpdateClass,
} from "../../interfaces/classes.interface";
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

export const useReadClassesById = ({
  activeFilter,
  id,
}: {
  activeFilter: listFilter;
  id?: string;
}) => {
  return useQuery({
    queryKey: ["read-classes-by-id", activeFilter, id],
    queryFn: async () => await getClassesByID({ activeFilter, id }),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    enabled: !!id,
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

export const useUpdatedClass = ({
  id,
  refetch,
}: {
  id: string | undefined;
  refetch: () => void;
}) => {
  const mutations = useMutation({
    mutationFn: async (payload: IRequestUpdateClass) =>
      patchClasses({ payload, id }),
    mutationKey: ["patch-class", id],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: () => {
      refetch();
      toast(`Updated Class Successfull`);
    },
    onError: (err: any) => {
      toast(err.response.data.message);
    },
  });

  return { mutations };
};

export const useDeletedClass = ({ refetch }: { refetch: () => void }) => {
  const queryClient = useQueryClient(); // <== tambahkan ini
  const mutations = useMutation({
    mutationFn: async (id?: string) => deletedClasses({ id }),
    mutationKey: ["deleted-class"],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: () => {
      refetch();
      queryClient.refetchQueries({
        queryKey: ["read-task-by-user-id"],
        exact: false,
      });

      toast(`Deleted Class Successfull`);
    },
    onError: (err: any) => {
      toast(err.response.data.message);
    },
  });

  return { mutations };
};
