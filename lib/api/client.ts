import { routes } from "../routes/routes";
import { ApiError, FetchOptions } from "./utils";

export async function safeFetch<T, K = any>(
  path: string,
  { method = "GET", body, headers = {}, params }: FetchOptions<K> = {}
) {
  let url = "/api";
  if (!path.startsWith("/")) url += "/";
  url += path;

  if (params && Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams();
    for (const key in params) {
      const value = params[key];
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    }
    const separator = url.includes("?") ? "&" : "?";
    url += `${separator}${searchParams.toString()}`;
  }

  const fetchHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  };

  const res = await fetch(url, {
    method,
    headers: fetchHeaders,
    body: body ? JSON.stringify(body) : undefined,
  });

  let data : any;

  if (res.status === 204 || res.headers.get("content-length") === "0") {
    if (!res.ok) {
      throw new Error(`Erreur ${res.status} : pas de contenu`);
    }
  } else {



    const contentType = res.headers.get("content-type") || "";

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

      if (typeof window !== "undefined" && res.status === 401) {
        const currentUrl =
          window.location.pathname + window.location.search;
        const loginUrl = `${routes.login}?redirect=${encodeURIComponent(
          currentUrl
        )}`;
        window.location.href = loginUrl;
      }

      const defaultErrMsg = `Erreur HTTP ${res.status}`;
      if (data && typeof data === "object" && data.message) {
        throw new ApiError(
          data?.message || defaultErrMsg,
          res.status,
          data?.code || "ERR__INTERNAL",
          data?.data
        );
      }
      throw new Error(defaultErrMsg);
    }
  }
  const result = data as T;
  return result;
}
