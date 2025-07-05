import api from "@/shared/config/axios";
import { ENDPOINT } from "../endpoint";
import { IRequestCreateStudent } from "../../interfaces/students.interfaces";

export const postStudents = (payload: IRequestCreateStudent) => {
  return api.post(`${ENDPOINT.students}`, payload);
};
