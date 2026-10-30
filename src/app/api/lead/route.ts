import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import {
  LEAD_GOAL,
  MAX_FILE_BYTES,
  validateJobApplication,
  validateLeadInput,
  validateWebsiteRequest,
  type LeadRecord,
} from "@/lib/lead";
import { getProduct } from "@/lib/site";

export async function POST(request: Request) {
  const form = await request.formData();
  const phone = String(form.get("phone") ?? "").trim();
  const name = String(form.get("name") ?? "").trim();
  const quantity = Number(form.get("quantity") ?? 0);
  const productSlug = String(form.get("product") ?? "unknown");
  const product = getProduct(productSlug);
  const minQty = product?.minQty ?? 1;
  const quick = String(form.get("quick") ?? "") === "1";
  const phoneOnly = String(form.get("phoneOnly") ?? "") === "1";
  const job = String(form.get("job") ?? "") === "1";
  const city = String(form.get("city") ?? "").trim();
  const age = String(form.get("age") ?? "").trim();
  const previousWork = String(form.get("previous") ?? "").trim();
  const sales = String(form.get("sales") ?? "").trim();
  const about = String(form.get("about") ?? "").trim();
  const consent = String(form.get("consent") ?? "") === "1";
  const website = String(form.get("website") ?? "") === "1";
  const companyName = String(form.get("company") ?? "").trim();
  const style = String(form.get("style") ?? "").trim();
  const purpose = String(form.get("purpose") ?? "").trim();
  const currentSite = String(form.get("currentSite") ?? "").trim();
  const note = String(form.get("comment") ?? "").trim();

  const check = job
    ? validateJobApplication({ name, phone, city, age, previousWork, sales, about, consent })
    : website
      ? validateWebsiteRequest({ companyName, style, purpose, currentSite, name, phone, comment: note, consent })
      : validateLeadInput({ phone, quantity, minQty, name, quick, phoneOnly });
  if (!check.ok) {
    return NextResponse.json({ ok: false, message: check.message }, { status: 400 });
  }

  const file = form.get("file");
  let fileName = "";
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json({ ok: false, message: "Файл больше 15 МБ." }, { status: 400 });
    }
    const uploadDir = path.join(process.env.VERCEL ? "/tmp" : process.cwd(), "data", "uploads");
    await mkdir(uploadDir, { recursive: true });
    const safe = file.name.replace(/[^\w.\-]+/g, "_");
    fileName = `${Date.now()}-${safe}`;
    await writeFile(path.join(uploadDir, fileName), Buffer.from(await file.arrayBuffer()));
  }

  const lead: LeadRecord = {
    createdAt: new Date().toISOString(),
    product: job ? "job" : website ? "sozdanie-sajtov" : productSlug,
    productName: job
      ? "Отклик на работу"
      : website
        ? "Заявка на сайт"
        : phoneOnly
          ? "Консультация по выбору"
          : product?.name ?? "Нужна помощь с выбором",
    quantity: job || phoneOnly || quick || website ? 0 : quantity,
    name,
    phone,
    contact: String(form.get("contact") ?? "phone"),
    comment: job
      ? [
          `Город: ${city}`,
          `Возраст: ${age}`,
          `Где работали ранее: ${previousWork}`,
          `Опыт в продажах: ${sales}`,
          `О себе: ${about}`,
        ].join("\n")
      : website
        ? [
            `Фирма: ${companyName}`,
            `Стиль: ${style}`,
            `Задача: ${purpose}`,
            `Текущий сайт: ${currentSite}`,
            note ? `Комментарий: ${note}` : "",
          ]
            .filter(Boolean)
            .join("\n")
        : String(form.get("comment") ?? ""),
    variant: String(form.get("variant") ?? ""),
    size: String(form.get("size") ?? ""),
    colors: String(form.get("colors") ?? ""),
    sample: Boolean(form.get("sample")),
    page: String(form.get("page") ?? ""),
    fileName,
  };

  const dataDir = path.join(process.env.VERCEL ? "/tmp" : process.cwd(), "data");
  await mkdir(dataDir, { recursive: true });
  const leadsPath = path.join(dataDir, "leads.json");
  const { readFile } = await import("fs/promises");
  let leads: LeadRecord[] = [];
  try {
    leads = JSON.parse(await readFile(leadsPath, "utf8")) as LeadRecord[];
    if (!Array.isArray(leads)) leads = [];
  } catch {
    leads = [];
  }
  leads.push(lead);
  await writeFile(leadsPath, JSON.stringify(leads, null, 2));

  return NextResponse.json({ ok: true, id: lead.createdAt, goal: LEAD_GOAL });
}
