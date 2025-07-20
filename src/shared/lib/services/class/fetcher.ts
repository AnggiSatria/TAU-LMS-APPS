import QueryString from "qs";
import { listFilter } from "../../interfaces/filter.interfaces";
import { removeEmptyAttributes } from "@/shared/utils/removeEmptyAttributes";
import { ENDPOINT } from "../endpoint";
import api from "@/shared/config/axios";
import {
  IRequestCreateClass,
  IRequestUpdateClass,
} from "../../interfaces/classes.interface";

export const getClasses = ({ activeFilter }: { activeFilter: listFilter }) => {
  const queryString = QueryString.parse(removeEmptyAttributes(activeFilter));
  return api.get(ENDPOINT.classes, { params: { ...queryString } });
};

export const getClassesByID = ({
  activeFilter,
  id,
}: {
  activeFilter: listFilter;
  id?: string;
}) => {
  const queryString = QueryString.parse(removeEmptyAttributes(activeFilter));
  return api.get(`${ENDPOINT.classes}/${id}`, { params: { ...queryString } });
};

export const postClasses = (payload: IRequestCreateClass) => {
  return api.post(`${ENDPOINT.classes}`, payload);
};

export const patchClasses = ({
  payload,
  id,
}: {
  payload: IRequestUpdateClass;
  id: string | undefined;
}) => {
  return api.patch(`${ENDPOINT.classes}/${id}`, payload);
};

export const deletedClasses = ({ id }: { id?: string }) => {
  return api.delete(`${ENDPOINT.classes}/${id}`);
};
