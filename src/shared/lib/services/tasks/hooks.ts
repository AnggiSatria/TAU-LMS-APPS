import { useMutation, useQuery } from "@tanstack/react-query";
import { listFilter } from "../../interfaces/filter.interfaces";
import {
  getTaskByClassAndUserId,
  getTaskByClassId,
  getTaskByUserId,
  getTasks,
  postTask,
} from "./fetcher";
import { IRequestCreateTask } from "../../interfaces/tasks.interfaces";
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
