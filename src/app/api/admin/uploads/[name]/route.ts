import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { readAdminSession } from "@/lib/admin-auth";
import { uploadsDir } from "@/lib/leads-store";

export const runtime = "nodejs";

export async function GET(_request: Request, context: { params: Promise<{ name: string }> }) {
  if (!(await readAdminSession())) return NextResponse.json({ ok: false }, { status: 401 });
  const { name } = await context.params;
  if (!/^[\w.\-]+$/.test(name)) return NextResponse.json({ ok: false }, { status: 400 });
  try {
    const file = await readFile(path.join(uploadsDir(), name));
    return new NextResponse(file, {
      headers: {
        "content-type": "application/octet-stream",
        "content-disposition": `attachment; filename="${name}"`,
      },
    });
  } catch {
    return NextResponse.json({ ok: false }, { status: 404 });
  }
}
