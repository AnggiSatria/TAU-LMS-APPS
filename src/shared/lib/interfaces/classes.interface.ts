export interface IClass {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export type IResponseClassList = IClass[];

export type IResponseClassDetail = IClass;

export interface IRequestCreateClass {
  name: string;
}

export type IResponseCreateClass = IClass;

export interface IRequestUpdateClass {
  name?: string;
}

export type IResponseUpdateClass = IClass;

export type IResponseDeleteClass = null;
