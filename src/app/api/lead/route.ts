import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const quantity = Number(body.quantity);
  const phone = String(body.phone ?? "").trim();

  if (!phone || !Number.isFinite(quantity) || quantity < 100) {
    return NextResponse.json(
      { ok: false, message: "Укажите телефон и тираж от 100 штук." },
      { status: 400 },
    );
  }

  // Prototype endpoint. Connect this payload to the production CRM before launch.
  return NextResponse.json({ ok: true, acceptedAt: new Date().toISOString() });
}
