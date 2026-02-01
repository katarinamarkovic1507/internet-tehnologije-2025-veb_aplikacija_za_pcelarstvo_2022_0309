"use client";

import { Card } from "./Card";

export function AuthShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "80vh", display: "grid", placeItems: "center", padding: 16 }}>
      <Card>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16, textAlign: "center" }}>
          {title}
        </h1>
        {children}
      </Card>
    </div>
  );
}
