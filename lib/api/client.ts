import { fetcher, FetchOptions } from "./utils";

const baseURL = "/api"

// export const api = {
//   get: <T>(url: string, options: FetchOptions = {}): Promise<T> =>
//     fetcher<T>(url, "GET", options, baseURL),
//   post: <T>(url: string, options: FetchOptions = {}): Promise<T> =>
//     fetcher<T>(url, "POST", options, baseURL),
//   put: <T>(url: string, options: FetchOptions = {}): Promise<T> =>
//     fetcher<T>(url, "PUT", options, baseURL),
//   patch: <T>(url: string, options: FetchOptions = {}): Promise<T> =>
//     fetcher<T>(url, "PATCH", options, baseURL),
//   delete: <T>(url: string, options: FetchOptions = {}): Promise<T> =>
//     fetcher<T>(url, "DELETE", options, baseURL),
// };

export const api = {
  get: <T>(url: string, options: FetchOptions = {}): Promise<T> =>
    fetcher<T>(url, "GET", options, baseURL),
  post: <T, B = any>(url: string, options: FetchOptions<B> = {}): Promise<T> =>
    fetcher<T, B>(url, "POST", options, baseURL),
  put: <T, K = any>(url: string, options: FetchOptions<K> = {}): Promise<T> =>
    fetcher<T, K>(url, "PUT", options, baseURL),
  patch: <T, K = any>(url: string, options: FetchOptions<K> = {}): Promise<T> =>
    fetcher<T, K>(url, "PATCH", options, baseURL),
  delete: <T>(url: string, options: FetchOptions = {}): Promise<T> =>
    fetcher<T>(url, "DELETE", options, baseURL),
};


