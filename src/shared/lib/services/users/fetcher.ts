import api from "@/shared/config/axios";
import QueryString from "qs";
import { ENDPOINT } from "../endpoint";
import { listFilter } from "../../interfaces/filter.interfaces";
import { removeEmptyAttributes } from "@/shared/utils/removeEmptyAttributes";

export const getUsers = (activeFilter: listFilter) => {
  const queryString = QueryString.parse(removeEmptyAttributes(activeFilter));
  return api.get(ENDPOINT.login, { params: { ...queryString } });
};

export const getUserById = ({
  activeFilter,
  id,
}: {
  activeFilter: listFilter;
  id: string;
}) => {
  const queryString = QueryString.parse(removeEmptyAttributes(activeFilter));
  return api.get(`${ENDPOINT.login}/${id}`, { params: { ...queryString } });
};
