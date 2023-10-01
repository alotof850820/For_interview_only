import axios from "axios";
import type { TodoResponseType, TodoType } from "./apiTodoListType";

const header = {
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
};

export const apiGetAlltodos = () =>
  axios.get<any, TodoResponseType>(
    `https://jsonplaceholder.typicode.com/todos`
  );

export const apiAddtodo = (data: TodoType) =>
  axios.post<any, TodoResponseType>(
    `https://jsonplaceholder.typicode.com/todos`,
    data,
    header
  );

export const apiUpdatetodo = (id: number, data: TodoType) =>
  axios.put<any, TodoResponseType>(
    `https://jsonplaceholder.typicode.com/todos/${id}`,
    data,
    header
  );
export const apiEdittodo = (id: number, data: TodoType) =>
  axios.patch<any, TodoResponseType>(
    `https://jsonplaceholder.typicode.com/todos/${id}`,
    data,
    header
  );

export const apiDeltodo = (id: number) =>
  axios.delete<any, any>(`https://jsonplaceholder.typicode.com/todos/${id}`);
