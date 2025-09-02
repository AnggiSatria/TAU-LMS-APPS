import api from "@/shared/config/axios";
import { listFilter } from "../../interfaces/filter.interfaces";
import { ENDPOINT } from "../endpoint";
import QueryString from "qs";
import { removeEmptyAttributes } from "@/shared/utils/removeEmptyAttributes";
import {
  IRequestCreateAssignment,
  IRequestUpdateAssignment,
} from "../../interfaces/assignments.interface";

export const getAssignments = ({
  activeFilter,
}: {
  activeFilter: listFilter;
}) => {
  const queryString = QueryString.parse(removeEmptyAttributes(activeFilter));
  return api.get(`${ENDPOINT.assignments}`, {
    params: { ...queryString },
  });
};

export const getAssignmentById = ({
  activeFilter,
  id,
}: {
  activeFilter: listFilter;
  id: string | null;
}) => {
  const queryString = QueryString.parse(removeEmptyAttributes(activeFilter));
  return api.get(`${ENDPOINT.assignments}/${id}`, {
    params: { ...queryString },
  });
};

export const getAssignmentByUserId = ({
  activeFilter,
  userId,
}: {
  activeFilter: listFilter;
  userId: string;
}) => {
  const queryString = QueryString.parse(removeEmptyAttributes(activeFilter));
  return api.get(`${ENDPOINT.assignments}/user/${userId}`, {
    params: { ...queryString },
  });
};

export const getAssignmentByTaskId = ({
  activeFilter,
  taskId,
}: {
  activeFilter: listFilter;
  taskId: string | null;
}) => {
  const queryString = QueryString.parse(removeEmptyAttributes(activeFilter));
  return api.get(`${ENDPOINT.assignments}/task/${taskId}`, {
    params: { ...queryString },
  });
};

export const getAssignmentByTaskAndUserId = ({
  activeFilter,
  taskId,
  userId,
}: {
  activeFilter: listFilter;
  taskId: string | null;
  userId: string;
}) => {
  const queryString = QueryString.parse(removeEmptyAttributes(activeFilter));
  if (!taskId || !userId) {
    return;
  }
  return api.get(`${ENDPOINT.assignments}/task/${taskId}/user/${userId}`, {
    params: { ...queryString },
  });
};

export const postAssignment = (payload: IRequestCreateAssignment) => {
  return api.post(`${ENDPOINT.assignments}`, payload);
};

export const patchAssignment = ({
  payload,
  id,
}: {
  payload: IRequestUpdateAssignment;
  id: string;
}) => {
  return api.patch(`${ENDPOINT.assignments}/${id}`, payload);
};

export const deleteAssignment = ({ id }: { id?: string }) => {
  return api.delete(`${ENDPOINT.assignments}/${id}`);
};
