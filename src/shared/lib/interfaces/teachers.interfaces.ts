import { IClass } from "./classes.interface";
import { IUser } from "./users.interfaces";

export interface ITeacher {
  id: string;
  user_id: string;
  class_id: string;
  nip: string;
  created_at: string;
  updated_at: string;
  user: IUser;
  class: IClass;
}

export type IResponseTeacherList = ITeacher[];

export type IResponseTeacherDetail = ITeacher;

export interface IRequestCreateTeacher {
  user_id: string;
  class_id?: string;
  nip: string;
}

export type IResponseCreateTeacher = ITeacher;

export interface IRequestUpdateTeacher {
  user_id?: string;
  class_id?: string;
  nip?: string;
}

export type IResponseUpdateTeacher = ITeacher;

export type IResponseDeleteTeacher = null;
