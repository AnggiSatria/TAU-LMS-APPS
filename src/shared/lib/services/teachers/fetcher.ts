import api from "@/shared/config/axios";
import { ENDPOINT } from "../endpoint";
import { IRequestCreateTeacher } from "../../interfaces/teachers.interfaces";

export const postTeachers = (payload: IRequestCreateTeacher) => {
  return api.post(`${ENDPOINT.teachers}`, payload);
};
