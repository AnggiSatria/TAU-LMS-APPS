import { ITask } from "./tasks.interfaces";
import { IUser } from "./users.interfaces";

export interface IAssignment {
  id: string;
  user_id: string;
  task_id: string;
  score: number | null;
  submitted_at: string | null;
  created_at: string;
  updated_at: string;
  user: IUser;
  task: ITask;
}

export type IResponseAssignmentList = IAssignment[];

export type IResponseAssignmentDetail = IAssignment;

export interface IRequestCreateAssignment {
  user_id: string;
  task_id: string;
  score?: number;
  submitted_at?: string;
}

export type IResponseCreateAssignment = IAssignment;

export interface IRequestUpdateAssignment {
  user_id?: string;
  task_id?: string;
  score?: number;
  submitted_at?: string; // ISO format string
}

export type IResponseUpdateAssignment = IAssignment;

export type IResponseDeleteAssignment = null;
