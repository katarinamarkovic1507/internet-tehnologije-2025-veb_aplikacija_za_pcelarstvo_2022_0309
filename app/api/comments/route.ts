import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getAuthUserFromRequest } from "@/app/lib/auth";

// GET /api/comments?hiveId=1  (lista komentara za jednu košnicu)
export async function GET(req: Request) {
  const url = new URL(req.url);
  const hiveIdStr = url.searchParams.get("hiveId");
  const hiveId = hiveIdStr ? Number(hiveIdStr) : null;

  if (!hiveId || Number.isNaN(hiveId)) {
    return NextResponse.json({ error: "Missing or invalid hiveId" }, { status: 400 });
  }

  const comments = await prisma.comment.findMany({
    where: { hiveId },
    orderBy: { createdAt: "desc" },
    include: {
      author: { select: { id: true, fullName: true, email: true, role: true } },
    },
  });

  return NextResponse.json({ comments });
}

// POST /api/comments  (ulogovan)
export async function POST(req: Request) {
  const auth = getAuthUserFromRequest(req);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { hiveId, text } = await req.json();

    const hiveIdNum = Number(hiveId);
    if (!hiveIdNum || Number.isNaN(hiveIdNum)) {
      return NextResponse.json({ error: "Missing or invalid hiveId" }, { status: 400 });
    }
    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Missing field: text" }, { status: 400 });
    }

    // proveri da hive postoji
    const hive = await prisma.hive.findUnique({ where: { id: hiveIdNum } });
    if (!hive) return NextResponse.json({ error: "Hive not found" }, { status: 404 });

    const comment = await prisma.comment.create({
      data: {
        text,
        hiveId: hiveIdNum,
        authorId: auth.userId,
      },
    });

    return NextResponse.json({ comment }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Server error", details: String(err) },
      { status: 500 }
    );
  }
}
