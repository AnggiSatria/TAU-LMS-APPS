import { IClass } from "./classes.interface";
import { IUser } from "./users.interfaces";

export interface IClassMember {
  id: string;
  user_id: string;
  class_id: string;
  role: "student" | "teacher";
  created_at: string;
  updated_at: string;
  user: IUser;
  class: IClass;
}

export type IResponseClassMemberList = IClassMember[];

export type IResponseClassMemberDetail = IClassMember;

export interface IRequestCreateClassMember {
  user_id: string;
  class_id: string;
  role: "student" | "teacher";
}

export type IResponseCreateClassMember = IClassMember;

export interface IRequestUpdateClassMember {
  user_id?: string;
  class_id?: string;
  role?: "student" | "teacher";
}

export type IResponseUpdateClassMember = IClassMember;

export type IResponseDeleteClassMember = null;
