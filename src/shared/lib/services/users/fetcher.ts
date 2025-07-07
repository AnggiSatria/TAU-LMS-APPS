import api from "@/shared/config/axios";
import QueryString from "qs";
import { ENDPOINT } from "../endpoint";
import { listFilter } from "../../interfaces/filter.interfaces";
import { removeEmptyAttributes } from "@/shared/utils/removeEmptyAttributes";

export const getUsers = ({ activeFilter }: { activeFilter: listFilter }) => {
  const queryString = QueryString.parse(removeEmptyAttributes(activeFilter));
  return api.get(ENDPOINT.users, { params: { ...queryString } });
};

export const getUserById = ({
  activeFilter,
  id,
}: {
  activeFilter: listFilter;
  id: string;
}) => {
  const queryString = QueryString.parse(removeEmptyAttributes(activeFilter));
  return api.get(`${ENDPOINT.users}/${id}`, { params: { ...queryString } });
};

export const getUserProfile = ({
  activeFilter,
}: {
  activeFilter: listFilter;
}) => {
  const queryString = QueryString.parse(removeEmptyAttributes(activeFilter));
  return api.get(ENDPOINT.profile, { params: { ...queryString } });
};
