import { IClass } from "./classes.interface";

export interface ITask {
  id: string;
  name: string;
  description?: string | null;
  class_id: string;
  due_date?: string | null;
  created_at: string;
  updated_at: string;
  class: IClass;
}

export type IResponseTaskList = ITask[];

export type IResponseTaskDetail = ITask;

export interface IRequestCreateTask {
  name: string;
  description?: string;
  class_id: string;
  deadline?: string;
}

export type IResponseCreateTask = ITask;

export interface IRequestUpdateTask {
  name?: string;
  description?: string;
  class_id?: string;
  deadline?: string;
}

export type IResponseUpdateTask = ITask;

export type IResponseDeleteTask = null;
