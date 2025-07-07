import QueryString from "qs";
import { listFilter } from "../../interfaces/filter.interfaces";
import { removeEmptyAttributes } from "@/shared/utils/removeEmptyAttributes";
import { ENDPOINT } from "../endpoint";
import api from "@/shared/config/axios";
import { IRequestCreateClassMember } from "../../interfaces/class-members.interface";

export const getClassMembers = ({
  activeFilter,
}: {
  activeFilter: listFilter;
}) => {
  const queryString = QueryString.parse(removeEmptyAttributes(activeFilter));
  return api.get(ENDPOINT.classMembers, { params: { ...queryString } });
};

export const getClassMemberById = ({
  activeFilter,
  id,
}: {
  activeFilter: listFilter;
  id: string;
}) => {
  const queryString = QueryString.parse(removeEmptyAttributes(activeFilter));
  return api.get(`${ENDPOINT.classMembers}/${id}`, {
    params: { ...queryString },
  });
};

export const getClassMemberByUserId = ({
  activeFilter,
  userId,
}: {
  activeFilter: listFilter;
  userId: string;
}) => {
  const queryString = QueryString.parse(removeEmptyAttributes(activeFilter));
  return api.get(`${ENDPOINT.classMembers}/user/${userId}`, {
    params: { ...queryString },
  });
};

export const postClassMember = (payload: IRequestCreateClassMember) => {
  return api.post(`${ENDPOINT.classMembers}`, payload);
};
