import api from "@/shared/config/axios";
import { IRequestLogin } from "../../../interfaces/auth.interfaces";
import { ENDPOINT } from "../../endpoint";

export const postLogin = (payload: IRequestLogin) => {
  return api.post(`${ENDPOINT.login}`, payload);
};
