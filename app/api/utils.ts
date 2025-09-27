// lib/api.ts
import { ApiError } from "@/lib/api/utils";
import { NextRequest, NextResponse } from "next/server";

type FetchMethod = "GET" | "POST" | "PUT" | "DELETE";

interface ApiFetchOptions {
  method?: FetchMethod;
  request?: NextRequest;
  body?: any;
  headers?: Record<string, string>;
}

export async function FetchRequest<T>(
  path: string,
  { method = "GET", request, body, headers = {} }: ApiFetchOptions = {}
) {
  let url = `${process.env.API_URL}${path}`;

  // Add query parameters from request.url if present
  if (request && request.url) {
    const originalUrl = new URL(request.url);
    const queryString = originalUrl.searchParams.toString();

    if (queryString) {
      // Append query string to backend URL
      const hasExistingParams = url.includes("?");
      url += hasExistingParams ? `&${queryString}` : `?${queryString}`;
    }
  }

  const fetchHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  };

  if (request) {
    console.log(
      "===FETCHREQUEST COOKIES===",
      request.cookies.get("token")?.value
    );

    const token = request.cookies.get("token")?.value;
    //|| request.headers.get('authorization');
    if (token) fetchHeaders["Authorization"] = `Bearer ${token}`;
  }

  console.log("===FETCHREQUEST HEADERS===", fetchHeaders);

  const res = await fetch(url, {
    method,
    headers: fetchHeaders,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 204 || res.headers.get("content-length") === "0") {
    if (!res.ok) {
      throw new Error(`Erreur ${res.status} : pas de contenu`);
    }
    return null;
  }

  const contentType = res.headers.get("content-type") || "";

  let data: any;
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
    console.log("===FETCHREQUEST===", data);
    const defaultErrMsg =`Erreur HTTP ${res.status}`;
    if (data && typeof data === "object" && data.message) {
        throw new ApiError(
          data?.message || defaultErrMsg,
          res.status,
          data?.code || 'ERR__INTERNAL',
          data?.data
        );
    }
    throw new Error(defaultErrMsg);
  }
  const result = data as T;
  return result;
}

export function HandleApiError(error: any) {
  console.error("=== Erreur proxy===", error);
  if (error instanceof ApiError) {
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
