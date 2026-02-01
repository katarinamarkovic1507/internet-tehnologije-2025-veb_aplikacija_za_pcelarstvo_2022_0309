"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { AuthShell } from "../components/AuthShell";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password, role: "BEEKEEPER" }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "Register failed");
        return;
      }

      router.push("/login");
    } catch {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell title="Register">
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ opacity: 0.8 }}>Ime i prezime</span>
          <Input value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ opacity: 0.8 }}>Email</span>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ opacity: 0.8 }}>Lozinka</span>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>

        {error && (
          <div style={{ padding: 10, borderRadius: 10, border: "1px solid #ffb3b3" }}>
            {error}
          </div>
        )}

        <Button type="submit" disabled={loading}>
          {loading ? "Kreiram..." : "Kreiraj nalog"}
        </Button>
      </form>
    </AuthShell>
  );
}
