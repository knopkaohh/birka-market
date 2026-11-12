import { LEAD_GOAL } from "@/lib/lead";

declare global {
  interface Window {
    ym?: (id: number, method: string, ...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

const metrikaFromEnv = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID?.trim();
/** Публичный номер счётчика birka-market.ru. Пустая переменная окружения его не затирает. */
export const METRIKA_COUNTER_ID = Number(metrikaFromEnv || 100471214);

/** Идентификаторы JavaScript-целей. В кабинете Метрики имена должны совпасть буквально. */
export const METRIKA_GOALS = {
  lead: LEAD_GOAL,
  phone: "phone",
  messenger: "messenger",
  email: "email",
  calc: "calc",
} as const;

function whenMetrikaReady(send: () => boolean) {
  if (typeof window === "undefined" || !METRIKA_COUNTER_ID) return;
  if (send()) return;
  let attempts = 0;
  const timer = window.setInterval(() => {
    attempts += 1;
    if (send() || attempts > 20) window.clearInterval(timer);
  }, 300);
}

export function trackGoal(goal: string, params?: Record<string, string>) {
  whenMetrikaReady(() => {
    if (typeof window.ym !== "function") return false;
    window.ym(METRIKA_COUNTER_ID, "reachGoal", goal, params ?? {});
    return true;
  });
}

export function trackPageView(url: string) {
  whenMetrikaReady(() => {
    if (typeof window.ym !== "function") return false;
    window.ym(METRIKA_COUNTER_ID, "hit", url, {
      title: document.title,
      referer: document.referrer,
    });
    return true;
  });
}

export function trackLeadConversion() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: "lead", goal: LEAD_GOAL });
  window.dispatchEvent(new CustomEvent("birka:lead", { detail: { goal: LEAD_GOAL } }));
  trackGoal(LEAD_GOAL, { page: window.location.pathname });
}

export function goalForHref(href: string) {
  if (typeof window === "undefined") return null;
  if (href.startsWith("tel:")) return METRIKA_GOALS.phone;
  if (href.startsWith("mailto:")) return METRIKA_GOALS.email;
  let url: URL;
  try {
    url = new URL(href, window.location.origin);
  } catch {
    return null;
  }
  const host = url.hostname.replace(/^www\./, "");
  if (host === "t.me" || host === "max.ru" || host === "vk.me" || host === "vk.com" || host.endsWith(".vk.com")) {
    return METRIKA_GOALS.messenger;
  }
  if (url.origin === window.location.origin && (url.pathname === "/raschet" || url.pathname.startsWith("/raschet/"))) {
    return METRIKA_GOALS.calc;
  }
  return null;
}
