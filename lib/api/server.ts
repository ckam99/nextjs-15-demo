import { cookies } from "next/headers";
import { ApiError, fetcher, FetcherMethod, FetchOptions } from "./utils";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";


async function withToken<T>(
  url: string,
   method?: FetcherMethod,
  options: FetchOptions = {}
): Promise<T> {
  const cookieStore = cookies();
  const token = (await cookieStore).get("auth_token")?.value;
  return fetcher<T>(url, method, options, process.env.API_URL, token);
}

export const api = {
  get: <T>(url: string, options: FetchOptions = {}): Promise<T> =>
    withToken<T>(url, "GET",  options),
  post: <T>(url: string, options: FetchOptions = {}): Promise<T> =>
    withToken<T>(url, "POST", options),
  put: <T>(url: string, options: FetchOptions = {}): Promise<T> =>
    withToken<T>(url, "PUT", options),
  patch: <T>(url: string, options: FetchOptions = {}): Promise<T> =>
    withToken<T>(url, "PATCH", options),
  delete: <T>(url: string, options: FetchOptions = {}): Promise<T> =>
    withToken<T>(url, "DELETE", options),
};

export const baseApi = {
  get: <T>(url: string, options: FetchOptions = {}): Promise<T> =>
    fetcher<T>(url, "GET", options, process.env.API_URL),
  post: <T>(url: string, options: FetchOptions = {}): Promise<T> =>
    fetcher<T>(url, "POST", options, process.env.API_URL),
  put: <T>(url: string, options: FetchOptions = {}): Promise<T> =>
    fetcher<T>(url, "PUT", options, process.env.API_URL),
  patch: <T>(url: string, options: FetchOptions = {}): Promise<T> =>
    fetcher<T>(url, "PATCH", options, process.env.API_URL),
  delete: <T>(url: string, options: FetchOptions = {}): Promise<T> =>
    fetcher<T>(url, "DELETE", options, process.env.API_URL),
};



export function HandleApiError(error: unknown) {
  console.log("API_ERROR", error);

  if (error instanceof ApiError) {
    return NextResponse.json(
      { error: error.data || error.message },
      { status: error.status }
    );
  }
  if (error instanceof Error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(
    { error: "Erreur serveur inconnue" },
    { status: 500 }
  );
}