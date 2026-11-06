import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { adminCookie } from "@/lib/admin-auth";

export async function POST() {
  const cookie = adminCookie();
  const jar = await cookies();
  jar.set(cookie.name, "", { ...cookie.options, maxAge: 0 });
  return NextResponse.json({ ok: true });
}
