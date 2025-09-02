import { ITask } from "./tasks.interfaces";
import { IUser } from "./users.interfaces";

export interface ITaskSubmission {
  id: string;
  task_id: string;
  user_id: string;
  answer_text?: string | null;
  answer_file?: string | null;
  answer_file_url?: string | null;
  submitted_at: string;
  score?: number | null;
  feedback?: string | null;
  created_at: string;
  updated_at: string;
  task?: ITask;
  user?: IUser;
}

export type IResponseTaskSubmissionList = ITaskSubmission[];

export type IResponseTaskSubmissionDetail = ITaskSubmission;

export type IResponseCreateTaskSubmission = ITaskSubmission;

export type IResponseUpdateTaskSubmission = ITaskSubmission;

export type IResponseDeleteTaskSubmission = {
  message: string;
};

export interface IRequestCreateTaskSubmission {
  task_id: string;
  user_id: string;
  answer_text?: string | null;
  answer_file?: File;
}

export interface IRequestUpdateTaskSubmission {
  score?: number | null;
  feedback?: string | null;
}
