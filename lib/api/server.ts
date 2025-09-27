import { redirect } from "next/navigation";
import { ApiError, FetchOptions } from "./utils";
import { NextRequest, NextResponse } from "next/server";

interface ApiFetchOptions<T, K> extends FetchOptions<K> {
  request?: NextRequest;
}

export async function safeFetch<T, K = any>(
  path: string,
  { method = "GET", request, body, headers = {} }: ApiFetchOptions<T, K> = {}
) {
  let url = process.env.API_URL || "";
  if (!path.startsWith("/")) url += "/";
  url += path;


  if (request && request.url) {
    const originalUrl = new URL(request.url);
    const queryString = originalUrl.searchParams.toString();

    if (queryString) {
      const hasExistingParams = url.includes("?");
      url += hasExistingParams ? `&${queryString}` : `?${queryString}`;
    }
  }

  console.log("=== ENDPOINT URL ===", url);
  

  const fetchHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  };

  if (request) {
    const token = request.cookies.get("token")?.value;
    //|| request.headers.get('authorization');
    if (token) fetchHeaders["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    method,
    headers: fetchHeaders,
    body: body ? JSON.stringify(body) : undefined,
  });

  let data: any = {};

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

export function HandleApiError(error: any, request?: NextRequest) {
  if (error instanceof ApiError) {
    // if(error.status === 401){
    //   redirect("/auth/sign-in");
    // //   return NextResponse.redirect(new URL("/auth/sign-in", request?.url));
    //    // return NextResponse.redirect("/auth/sign-in");
    // }
    return NextResponse.json(
      { code: error.code, message: error.message || "Erreur inconnue" },
      { status: error.status }
    );
  }
  return NextResponse.json(
    { code: "ERR__INTERNAL", message: error.message || "Erreur inconnue" },
    { status: 500 }
  );
}
