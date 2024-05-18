import axios, { AxiosHeaders, InternalAxiosRequestConfig } from "axios";
import type { TodoResponseType, TodoType } from "./apiTodoListType";

const baseReq = axios.create();

baseReq.interceptors.request.use((res: InternalAxiosRequestConfig) => {
  res.baseURL = "https://jsonplaceholder.typicode.com"; // 可用環變
  res.headers = new AxiosHeaders({
    "Content-type": "application/json; charset=UTF-8",
  });
  res.headers.Authorization = "Bearer " + localStorage.getItem("token");
  return res;
});

baseReq.interceptors.response.use((response) => {
// success
  return response;
}, (error) => {
  // error
  if (error.response) {
    console.error('Response error:', error.response);
  } else if (error.request) {
    console.error('Request error:', error.request);
  } else {
    console.error('Error:', error.message);
  }
  return Promise.reject(error);
});

export const apiGetAlltodos = () =>
  baseReq.get<any, TodoResponseType>(`/todos`);

export const apiAddtodo = (data: TodoType) =>
  baseReq.post<any, TodoResponseType>(`/todos`,data);

export const apiUpdatetodo = (id: number, data: TodoType) =>
  baseReq.put<any, TodoResponseType>(`/todos/${id}`,data);

export const apiEdittodo = (id: number, data: TodoType) =>
  baseReq.patch<any, TodoResponseType>(`/todos/${id}`,data);

export const apiDeltodo = (id: number) =>
  baseReq.delete<any, any>(`/todos/${id}`);
