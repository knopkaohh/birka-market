"use client";

import { useEffect, useMemo, useState } from "react";
import type { LeadKind, LeadRecord, LeadStatus } from "@/lib/lead";

type LeadView = LeadRecord & { id: string; kind: LeadKind; status: LeadStatus };
type Chat = { id: string; title: string; kind: string };
type TelegramInfo = {
  configured: boolean;
  hasToken: boolean;
  tokenHint: string;
  chatId: string;
  chatTitle: string;
};

const filters: { id: "all" | LeadKind; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "order", label: "Заказы" },
  { id: "quick", label: "Быстрый расчёт" },
  { id: "call", label: "Звонки" },
  { id: "website", label: "Сайты" },
  { id: "job", label: "Работа" },
];

const kindLabel: Record<LeadKind, string> = {
  order: "Расчёт заказа",
  quick: "Быстрый расчёт",
  call: "Звонок",
  job: "Отклик на работу",
  website: "Заявка на сайт",
};

function moscow(iso: string) {
  return new Intl.DateTimeFormat("ru-RU", {
    timeZone: "Europe/Moscow",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export default function AdminPage() {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [login, setLogin] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [leads, setLeads] = useState<LeadView[]>([]);
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const [openId, setOpenId] = useState("");
  const [telegram, setTelegram] = useState<TelegramInfo | null>(null);
  const [token, setToken] = useState("");
  const [chats, setChats] = useState<Chat[]>([]);
  const [notice, setNotice] = useState("");

  async function loadLeads() {
    const response = await fetch("/api/admin/leads", { cache: "no-store" });
    if (!response.ok) return;
    const data = (await response.json()) as { leads: LeadView[] };
    setLeads(data.leads);
  }

  async function loadTelegram() {
    const response = await fetch("/api/admin/telegram", { cache: "no-store" });
    if (!response.ok) return;
    const data = (await response.json()) as TelegramInfo;
    setTelegram(data);
  }

  useEffect(() => {
    fetch("/api/admin/session", { cache: "no-store" })
      .then((response) => {
        setAuthed(response.ok);
        if (response.ok) {
          void loadLeads();
          void loadTelegram();
        }
      })
      .finally(() => setReady(true));
  }, []);

  const visible = useMemo(
    () => (filter === "all" ? leads : leads.filter((lead) => lead.kind === filter)),
    [filter, leads],
  );
  const fresh = leads.filter((lead) => lead.status !== "seen").length;

  async function submitLogin(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ login, password }),
    });
    setPending(false);
    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as { message?: string } | null;
      setError(data?.message || "Не удалось войти.");
      return;
    }
    setPassword("");
    setAuthed(true);
    await loadLeads();
    await loadTelegram();
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
    setLeads([]);
  }

  async function mark(lead: LeadView, status: LeadStatus) {
    const response = await fetch("/api/admin/leads", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id: lead.id, status }),
    });
    if (response.ok) {
      setLeads((items) => items.map((item) => (item.id === lead.id ? { ...item, status } : item)));
    }
  }

  async function telegramAction(action: "discover" | "save" | "test", extra?: { chatId?: string; chatTitle?: string }) {
    setPending(true);
    setNotice("");
    setError("");
    const response = await fetch("/api/admin/telegram", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action, token, ...extra }),
    });
    const data = (await response.json().catch(() => null)) as (TelegramInfo & { ok: boolean; message?: string; chats?: Chat[] }) | null;
    setPending(false);
    if (!response.ok || !data?.ok) {
      setError(data?.message || "Telegram не подключился.");
      return;
    }
    setTelegram(data);
    if (data.chats) setChats(data.chats);
    if (action === "test") setNotice("Проверочное сообщение отправлено.");
    if (action === "save") setNotice("Чат для заявок сохранён.");
    if (action === "discover" && !data.chats?.length) {
      setNotice("Чатов пока нет. Напишите боту или добавьте его в группу и отправьте туда любое сообщение.");
    }
  }

  if (!ready) return <div className="admin-app" />;

  if (!authed) {
    return (
      <div className="admin-app">
        <form className="admin-login" onSubmit={submitLogin}>
          <p>Бирка Маркет</p>
          <h1>Заявки</h1>
          <label>
            Логин
            <input value={login} onChange={(event) => setLogin(event.target.value)} autoComplete="username" />
          </label>
          <label>
            Пароль
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
            />
          </label>
          {error ? <span>{error}</span> : null}
          <button type="submit" disabled={pending}>
            Войти
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-app">
      <header className="admin-top">
        <div>
          <p>Бирка Маркет</p>
          <h1>Заявки {fresh ? <em>{fresh} новых</em> : null}</h1>
        </div>
        <button type="button" onClick={logout}>
          Выйти
        </button>
      </header>

      <section className="admin-telegram">
        <h2>Дубль в Telegram</h2>
        <p>
          Создайте бота у{" "}
          <a href="https://t.me/BotFather" target="_blank" rel="noreferrer">
            @BotFather
          </a>{" "}
          командой /newbot и вставьте токен. Затем напишите боту в личку или добавьте его в группу и отправьте в чат любое сообщение. После этого нажмите «Найти чаты».
        </p>
        <label>
          Токен бота
          <input
            value={token}
            onChange={(event) => setToken(event.target.value)}
            placeholder={telegram?.tokenHint || "123456:ABC..."}
            autoComplete="off"
          />
        </label>
        <div className="admin-row">
          <button type="button" disabled={pending} onClick={() => telegramAction("discover")}>
            Найти чаты
          </button>
          <button type="button" disabled={pending || !telegram?.configured} onClick={() => telegramAction("test")}>
            Проверить отправку
          </button>
        </div>
        {telegram?.configured ? (
          <strong>
            Сейчас заявки идут в {telegram.chatTitle || "чат"} {telegram.chatId}
          </strong>
        ) : (
          <strong>Пока заявки сохраняются только в этой панели.</strong>
        )}
        {chats.length ? (
          <ul>
            {chats.map((chat) => (
              <li key={chat.id}>
                <button
                  type="button"
                  onClick={() => telegramAction("save", { chatId: chat.id, chatTitle: chat.title })}
                >
                  {chat.title} · {chat.kind}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
        {notice ? <span className="is-ok">{notice}</span> : null}
        {error ? <span>{error}</span> : null}
      </section>

      <div className="admin-filters">
        {filters.map((item) => (
          <button key={item.id} type="button" className={filter === item.id ? "is-on" : ""} onClick={() => setFilter(item.id)}>
            {item.label}
          </button>
        ))}
      </div>

      {visible.length ? (
        <ul className="admin-list">
          {visible.map((lead) => {
            const open = openId === lead.id;
            return (
              <li key={lead.id} className={lead.status === "seen" ? "is-seen" : ""}>
                <button type="button" className="admin-lead" onClick={() => setOpenId(open ? "" : lead.id)}>
                  <span>{kindLabel[lead.kind]}</span>
                  <strong>{lead.name || "Без имени"}</strong>
                  <em>{lead.phone}</em>
                  <small>
                    {moscow(lead.createdAt)} МСК
                    {lead.telegram === "failed" ? " · Telegram не отправился" : ""}
                    {lead.telegram === "sent" ? " · ушло в Telegram" : ""}
                  </small>
                </button>
                {open ? (
                  <div className="admin-detail">
                    <Field label="Тема" value={lead.productName} />
                    <Field label="Тираж" value={lead.quantity ? String(lead.quantity) : ""} />
                    <Field label="Связь" value={lead.contact} />
                    <Field label="Вариант" value={lead.variant} />
                    <Field label="Размер" value={lead.size} />
                    <Field label="Цвета" value={lead.colors} />
                    <Field label="Образец" value={lead.sample ? "да" : ""} />
                    <Field label="Страница" value={lead.page} />
                    <Field label="Комментарий" value={lead.comment} />
                    {lead.fileName ? (
                      <a href={`/api/admin/uploads/${encodeURIComponent(lead.fileName)}`}>Скачать файл</a>
                    ) : null}
                    <button type="button" onClick={() => mark(lead, lead.status === "seen" ? "new" : "seen")}>
                      {lead.status === "seen" ? "Снова новая" : "Просмотрено"}
                    </button>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="admin-empty">Заявок в этом разделе пока нет.</p>
      )}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <p>
      <span>{label}</span>
      {value}
    </p>
  );
}
