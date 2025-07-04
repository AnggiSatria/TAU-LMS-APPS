export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: "student" | "teacher";
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface IRequestCreateUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: "student" | "teacher";
}

export interface IRequestUpdateUser {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  role?: "student" | "teacher";
}

export type IResponseUserList = IUser[];

export type IResponseUserDetail = IUser;

export interface IResponseLogout {
  message: string;
}
