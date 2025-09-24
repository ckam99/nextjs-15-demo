import { fetcher, FetchOptions } from "./utils";

const baseURL = "/api"

export const api = {
  get: <T>(url: string, options: FetchOptions = {}): Promise<T> =>
    fetcher<T>(url, "GET", options, baseURL),
  post: <T>(url: string, options: FetchOptions = {}): Promise<T> =>
    fetcher<T>(url, "POST", options, baseURL),
  put: <T>(url: string, options: FetchOptions = {}): Promise<T> =>
    fetcher<T>(url, "PUT", options, baseURL),
  patch: <T>(url: string, options: FetchOptions = {}): Promise<T> =>
    fetcher<T>(url, "PATCH", options, baseURL),
  delete: <T>(url: string, options: FetchOptions = {}): Promise<T> =>
    fetcher<T>(url, "DELETE", options, baseURL),
};
