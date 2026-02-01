"use client";

import { getToken } from "./auth-client";

type ApiError = { error?: string };

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getToken();

  const res = await fetch(path, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init.headers ?? {}),
    },
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new Error((data as ApiError)?.error ?? "Request failed");
  }

  return data as T;
}
