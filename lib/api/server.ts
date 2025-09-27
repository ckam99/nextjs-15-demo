
import { cookies } from "next/headers";
import { ApiError, fetcher, FetcherMethod, FetchOptions } from "./utils";
import { NextResponse } from "next/server";


async function withToken<R, B = any>(
  url: string,
  method?: FetcherMethod,
  options: FetchOptions<B> = {}
): Promise<R> {
  const cookie = await cookies();
  const token = cookie.get("token")?.value;
  console.log("API TOKEN SESSION", token?.substring(0, 10) + "...");
  
  return fetcher<R, B>(url, method, options, process.env.API_URL, token);
}

// API avec token
export const api = {
  get: <R>(url: string, options: FetchOptions = {}) =>
    withToken<R>(url, "GET", options),
  post: <R, B = any>(url: string, options: FetchOptions<B> = {}) =>
    withToken<R, B>(url, "POST", options),
  put: <R, B = any>(url: string, options: FetchOptions<B> = {}) =>
    withToken<R, B>(url, "PUT", options),
  patch: <R, B = any>(url: string, options: FetchOptions<B> = {}) =>
    withToken<R, B>(url, "PATCH", options),
  delete: <R>(url: string, options: FetchOptions = {}) =>
    withToken<R>(url, "DELETE", options),
};



export async function HandleApiError(error: unknown) {
  console.error("API_ERROR", error);

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