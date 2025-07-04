import { IUser } from "./users.interfaces";

export interface IRequestRegister {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: "student" | "teacher";
}

export interface IRequestLogin {
  email: string;
  password: string;
}

export interface IResponseLogin {
  user: IUser;
  access_token: string;
  token_type: "Bearer";
}

export type IResponseRegister = IResponseLogin;
