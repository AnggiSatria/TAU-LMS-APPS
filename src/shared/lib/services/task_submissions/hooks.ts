import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listFilter } from "../../interfaces/filter.interfaces";
import {
  deletedTaskSubmission,
  getTaskSubmissionByTaskId,
  getTaskSubmissionByClassId,
  getTaskSubmissionByID,
  getTaskSubmissionByUserId,
  getTaskSubmissions,
  patchTaskSubmission,
  postTaskSubmission,
} from "./fetcher";
import { toast } from "sonner";
import {
  IRequestCreateTaskSubmission,
  IRequestUpdateTaskSubmission,
} from "../../interfaces/task-submissions.interface";

export const useReadTaskSubmissions = ({
  activeFilter,
}: {
  activeFilter: listFilter;
}) => {
  return useQuery({
    queryKey: ["read-task-submissions", activeFilter],
    queryFn: async () => await getTaskSubmissions({ activeFilter }),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });
};

export const useReadTaskSubmissionById = ({
  activeFilter,
  id,
}: {
  activeFilter: listFilter;
  id: string;
}) => {
  return useQuery({
    queryKey: ["read-task-submission-by-id", activeFilter, id],
    queryFn: async () => await getTaskSubmissionByID({ activeFilter, id }),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    enabled: !!id,
  });
};

export const useReadTaskSubmissionByUserId = ({
  activeFilter,
  userId,
}: {
  activeFilter: listFilter;
  userId: string;
}) => {
  return useQuery({
    queryKey: ["read-task-submission-by-user-id", activeFilter, userId],
    queryFn: async () =>
      await getTaskSubmissionByUserId({ activeFilter, userId }),
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
    queryFn: async () =>
      await getTaskSubmissionByClassId({ activeFilter, classId }),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    enabled: !!classId,
  });
};

export const useReadTaskSubmissionByTaskId = ({
  activeFilter,
  taskId,
}: {
  activeFilter: listFilter;
  taskId: string | null;
}) => {
  return useQuery({
    queryKey: ["read-task-submission-by-task-id", activeFilter, taskId],
    queryFn: async () =>
      await getTaskSubmissionByTaskId({ activeFilter, taskId }),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    enabled: !!taskId,
  });
};

export const useCreateTaskSubmission = ({
  refetch,
}: {
  refetch: () => void;
}) => {
  const mutations = useMutation({
    mutationFn: async (payload: IRequestCreateTaskSubmission) =>
      postTaskSubmission(payload),
    mutationKey: ["post-task-submission"],
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
    mutationFn: async (payload: IRequestUpdateTaskSubmission) =>
      patchTaskSubmission({ payload: payload, id: id }),
    mutationKey: ["updated-task-submission"],
    onSuccess: () => {
      refetch();
      toast(`Updated Task Submission Successfull`);
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
    mutationFn: async (id?: string) => deletedTaskSubmission({ id: id }),
    mutationKey: ["deleted-task-submission"],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: () => {
      refetch();
      queryClient.refetchQueries({
        queryKey: ["read-task-submission"],
        exact: false,
      });

      toast(`Deleted Task Submission Successfull`);
    },
    onError: (err: any) => {
      toast(err.response.data.message);
    },
  });

  return { mutations };
};
