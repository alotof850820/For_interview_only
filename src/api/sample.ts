import axios, { InternalAxiosRequestConfig, AxiosHeaders } from "axios";
import { TodoType, TodoResponseType } from "./sample.d";

const baseReq = axios.create({
  // 判斷執行環境若是 production 則使用 config 設定的 url，若是開發環境使用 proxy
  // baseURL: process.env.NODE_ENV === 'production' ? window.__env.url.BASE_HOST : '/baseProxy',
  // baseURL: 'http://XXX.XXX.X.XX:XXXX/',
});

baseReq.interceptors.request.use((res: InternalAxiosRequestConfig) => {
  res.baseURL = "https://jsonplaceholder.typicode.com";
  res.headers = new AxiosHeaders({
    "Content-Type": "application/json",
  });
  res.headers.Authorization = "Bearer " + localStorage.getItem("token");
  return res;
});

export const apiGetAlltodos = () =>
  baseReq.get<any, TodoResponseType>(`/todos`);

export const apiPostData = (data: TodoType) =>
  baseReq.post<any, TodoResponseType>(`/todos`, data);

export const apiPutData = (id: number, data: TodoType) =>
  baseReq.put<any, TodoResponseType>(`/todos/${id}`, data);

export const apiDeleteData = (id: number) =>
  baseReq.delete<any, any>(`/todos/${id}`);
