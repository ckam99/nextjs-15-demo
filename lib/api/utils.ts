import { routes } from "../routes/routes";

export type ResponseResult<T> = {
  total: number;
  result: T;
};

export type FetcherMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "OPTION";


export type FetchOptions<B = BodyInit | object> = {
  body?: B;
  params?: Record<string, any>;
  headers?: HeadersInit;
};

export class ApiError extends Error {
  public status: number;
  public data?: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.status = status;
    this.data = data;
  }
}


export async function fetcher<R = any, B = BodyInit | object>(
  url: string,
  method: FetcherMethod = "GET",
  options: FetchOptions<B> = {},
  baseURL?: string,
  token?: string
): Promise<R> {
  const { body, headers, params, ...rest } = options;

const customHeaders: Record<string, string> = {
  ...normalizeHeaders(headers),
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
};

if (body && !(body instanceof FormData) && typeof body !== "string") {
  customHeaders["Content-Type"] = "application/json";
}

const finalHeaders: HeadersInit = customHeaders;

  // Construction de l'URL finale
  let fullUrl = baseURL || "";
  if (!url.startsWith("/")) fullUrl += "/";
  fullUrl += url;

  if (params && Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams();
    for (const key in params) {
      const value = params[key];
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    }
    const separator = fullUrl.includes("?") ? "&" : "?";
    fullUrl += `${separator}${searchParams.toString()}`;
  }

  // Logging (dev only)
  if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
    console.log("[fetcher] URL:", fullUrl);
    console.log("[fetcher] Method:", method);
    console.log("[fetcher] Headers:", finalHeaders);
    if (params) console.log("[fetcher] Params:", params);
  }

  const response = await fetch(fullUrl, {
    headers: finalHeaders,
    method,
    body:
      body && !(body instanceof FormData) && typeof body !== "string"
        ? JSON.stringify(body)
        : (body as BodyInit | undefined),
    credentials: "include",
    ...rest,
  });

  const contentType = response.headers.get("content-type");
  const isJson = contentType?.includes("application/json");
  let responseData: any = null;

  if (response.status !== 204) {
    try {
      responseData = isJson ? await response.json() : await response.text();
    } catch (err) {
      responseData = null;
    }
  }

  if (!response.ok) {
    if (typeof window !== "undefined" && response.status === 401) {
      const currentUrl = window.location.pathname + window.location.search;
      const loginUrl = `${routes.login}?redirect=${encodeURIComponent(
        currentUrl
      )}`;
      window.location.href = loginUrl;
    }

    if (process.env.NODE_ENV !== "production") {
      console.error("[fetcher] API Error:", response.status, responseData);
    }

    const message = responseData?.message || "Erreur API inconnue";
    throw new ApiError(message, response.status, responseData);
  }

  if (response.status === 204) {
    return {} as R;
  }

  return responseData as R;
}

function normalizeHeaders(headers?: HeadersInit): Record<string, string> {
  if (!headers) return {};

  if (headers instanceof Headers) {
    const result: Record<string, string> = {};
    headers.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }

  if (Array.isArray(headers)) {
    return Object.fromEntries(headers);
  }

  return headers as Record<string, string>;
}

