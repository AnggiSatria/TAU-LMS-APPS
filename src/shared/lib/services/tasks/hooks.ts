import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listFilter } from "../../interfaces/filter.interfaces";
import {
  deleteTask,
  getTaskByClassAndUserId,
  getTaskByClassId,
  getTaskById,
  getTaskByUserId,
  getTasks,
  patchTask,
  postTask,
} from "./fetcher";
import {
  IRequestCreateTask,
  IRequestUpdateTask,
} from "../../interfaces/tasks.interfaces";
import { toast } from "sonner";

export const useReadTasks = ({
  activeFilter,
}: {
  activeFilter: listFilter;
}) => {
  return useQuery({
    queryKey: ["read-tasks", activeFilter],
    queryFn: async () => await getTasks({ activeFilter }),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });
};

export const useReadTaskById = ({
  activeFilter,
  id,
}: {
  activeFilter: listFilter;
  id: string;
}) => {
  return useQuery({
    queryKey: ["read-task-by-id", activeFilter, id],
    queryFn: async () => await getTaskById({ activeFilter, id }),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    enabled: !!id,
  });
};

export const useReadTaskByUserId = ({
  activeFilter,
  userId,
}: {
  activeFilter: listFilter;
  userId: string;
}) => {
  return useQuery({
    queryKey: ["read-task-by-user-id", activeFilter, userId],
    queryFn: async () => await getTaskByUserId({ activeFilter, userId }),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: true,
    enabled: !!userId,
  });
};

export const useReadTaskByClassId = ({
  activeFilter,
  classId,
}: {
  activeFilter: listFilter;
  classId: string;
}) => {
  return useQuery({
    queryKey: ["read-task-by-class-id", activeFilter, classId],
    queryFn: async () => await getTaskByClassId({ activeFilter, classId }),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    enabled: !!classId,
  });
};

export const useReadTaskByClassAndUserId = ({
  activeFilter,
  classId,
  userId,
}: {
  activeFilter: listFilter;
  classId: string;
  userId: string;
}) => {
  return useQuery({
    queryKey: ["read-task-by-class-and-user-id", activeFilter, classId],
    queryFn: async () =>
      await getTaskByClassAndUserId({ activeFilter, classId, userId }),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    enabled: !!classId && !!userId,
  });
};

export const useCreateTask = ({ refetch }: { refetch: () => void }) => {
  const mutations = useMutation({
    mutationFn: async (payload: IRequestCreateTask) => postTask(payload),
    mutationKey: ["post-task"],
    onSuccess: () => {
      refetch();
      toast(`Create Task Successfull`);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      toast(err.response.data.message);
    },
  });

  return { mutations };
};

export const useUpdatedTask = ({
  refetch,
  id,
}: {
  refetch: () => void;
  id: string;
}) => {
  const mutations = useMutation({
    mutationFn: async (payload: IRequestUpdateTask) =>
      patchTask({ payload: payload, id: id }),
    mutationKey: ["updated-task"],
    onSuccess: () => {
      refetch();
      toast(`Updated Task Successfull`);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      toast(err.response.data.message);
    },
  });

  return { mutations };
};

export const useDeletedTask = ({ refetch }: { refetch: () => void }) => {
  const queryClient = useQueryClient();
  const mutations = useMutation({
    mutationFn: async (id?: string) => deleteTask(id),
    mutationKey: ["deleted-class"],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: () => {
      refetch();
      queryClient.refetchQueries({
        queryKey: ["read-classes"],
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
