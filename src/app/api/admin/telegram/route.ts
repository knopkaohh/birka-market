import { NextResponse } from "next/server";
import { readAdminSession } from "@/lib/admin-auth";
import { discoverTelegramChats, saveTelegramSettings, sendTelegramTest, telegramStatus } from "@/lib/telegram";

export const runtime = "nodejs";

export async function GET() {
  if (!(await readAdminSession())) return NextResponse.json({ ok: false }, { status: 401 });
  return NextResponse.json({ ok: true, ...(await telegramStatus()) });
}

export async function POST(request: Request) {
  if (!(await readAdminSession())) return NextResponse.json({ ok: false }, { status: 401 });
  const body = (await request.json().catch(() => null)) as {
    action?: string;
    token?: string;
    chatId?: string;
    chatTitle?: string;
  } | null;
  try {
    if (body?.action === "discover") {
      const found = await discoverTelegramChats(body.token);
      return NextResponse.json({ ok: true, chats: found.chats, hint: found.hint, ...(await telegramStatus()) });
    }
    if (body?.action === "save") {
      const status = await saveTelegramSettings({
        token: body.token,
        chatId: body.chatId,
        chatTitle: body.chatTitle,
      });
      return NextResponse.json({ ok: true, ...status });
    }
    if (body?.action === "test") {
      await sendTelegramTest();
      return NextResponse.json({ ok: true, ...(await telegramStatus()) });
    }
    return NextResponse.json({ ok: false, message: "Неизвестное действие." }, { status: 400 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Не удалось связаться с Telegram.";
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}
