import axios, { InternalAxiosRequestConfig } from "axios";
import { API_URL } from "@/config/config";
import { requestInterceptor } from "../interceptors/request";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) =>
  requestInterceptor(config)
);

export default api;
