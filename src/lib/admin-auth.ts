import { createHmac, randomBytes, timingSafeEqual } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { cookies } from "next/headers";

const COOKIE = "birka_admin";
const WEEK = 60 * 60 * 24 * 14;

const attempts = new Map<string, { count: number; reset: number }>();

function adminUser() {
  return process.env.ADMIN_USER || "admin";
}

function adminPassword() {
  return process.env.ADMIN_PASSWORD || "Knopka2000";
}

function secretFile() {
  return path.join(process.env.VERCEL ? "/tmp" : process.cwd(), "data", "session-secret");
}

let secretCache = "";

async function sessionSecret() {
  if (process.env.ADMIN_SESSION_SECRET) return process.env.ADMIN_SESSION_SECRET;
  if (secretCache) return secretCache;
  try {
    secretCache = (await readFile(secretFile(), "utf8")).trim();
    if (secretCache) return secretCache;
  } catch {
    secretCache = "";
  }
  secretCache = randomBytes(32).toString("base64url");
  await mkdir(path.dirname(secretFile()), { recursive: true });
  await writeFile(secretFile(), secretCache, { mode: 0o600 });
  return secretCache;
}

function sign(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function safeEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function loginAllowed(ip: string) {
  const now = Date.now();
  const slot = attempts.get(ip);
  if (!slot || slot.reset < now) return true;
  return slot.count < 8;
}

export function noteLoginFailure(ip: string) {
  const now = Date.now();
  const slot = attempts.get(ip);
  if (!slot || slot.reset < now) {
    attempts.set(ip, { count: 1, reset: now + 15 * 60 * 1000 });
    return;
  }
  slot.count += 1;
}

export function clearLoginFailures(ip: string) {
  attempts.delete(ip);
}

export function credentialsMatch(login: string, password: string) {
  return safeEqual(login, adminUser()) && safeEqual(password, adminPassword());
}

export async function createSessionToken() {
  const secret = await sessionSecret();
  const payload = Buffer.from(
    JSON.stringify({ u: adminUser(), exp: Date.now() + WEEK * 1000 }),
  ).toString("base64url");
  return `${payload}.${sign(payload, secret)}`;
}

export async function sessionIsValid(token: string | undefined) {
  if (!token || !token.includes(".")) return false;
  const secret = await sessionSecret();
  const [payload, signature] = token.split(".");
  if (!payload || !signature || !safeEqual(signature, sign(payload, secret))) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { u?: string; exp?: number };
    return data.u === adminUser() && typeof data.exp === "number" && data.exp > Date.now();
  } catch {
    return false;
  }
}

export function adminCookie() {
  return {
    name: COOKIE,
    options: {
      httpOnly: true,
      sameSite: "lax" as const,
      path: "/",
      maxAge: WEEK,
      secure: process.env.NODE_ENV === "production",
    },
  };
}

export async function readAdminSession() {
  const jar = await cookies();
  return sessionIsValid(jar.get(COOKIE)?.value);
}
