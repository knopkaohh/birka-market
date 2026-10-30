import { isCompleteRuPhone } from "@/lib/phone";

export const LEAD_GOAL = "LEAD";
export const MAX_FILE_BYTES = 15 * 1024 * 1024;

export type LeadRecord = {
  createdAt: string;
  product: string;
  productName: string;
  quantity: number;
  name: string;
  phone: string;
  contact: string;
  comment: string;
  variant: string;
  size: string;
  colors: string;
  sample: boolean;
  page: string;
  fileName: string;
};

export type LeadValidation =
  | { ok: true }
  | { ok: false; message: string };

export function validateJobApplication({
  name,
  phone,
  city,
  age,
  previousWork,
  sales,
  about,
  consent,
}: {
  name: string;
  phone: string;
  city: string;
  age: string;
  previousWork: string;
  sales: string;
  about: string;
  consent: boolean;
}): LeadValidation {
  const years = Number(age);
  if (!consent) return { ok: false, message: "Нужно согласие на обработку персональных данных." };
  if (name.trim().length < 2 || name.length > 120) return { ok: false, message: "Укажите имя." };
  if (!isCompleteRuPhone(phone)) return { ok: false, message: "Укажите номер телефона." };
  if (city.trim().length < 2 || city.length > 80) return { ok: false, message: "Укажите город." };
  if (!/^\d{2}$/.test(age) || years < 14 || years > 80) return { ok: false, message: "Укажите возраст." };
  if (previousWork.trim().length < 2 || previousWork.length > 2000) {
    return { ok: false, message: "Напишите, где работали ранее." };
  }
  if (sales.trim().length < 2 || sales.length > 2000) {
    return { ok: false, message: "Опишите опыт в продажах или сильные стороны." };
  }
  if (about.trim().length < 2 || about.length > 4000) return { ok: false, message: "Кратко расскажите о себе." };
  return { ok: true };
}

export const websiteCurrentOptions = [
  "Нет сайта",
  "Есть сайт, нужна новая версия",
  "Есть сайт, нужны правки",
] as const;

export function validateWebsiteRequest({
  companyName,
  style,
  purpose,
  currentSite,
  name,
  phone,
  comment,
  consent,
}: {
  companyName: string;
  style: string;
  purpose: string;
  currentSite: string;
  name: string;
  phone: string;
  comment: string;
  consent: boolean;
}): LeadValidation {
  if (!consent) return { ok: false, message: "Нужно согласие на обработку персональных данных." };
  if (companyName.trim().length < 2 || companyName.length > 160) {
    return { ok: false, message: "Укажите название фирмы." };
  }
  if (style.trim().length < 2 || style.length > 400) {
    return { ok: false, message: "Опишите, какой стиль сайта хотели бы." };
  }
  if (purpose.trim().length < 2 || purpose.length > 400) {
    return { ok: false, message: "Напишите, для чего нужен сайт." };
  }
  if (!websiteCurrentOptions.includes(currentSite as (typeof websiteCurrentOptions)[number])) {
    return { ok: false, message: "Укажите, есть ли сайт сейчас." };
  }
  if (name.trim().length < 2 || name.length > 120) return { ok: false, message: "Укажите имя." };
  if (!isCompleteRuPhone(phone)) return { ok: false, message: "Укажите номер телефона." };
  if (comment.length > 2000) return { ok: false, message: "Комментарий слишком длинный." };
  return { ok: true };
}

export function validateLeadInput({
  phone,
  quantity,
  minQty,
  name,
  quick = false,
  phoneOnly = false,
}: {
  phone: string;
  quantity: number;
  minQty: number;
  name: string;
  quick?: boolean;
  phoneOnly?: boolean;
}): LeadValidation {
  if (name.length > 120) {
    return { ok: false, message: "Имя слишком длинное." };
  }
  if (phoneOnly) {
    if (!isCompleteRuPhone(phone)) {
      return { ok: false, message: "Укажите номер телефона." };
    }
    return { ok: true };
  }
  if (quick) {
    if (!name || !phone) {
      return { ok: false, message: "Укажите имя и телефон." };
    }
    return { ok: true };
  }
  if (!phone) {
    return { ok: false, message: "Укажите телефон." };
  }
  if (!Number.isFinite(quantity) || quantity < minQty) {
    return { ok: false, message: `Укажите тираж от ${minQty} штук.` };
  }
  return { ok: true };
}
