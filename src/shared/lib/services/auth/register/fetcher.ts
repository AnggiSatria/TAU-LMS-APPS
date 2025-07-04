import api from "@/shared/config/axios";
import { IRequestRegister } from "../../../interfaces/auth.interfaces";
import { ENDPOINT } from "../../endpoint";

export const postRegister = (payload: IRequestRegister) => {
  return api.post(`${ENDPOINT.login}`, payload);
};
