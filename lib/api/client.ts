import { fetcher, FetchOptions } from "./utils";

const baseURL = "/api"


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


// La fonction safeFetch côté client (simplifiée, sans token)
export async function safeFetch<T>(url: string, options: RequestInit = {}) {
  const res = await fetch(url, options);

  if (res.status === 204 || res.headers.get("content-length") === "0") {
    if (!res.ok) throw new Error(`Erreur ${res.status} : pas de contenu`);
    return null;
  }

  const contentType = res.headers.get("content-type") || "";

  let data: any = null;

  if (contentType.includes("application/json")) {
    try {
      data = await res.json();
    } catch {
      data = null;
    }
  } else {
    data = await res.text();
  }

  if (!res.ok) {
    const errorMsg =
      (data && typeof data === "object" && data.message) ||
      `Erreur HTTP ${res.status}`;
    throw new Error(errorMsg);
  }

  return data as T;
}