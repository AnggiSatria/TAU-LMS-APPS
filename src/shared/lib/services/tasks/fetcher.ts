import api from "@/shared/config/axios";
import { listFilter } from "../../interfaces/filter.interfaces";
import { ENDPOINT } from "../endpoint";
import QueryString from "qs";
import { removeEmptyAttributes } from "@/shared/utils/removeEmptyAttributes";
import {
  IRequestCreateTask,
  IRequestUpdateTask,
} from "../../interfaces/tasks.interfaces";

export const getTasks = ({ activeFilter }: { activeFilter: listFilter }) => {
  const queryString = QueryString.parse(removeEmptyAttributes(activeFilter));
  return api.get(`${ENDPOINT.tasks}`, {
    params: { ...queryString },
  });
};

export const getTaskById = ({
  activeFilter,
  id,
}: {
  activeFilter: listFilter;
  id: string;
}) => {
  const queryString = QueryString.parse(removeEmptyAttributes(activeFilter));
  return api.get(`${ENDPOINT.tasks}/${id}`, {
    params: { ...queryString },
  });
};

export const getTaskByUserId = ({
  activeFilter,
  userId,
}: {
  activeFilter: listFilter;
  userId: string;
}) => {
  const queryString = QueryString.parse(removeEmptyAttributes(activeFilter));
  return api.get(`${ENDPOINT.tasks}/user/${userId}`, {
    params: { ...queryString },
  });
};

export const getTaskByClassId = ({
  activeFilter,
  classId,
}: {
  activeFilter: listFilter;
  classId: string;
}) => {
  const queryString = QueryString.parse(removeEmptyAttributes(activeFilter));
  return api.get(`${ENDPOINT.tasks}/class/${classId}`, {
    params: { ...queryString },
  });
};

export const getTaskByClassAndUserId = ({
  activeFilter,
  classId,
  userId,
}: {
  activeFilter: listFilter;
  classId: string;
  userId: string;
}) => {
  const queryString = QueryString.parse(removeEmptyAttributes(activeFilter));
  return api.get(`${ENDPOINT.tasks}/class/${classId}/user/${userId}`, {
    params: { ...queryString },
  });
};

export const postTask = (payload: IRequestCreateTask) => {
  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("description", payload.description!);
  formData.append("class_id", payload.class_id);
  formData.append("due_date", payload.due_date!);
  if (payload.media) formData.append("media", payload.media);

  return api.post(`${ENDPOINT.tasks}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const patchTask = ({
  payload,
  id,
}: {
  payload: IRequestUpdateTask;
  id: string;
}) => {
  return api.patch(`${ENDPOINT.tasks}/${id}`, payload);
};

export const deleteTask = (id?: string) => {
  return api.delete(`${ENDPOINT.tasks}/${id}`);
};
