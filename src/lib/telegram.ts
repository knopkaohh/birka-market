import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import type { LeadRecord } from "@/lib/lead";
import { inferKind } from "@/lib/leads-store";

export type TelegramChat = { id: string; title: string; kind: string };

type TelegramSettings = { token: string; chatId: string; chatTitle: string };

function settingsFile() {
  return path.join(process.env.VERCEL ? "/tmp" : process.cwd(), "data", "telegram.json");
}

const kindTitle: Record<ReturnType<typeof inferKind>, string> = {
  order: "Расчёт заказа",
  quick: "Быстрый расчёт",
  call: "Звонок",
  job: "Отклик на работу",
  website: "Заявка на сайт",
};

export function leadKindTitle(lead: LeadRecord) {
  return kindTitle[inferKind(lead)];
}

async function readSettings(): Promise<TelegramSettings> {
  const fromEnv = {
    token: process.env.TELEGRAM_BOT_TOKEN?.trim() || "",
    chatId: process.env.TELEGRAM_CHAT_ID?.trim() || "",
    chatTitle: process.env.TELEGRAM_CHAT_TITLE?.trim() || "",
  };
  try {
    const saved = JSON.parse(await readFile(settingsFile(), "utf8")) as Partial<TelegramSettings>;
    return {
      token: saved.token?.trim() || fromEnv.token,
      chatId: saved.chatId?.trim() || fromEnv.chatId,
      chatTitle: saved.chatTitle?.trim() || fromEnv.chatTitle,
    };
  } catch {
    return fromEnv;
  }
}

export async function telegramStatus() {
  const settings = await readSettings();
  const tail = settings.token ? settings.token.slice(-4) : "";
  return {
    configured: Boolean(settings.token && settings.chatId),
    hasToken: Boolean(settings.token),
    tokenHint: tail ? `••••${tail}` : "",
    chatId: settings.chatId,
    chatTitle: settings.chatTitle,
  };
}

export async function saveTelegramSettings(next: Partial<TelegramSettings>) {
  const current = await readSettings();
  const settings: TelegramSettings = {
    token: next.token?.trim() || current.token,
    chatId: next.chatId?.trim() ?? current.chatId,
    chatTitle: next.chatTitle?.trim() ?? current.chatTitle,
  };
  await mkdir(path.dirname(settingsFile()), { recursive: true });
  await writeFile(settingsFile(), JSON.stringify(settings, null, 2), { mode: 0o600 });
  return telegramStatus();
}

async function telegram<T>(token: string, method: string, body?: Record<string, unknown>) {
  const response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: body ? "POST" : "GET",
    headers: body ? { "content-type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(8000),
  });
  const data = (await response.json()) as { ok: boolean; description?: string; result?: T };
  if (!data.ok) throw new Error(data.description || "Telegram не ответил.");
  return data.result as T;
}

function moscowTime(iso: string) {
  return new Intl.DateTimeFormat("ru-RU", {
    timeZone: "Europe/Moscow",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function formatLeadMessage(lead: LeadRecord) {
  const lines = [`Новая заявка — ${leadKindTitle(lead)}`, ""];
  const rows: [string, string][] = [
    ["Имя", lead.name],
    ["Телефон", lead.phone],
    ["Тема", lead.productName],
    ["Тираж", lead.quantity ? String(lead.quantity) : ""],
    ["Связь", lead.contact],
    ["Вариант", lead.variant],
    ["Размер", lead.size],
    ["Цвета", lead.colors],
    ["Образец", lead.sample ? "да" : ""],
    ["Страница", lead.page],
    ["Файл", lead.fileName],
    ["Комментарий", lead.comment],
  ];
  for (const [label, value] of rows) {
    if (value) lines.push(`${label}: ${value}`);
  }
  lines.push("", `${moscowTime(lead.createdAt)} МСК`);
  return lines.join("\n").slice(0, 4000);
}

export async function notifyTelegram(lead: LeadRecord) {
  const settings = await readSettings();
  if (!settings.token || !settings.chatId) return "skipped" as const;
  await telegram(settings.token, "sendMessage", {
    chat_id: settings.chatId,
    text: formatLeadMessage(lead),
    disable_web_page_preview: true,
  });
  return "sent" as const;
}

export async function sendTelegramTest() {
  const settings = await readSettings();
  if (!settings.token || !settings.chatId) {
    throw new Error("Сначала сохраните токен бота и выберите чат.");
  }
  await telegram(settings.token, "sendMessage", {
    chat_id: settings.chatId,
    text: "Проверка связи. Заявки с сайта Бирка Маркет будут приходить в этот чат.",
  });
}

type TgChat = { id: number | string; title?: string; username?: string; first_name?: string; last_name?: string; type?: string };
type TgUpdate = {
  message?: { chat?: TgChat; new_chat_members?: { is_bot?: boolean }[] };
  edited_message?: { chat?: TgChat };
  channel_post?: { chat?: TgChat };
  my_chat_member?: { chat?: TgChat };
  chat_member?: { chat?: TgChat };
};

const GROUP_HINT =
  "Группу бот пока не видит: у него нет доступа к сообщениям. В «Заявки Бирка Маркет» откройте участников, нажмите birka_market_site и назначьте администратором. Затем снова нажмите «Найти чаты».";

function rememberChat(chats: Map<string, TelegramChat>, chat?: TgChat) {
  if (!chat?.id) return;
  const id = String(chat.id);
  const title = chat.title || [chat.first_name, chat.last_name].filter(Boolean).join(" ") || (chat.username ? `@${chat.username}` : id);
  const kind = chat.type || "chat";
  const current = chats.get(id);
  if (!current || (current.kind === "private" && kind !== "private")) chats.set(id, { id, title, kind });
}

export async function discoverTelegramChats(tokenOverride?: string) {
  const settings = await readSettings();
  const token = tokenOverride?.trim() || settings.token;
  if (!token) throw new Error("Вставьте токен бота.");
  await telegram<{ username: string }>(token, "getMe");
  const updates = await telegram<TgUpdate[]>(token, "getUpdates", {
    limit: 100,
    timeout: 0,
    allowed_updates: ["message", "edited_message", "channel_post", "my_chat_member", "chat_member"],
  });
  const chats = new Map<string, TelegramChat>();
  for (const update of updates ?? []) {
    rememberChat(chats, update.message?.chat);
    rememberChat(chats, update.edited_message?.chat);
    rememberChat(chats, update.channel_post?.chat);
    rememberChat(chats, update.my_chat_member?.chat);
    rememberChat(chats, update.chat_member?.chat);
  }
  const list = [...chats.values()].sort((a, b) => Number(a.kind === "private") - Number(b.kind === "private"));
  const group = list.find((chat) => chat.kind !== "private");
  if (tokenOverride?.trim() && tokenOverride.trim() !== settings.token) {
    await saveTelegramSettings({ token: tokenOverride.trim() });
  }
  if (group) {
    await saveTelegramSettings({ chatId: group.id, chatTitle: group.title });
    try {
      await telegram(token, "sendMessage", {
        chat_id: group.id,
        text: "Проверка связи. Заявки с сайта Бирка Маркет будут приходить в этот чат.",
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Не удалось отправить сообщение в группу.";
      return { chats: list, hint: `Группа найдена, но бот не смог написать: ${message}` };
    }
  }
  return { chats: list, hint: group ? "" : GROUP_HINT };
}
