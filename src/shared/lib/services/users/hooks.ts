import { useQuery } from "@tanstack/react-query";
import { getUserById, getUserProfile, getUsers } from "./fetcher";
import { listFilter } from "../../interfaces/filter.interfaces";

export const useReadUsers = ({
  activeFilter,
}: {
  activeFilter: listFilter;
}) => {
  return useQuery({
    queryKey: ["read-users"],
    queryFn: async () => await getUsers({ activeFilter }),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });
};

export const useReadUserById = ({
  activeFilter,
  id,
}: {
  activeFilter: listFilter;
  id: string;
}) => {
  return useQuery({
    queryKey: ["read-user-by-id", id],
    queryFn: async () => await getUserById({ activeFilter, id }),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    enabled: !!id,
  });
};

export const useReadUserProfile = ({
  activeFilter,
}: {
  activeFilter: listFilter;
}) => {
  return useQuery({
    queryKey: ["read-user-profile"],
    queryFn: async () => await getUserProfile({ activeFilter }),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });
};
