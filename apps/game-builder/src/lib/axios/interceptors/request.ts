import initRequestHeader from "@/lib/axios/initRequestHeader";
import { type InternalAxiosRequestConfig } from "axios";

export const requestInterceptor = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const headers = initRequestHeader();
  config.headers.set(headers);
  return config;
};
