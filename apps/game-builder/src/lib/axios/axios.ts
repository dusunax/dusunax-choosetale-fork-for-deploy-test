"use server";
import { cookies } from "next/headers";
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { API_URL } from "@/config/config";

interface NextOptions {
  tags?: string[];
}

interface CustomAxiosInstance extends AxiosInstance {
  get: <T = unknown, R = AxiosResponse<T>, D = unknown>(
    url: string,
    config?: AxiosRequestConfig<D> & { next?: NextOptions }
  ) => Promise<R>;
}

const api = axios.create({
  baseURL: API_URL,
});

// 헤더에 쿠키를 넣어 보내기!
api.interceptors.request.use((config) => {
  const connectSid = cookies().get("connect.sid")?.value;
  if (connectSid) {
    config.headers.Cookie = `connect.sid=${connectSid}`;
  }
  return config;
});

export default api as CustomAxiosInstance;
