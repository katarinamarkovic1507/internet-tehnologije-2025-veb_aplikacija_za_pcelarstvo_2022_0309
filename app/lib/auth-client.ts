export type StoredUser = { id: string; email: string; fullName?: string; role?: string };

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

export function getUser(): StoredUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("user");
  return raw ? (JSON.parse(raw) as StoredUser) : null;
}

export function logoutClient() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}
