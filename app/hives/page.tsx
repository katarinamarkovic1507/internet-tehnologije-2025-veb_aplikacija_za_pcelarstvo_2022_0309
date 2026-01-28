"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Hive = {
  id: number;
  name: string;
  location?: string | null;
  status?: string | null;
};

export default function HivesPage() {
  const router = useRouter();
  const [hives, setHives] = useState<Hive[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    async function loadHives() {
      try {
        const res = await fetch("/api/hives");
        const data = await res.json();
        setHives(data?.hives ?? []);
      } catch {
        setError("Greška pri učitavanju košnica.");
      } finally {
        setLoading(false);
      }
    }

    loadHives();
  }, [router]);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  }

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: 30, fontWeight: 800 }}>Košnice</h1>
        <button
          onClick={logout}
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid #cfcfcf",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Logout
        </button>
      </div>

      {loading && <p style={{ marginTop: 16 }}>Učitavanje...</p>}
      {error && <p style={{ marginTop: 16, color: "red" }}>{error}</p>}

      {!loading && !error && (
        <div style={{ display: "grid", gap: 14, marginTop: 20 }}>
          {hives.map((h) => (
            <div
              key={h.id}
              style={{
                border: "1px solid #e5e5e5",
                borderRadius: 14,
                padding: 16,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong style={{ fontSize: 18 }}>{h.name}</strong>
                <span style={{ opacity: 0.7 }}>ID: {h.id}</span>
              </div>
              <div style={{ marginTop: 6 }}>Lokacija: {h.location ?? "-"}</div>
              <div>Status: {h.status ?? "-"}</div>
            </div>
          ))}

          {hives.length === 0 && (
            <div
              style={{
                border: "1px dashed #cfcfcf",
                borderRadius: 14,
                padding: 16,
              }}
            >
              Nema košnica u bazi.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
