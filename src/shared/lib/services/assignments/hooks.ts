import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listFilter } from "../../interfaces/filter.interfaces";
import {
  getAssignments,
  getAssignmentByUserId,
  getAssignmentByTaskId,
  getAssignmentByTaskAndUserId,
  getAssignmentById,
  postAssignment,
  patchAssignment,
  deleteAssignment,
} from "./fetcher";
import { toast } from "sonner";
import {
  IRequestCreateAssignment,
  IRequestUpdateAssignment,
} from "../../interfaces/assignments.interface";

export const useReadAssignment = ({
  activeFilter,
}: {
  activeFilter: listFilter;
}) => {
  return useQuery({
    queryKey: ["read-assignments", activeFilter],
    queryFn: async () => await getAssignments({ activeFilter }),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });
};

export const useReadAssignmentById = ({
  activeFilter,
  id,
}: {
  activeFilter: listFilter;
  id: string;
}) => {
  return useQuery({
    queryKey: ["read-assignment-by-id", activeFilter, id],
    queryFn: async () => await getAssignmentById({ activeFilter, id }),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    enabled: !!id,
  });
};

export const useReadAssignmentByUserId = ({
  activeFilter,
  userId,
}: {
  activeFilter: listFilter;
  userId: string;
}) => {
  return useQuery({
    queryKey: ["read-assignment-by-user-id", activeFilter, userId],
    queryFn: async () => await getAssignmentByUserId({ activeFilter, userId }),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: true,
    enabled: !!userId,
  });
};

export const useReadAssignmentByTaskId = ({
  activeFilter,
  taskId,
}: {
  activeFilter: listFilter;
  taskId: string | null;
}) => {
  return useQuery({
    queryKey: ["read-assignment-by-task-id", activeFilter, taskId],
    queryFn: async () => await getAssignmentByTaskId({ activeFilter, taskId }),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    enabled: !!taskId,
  });
};

export const useReadAssignmentByTaskAndUserId = ({
  activeFilter,
  taskId,
  userId,
}: {
  activeFilter: listFilter;
  taskId: string | null;
  userId: string;
}) => {
  return useQuery({
    queryKey: [
      "read-assignment-by-task-and-user-id",
      activeFilter,
      userId,
      taskId,
    ],
    queryFn: async () =>
      await getAssignmentByTaskAndUserId({
        activeFilter,
        taskId: taskId,
        userId: userId,
      }),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    enabled: !!taskId && !!userId,
  });
};

export const useCreateAssignment = ({ refetch }: { refetch: () => void }) => {
  const mutations = useMutation({
    mutationFn: async (payload: IRequestCreateAssignment) =>
      postAssignment(payload),
    mutationKey: ["post-assignment"],
    onSuccess: () => {
      refetch();
      toast(`Create Assignment Successfull`);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      toast(err.response.data.message);
    },
  });

  return { mutations };
};

export const useUpdatedAssignment = ({
  refetch,
  id,
}: {
  refetch: () => void;
  id: string;
}) => {
  const mutations = useMutation({
    mutationFn: async (payload: IRequestUpdateAssignment) =>
      patchAssignment({ payload: payload, id: id }),
    mutationKey: ["updated-task-submission"],
    onSuccess: () => {
      refetch();
      toast(`Updated Assignment Successfull`);
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
    mutationFn: async (id?: string) => deleteAssignment({ id: id }),
    mutationKey: ["deleted-assignment"],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: () => {
      refetch();
      queryClient.refetchQueries({
        queryKey: ["read-assignment"],
        exact: false,
      });

      toast(`Deleted Assignment Successfull`);
    },
    onError: (err: any) => {
      toast(err.response.data.message);
    },
  });

  return { mutations };
};
