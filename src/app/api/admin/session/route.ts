import { NextResponse } from "next/server";
import { readAdminSession } from "@/lib/admin-auth";

export async function GET() {
  if (!(await readAdminSession())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  return NextResponse.json({ ok: true });
}
