import QueryString from "qs";
import { listFilter } from "../../interfaces/filter.interfaces";
import { removeEmptyAttributes } from "@/shared/utils/removeEmptyAttributes";
import { ENDPOINT } from "../endpoint";
import api from "@/shared/config/axios";
import { IRequestCreateClass } from "../../interfaces/classes.interface";

export const getClasses = ({ activeFilter }: { activeFilter: listFilter }) => {
  const queryString = QueryString.parse(removeEmptyAttributes(activeFilter));
  return api.get(ENDPOINT.classes, { params: { ...queryString } });
};

export const postClasses = (payload: IRequestCreateClass) => {
  return api.post(`${ENDPOINT.classes}`, payload);
};
