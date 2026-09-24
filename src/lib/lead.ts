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

export function validateLeadInput({
  phone,
  quantity,
  minQty,
  name,
  quick = false,
}: {
  phone: string;
  quantity: number;
  minQty: number;
  name: string;
  quick?: boolean;
}): LeadValidation {
  if (name.length > 120) {
    return { ok: false, message: "Имя слишком длинное." };
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
