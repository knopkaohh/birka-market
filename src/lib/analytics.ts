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

function fireLeadGoal() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: "lead", goal: LEAD_GOAL });
  window.dispatchEvent(new CustomEvent("birka:lead", { detail: { goal: LEAD_GOAL } }));
  if (typeof window.ym === "function" && METRIKA_COUNTER_ID) {
    window.ym(METRIKA_COUNTER_ID, "reachGoal", LEAD_GOAL);
  }
}

export function trackLeadConversion() {
  fireLeadGoal();
  if (typeof window === "undefined" || !METRIKA_COUNTER_ID) return;
  if (typeof window.ym === "function") return;

  let attempts = 0;
  const timer = window.setInterval(() => {
    attempts += 1;
    if (typeof window.ym === "function" || attempts > 20) {
      window.clearInterval(timer);
      if (typeof window.ym === "function") fireLeadGoal();
    }
  }, 300);
}
