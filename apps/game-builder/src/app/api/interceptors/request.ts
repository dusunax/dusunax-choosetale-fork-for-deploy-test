import { InternalAxiosRequestConfig } from "axios";
import initRequestHeader from "../axios/initRequestHeader";

export const requestInterceptor = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const headers = initRequestHeader();
  config.headers.set(headers);
  return config;
};
