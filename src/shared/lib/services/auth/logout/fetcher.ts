import api from "@/shared/config/axios";
import { ENDPOINT } from "../../endpoint";
import Cookies from "js-cookie";

const token = Cookies.get("token");

export const postLogout = () => {
  return api.post(`${ENDPOINT.logout}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
