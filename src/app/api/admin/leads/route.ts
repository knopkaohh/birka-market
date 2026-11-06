import { NextResponse } from "next/server";
import { readAdminSession } from "@/lib/admin-auth";
import { isLeadStatus, listLeads, updateLead } from "@/lib/leads-store";

export const runtime = "nodejs";

export async function GET() {
  if (!(await readAdminSession())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  return NextResponse.json({ ok: true, leads: await listLeads() });
}

export async function POST(request: Request) {
  if (!(await readAdminSession())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const body = (await request.json().catch(() => null)) as { id?: string; status?: string } | null;
  const id = String(body?.id ?? "");
  const status = String(body?.status ?? "");
  if (!id || !isLeadStatus(status)) {
    return NextResponse.json({ ok: false, message: "Не удалось обновить заявку." }, { status: 400 });
  }
  const lead = await updateLead(id, { status });
  if (!lead) return NextResponse.json({ ok: false, message: "Заявка не найдена." }, { status: 404 });
  return NextResponse.json({ ok: true });
}
