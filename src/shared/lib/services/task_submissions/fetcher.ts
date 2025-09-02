import QueryString from "qs";
import { listFilter } from "../../interfaces/filter.interfaces";
import { removeEmptyAttributes } from "@/shared/utils/removeEmptyAttributes";
import { ENDPOINT } from "../endpoint";
import api from "@/shared/config/axios";
import {
  IRequestCreateTaskSubmission,
  IRequestUpdateTaskSubmission,
} from "../../interfaces/task-submissions.interface";

export const getTaskSubmissions = ({
  activeFilter,
}: {
  activeFilter: listFilter;
}) => {
  const queryString = QueryString.parse(removeEmptyAttributes(activeFilter));
  return api.get(ENDPOINT.taskSubmissions, { params: { ...queryString } });
};

export const getTaskSubmissionByID = ({
  activeFilter,
  id,
}: {
  activeFilter: listFilter;
  id?: string;
}) => {
  const queryString = QueryString.parse(removeEmptyAttributes(activeFilter));
  return api.get(`${ENDPOINT.taskSubmissions}/${id}`, {
    params: { ...queryString },
  });
};

export const getTaskSubmissionByTaskId = ({
  activeFilter,
  taskId,
}: {
  activeFilter: listFilter;
  taskId: string | null;
}) => {
  const queryString = QueryString.parse(removeEmptyAttributes(activeFilter));
  if (taskId === null) {
    return;
  }
  return api.get(`${ENDPOINT.taskSubmissions}/task/${taskId}`, {
    params: { ...queryString },
  });
};

export const getTaskSubmissionByClassId = ({
  activeFilter,
  classId,
}: {
  activeFilter: listFilter;
  classId?: string;
}) => {
  const queryString = QueryString.parse(removeEmptyAttributes(activeFilter));
  return api.get(`${ENDPOINT.taskSubmissions}/class/${classId}`, {
    params: { ...queryString },
  });
};

export const getTaskSubmissionByUserId = ({
  activeFilter,
  userId,
}: {
  activeFilter: listFilter;
  userId?: string;
}) => {
  const queryString = QueryString.parse(removeEmptyAttributes(activeFilter));
  return api.get(`${ENDPOINT.taskSubmissions}/user/${userId}`, {
    params: { ...queryString },
  });
};

export const postTaskSubmission = (payload: IRequestCreateTaskSubmission) => {
  const formData = new FormData();
  formData.append("task_id", payload.task_id!);
  formData.append("user_id", payload.user_id!);
  formData.append("answer_text", payload.answer_text!);
  if (payload.answer_file) formData.append("answer_file", payload.answer_file);

  return api.post(`${ENDPOINT.taskSubmissions}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const patchTaskSubmission = ({
  payload,
  id,
}: {
  payload: IRequestUpdateTaskSubmission;
  id: string | undefined;
}) => {
  return api.patch(`${ENDPOINT.taskSubmissions}/${id}`, payload);
};

export const deletedTaskSubmission = ({ id }: { id?: string }) => {
  return api.delete(`${ENDPOINT.taskSubmissions}/${id}`);
};
