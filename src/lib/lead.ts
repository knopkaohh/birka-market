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
}: {
  phone: string;
  quantity: number;
  minQty: number;
  name: string;
}): LeadValidation {
  if (!phone) {
    return { ok: false, message: "Укажите телефон." };
  }
  if (!Number.isFinite(quantity) || quantity < minQty) {
    return { ok: false, message: `Укажите тираж от ${minQty} штук.` };
  }
  if (name.length > 120) {
    return { ok: false, message: "Имя слишком длинное." };
  }
  return { ok: true };
}
