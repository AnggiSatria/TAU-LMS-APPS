import { IClass } from "./classes.interface";
import { IUser } from "./users.interfaces";

export interface IStudent {
  id: string;
  user_id: string;
  class_id: string;
  nim: string;
  created_at: string;
  updated_at: string;
  user: IUser;
  class: IClass;
}

export type IResponseStudentList = IStudent[];

export type IResponseStudentDetail = IStudent;

export interface IRequestCreateStudent {
  user_id: string;
  class_id?: string;
  nim: string;
}

export type IResponseCreateStudent = IStudent;

export interface IRequestUpdateStudent {
  user_id?: string;
  class_id?: string;
  nim?: string;
}

export type IResponseUpdateStudent = IStudent;

export type IResponseDeleteStudent = null;
