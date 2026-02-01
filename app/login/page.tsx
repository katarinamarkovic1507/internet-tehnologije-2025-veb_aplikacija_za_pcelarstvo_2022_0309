"use client";

import { Input } from "../components/Input";
import { Button } from "../components/Button";


import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error ?? "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/hives");
    } catch {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "grid",
        placeItems: "center",
        padding: 16,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          border: "1px solid #e5e5e5",
          borderRadius: 12,
          padding: 18,
        }}
      >
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16, textAlign: "center" }}>
          Login
        </h1>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
          <label style={{ display: "grid", gap: 6 }}>
            <span style={{ opacity: 0.8 }}>Email</span>
            <Input
              type="email"
              placeholder="test@test.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </label>

          <label style={{ display: "grid", gap: 6 }}>
            <span style={{ opacity: 0.8 }}>Lozinka</span>
            <Input
              type="password"
              placeholder="123456"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </label>

          {error && (
            <div style={{ padding: 10, borderRadius: 10, border: "1px solid #ffb3b3" }}>
              {error}
            </div>
          )}

          <Button type="submit" disabled={loading}>
            {loading ? "Logovanje..." : "Login"}
          </Button>

        </form>
      </div>
    </div>
  );
}
