import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  adminCookie,
  clearLoginFailures,
  createSessionToken,
  credentialsMatch,
  loginAllowed,
  noteLoginFailure,
} from "@/lib/admin-auth";

export const runtime = "nodejs";

function clientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  if (!loginAllowed(ip)) {
    return NextResponse.json({ ok: false, message: "Слишком много попыток. Подождите 15 минут." }, { status: 429 });
  }
  const body = (await request.json().catch(() => null)) as { login?: string; password?: string } | null;
  const login = String(body?.login ?? "").trim();
  const password = String(body?.password ?? "");
  if (!credentialsMatch(login, password)) {
    noteLoginFailure(ip);
    return NextResponse.json({ ok: false, message: "Неверный логин или пароль." }, { status: 401 });
  }
  clearLoginFailures(ip);
  const token = await createSessionToken();
  const cookie = adminCookie();
  const jar = await cookies();
  jar.set(cookie.name, token, cookie.options);
  return NextResponse.json({ ok: true });
}
