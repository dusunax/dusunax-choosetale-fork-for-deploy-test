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
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const browserCookies = document.cookie;
      if (browserCookies) {
        config.headers.Cookie = browserCookies;
      }
    } else {
      const cookieStore = cookies();
      const allCookies = cookieStore.getAll();
      if (allCookies.length > 0) {
        config.headers.Cookie = allCookies
          .map((cookie) => `${cookie.name}=${cookie.value}`)
          .join("; ");
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api as CustomAxiosInstance;
