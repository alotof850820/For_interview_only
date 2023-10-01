export interface TodoType {
  id?: number;
  title: string;
  completed: boolean;
  userId: number;
}

export interface ReponseType {
  config: any;
  data: TodoType[];
  headers: any;
  request: any;
  status: number;
  statusText: string;
}

export type AllTodoArrayType = TodoType[];

export interface TodoResponseType extends ReponseType {
  data: AllTodoArrayType;
}
