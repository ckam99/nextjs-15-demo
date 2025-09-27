// lib/api.ts
import { NextRequest, NextResponse } from 'next/server';

type FetchMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ApiFetchOptions {
  method?: FetchMethod;
  request?: NextRequest;
  body?: any;
  headers?: Record<string, string>;
}

export class ApiError extends Error {
  public status: number;
  public data: any;

  constructor(message: string, status: number, data: any) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

export async function FetchRequest<T>(
  path: string,
  { method = 'GET', request, body, headers = {} }: ApiFetchOptions = {}
) {
  let url = `${process.env.API_URL}${path}`;

  // Add query parameters from request.url if present
  if (request && request.url) {
    const originalUrl = new URL(request.url);
    const queryString = originalUrl.searchParams.toString();

    if (queryString) {
      // Append query string to backend URL
      const hasExistingParams = url.includes('?');
      url += hasExistingParams ? `&${queryString}` : `?${queryString}`;
    }
  }

  const fetchHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  };

  if (request) {
    const auth =  request.cookies.get("token")?.value || request.headers.get('authorization');
    if (auth) fetchHeaders['Authorization'] = auth;
  }

  const res = await fetch(url, {
    method,
    headers: fetchHeaders,
    body: body ? JSON.stringify(body) : undefined,
  });

  // Gestion centralisée du 204 No Content
  if (res.status === 204) {
    return { status: res.status, data: null };
  }

  // Vérifier si la réponse contient du JSON
  const contentType = res.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');

  // Parser JSON seulement si présent
  let data  = null;
  if (isJson) {
    // Pour éviter une erreur si le corps est vide (ex: 200 avec empty body)
    try {
      data = await res.json();
    } catch {
      data = null;
    }
  }

  // Gestion des erreurs HTTP
  if (!res.ok) {
    throw new ApiError(
      data?.message || `Erreur API ${res.status}`,
      res.status,
      data
    );
  }
  const result = data as T
  return { status: res.status, data: result };
}

export function HandleApiError(error: unknown) {
  if (error instanceof ApiError) {
    return NextResponse.json(
      { error: error.data || error.message },
      { status: error.status }
    );
  }
  return NextResponse.json(
    { error: 'Erreur serveur inconnue' },
    { status: 500 }
  );
}
