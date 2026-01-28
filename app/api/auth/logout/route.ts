import { NextResponse } from "next/server";

// POST /api/auth/logout
// Kod JWT auth-a logout je uglavnom "obriši token na klijentu".
// Ova ruta postoji da ispuni zahtev zadatka i vraća JSON odgovor.
export async function POST() {
  return NextResponse.json({ ok: true, message: "Logged out" });
}
