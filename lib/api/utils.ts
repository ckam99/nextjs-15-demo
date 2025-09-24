import { routes } from "../routes";

export type ResponseResult<T> = {
  total: number;
  result: T;
};


export type FetcherMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTION";

export type FetchOptions = RequestInit & {
  body?: any;
  params?: Record<string, any>;
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

export async function fetcher<T = any>(
  url: string,
  method?: FetcherMethod,
  options: FetchOptions = {},
  baseURL?: string,
  token?: string
): Promise<T> {
  const { body, headers, params, ...rest } = options;

  const finalHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...(headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  console.log("baseURL", baseURL);

  let fullUrl = baseURL || "";
  if (!url.startsWith("/")) fullUrl += "/";
  fullUrl = `${fullUrl}${url}`;

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

  console.log("full url", fullUrl);

  const response = await fetch(fullUrl, {
    headers: finalHeaders,
    method: method,
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
    ...rest,
  });

  let responseData: any = null;

  const isJson = response.headers
    .get("content-type")
    ?.includes("application/json");

  if (response.status !== 204 && isJson) {
    try {
      responseData = await response.json();
    } catch (err) {
      responseData = null;
    }
  }

  if (!response.ok) {
    if (typeof window !== "undefined" && response.status === 401) {
      window.location.href = routes.login;
    }
    const message = responseData?.message || "Erreur API inconnue";
    throw new ApiError(message, response.status, responseData);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return responseData as T;
}
