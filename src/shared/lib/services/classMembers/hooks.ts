import { useMutation, useQuery } from "@tanstack/react-query";
import { listFilter } from "../../interfaces/filter.interfaces";
import {
  getClassMemberById,
  getClassMemberByUserId,
  getClassMembers,
  postClassMember,
} from "./fetcher";
import { IRequestCreateClassMember } from "../../interfaces/class-members.interface";
import { toast } from "sonner";

export const useReadClassMembers = ({
  activeFilter,
}: {
  activeFilter: listFilter;
}) => {
  return useQuery({
    queryKey: ["read-class-members", activeFilter],
    queryFn: async () => await getClassMembers({ activeFilter }),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });
};

export const useReadClassMemberById = ({
  activeFilter,
  id,
}: {
  activeFilter: listFilter;
  id: string;
}) => {
  return useQuery({
    queryKey: ["read-class-member-by-id", activeFilter, id],
    queryFn: async () => await getClassMemberById({ activeFilter, id }),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    enabled: !!id,
  });
};

export const useReadClassMemberByUserId = ({
  activeFilter,
  userId,
}: {
  activeFilter: listFilter;
  userId: string;
}) => {
  return useQuery({
    queryKey: ["read-class-member-by-user-id", activeFilter, userId],
    queryFn: async () => await getClassMemberByUserId({ activeFilter, userId }),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    enabled: !!userId,
  });
};

export const useCreateClassMember = ({ refetch }: { refetch: () => void }) => {
  const mutations = useMutation({
    mutationFn: async (payload: IRequestCreateClassMember) =>
      postClassMember(payload),
    mutationKey: ["post-class-member"],
    onSuccess: () => {
      refetch();
      toast(`Create Class Successfull`);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      toast(err.response.data.message);
    },
  });

  return { mutations };
};
