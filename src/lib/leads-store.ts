import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import type { LeadKind, LeadRecord, LeadStatus, TelegramState } from "@/lib/lead";

function dataDir() {
  return path.join(process.env.VERCEL ? "/tmp" : process.cwd(), "data");
}

export function leadsFile() {
  return path.join(dataDir(), "leads.json");
}

export function uploadsDir() {
  return path.join(dataDir(), "uploads");
}

let queue: Promise<unknown> = Promise.resolve();

function locked<T>(task: () => Promise<T>) {
  const run = queue.then(task, task);
  queue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

async function readAll(): Promise<LeadRecord[]> {
  try {
    const parsed = JSON.parse(await readFile(leadsFile(), "utf8")) as unknown;
    return Array.isArray(parsed) ? (parsed as LeadRecord[]) : [];
  } catch {
    return [];
  }
}

export function leadId(lead: LeadRecord) {
  return lead.id || lead.createdAt;
}

export function inferKind(lead: LeadRecord): LeadKind {
  if (lead.kind) return lead.kind;
  if (lead.product === "job") return "job";
  if (lead.product === "sozdanie-sajtov") return "website";
  if (lead.productName.startsWith("Консультация")) return "call";
  if (!lead.quantity) return "quick";
  return "order";
}

export async function appendLead(lead: LeadRecord) {
  return locked(async () => {
    const dir = dataDir();
    await mkdir(dir, { recursive: true });
    const leads = await readAll();
    leads.push(lead);
    await writeFile(leadsFile(), JSON.stringify(leads, null, 2));
    return lead;
  });
}

export async function listLeads() {
  const leads = await readAll();
  return leads
    .map((lead) => ({ ...lead, id: leadId(lead), kind: inferKind(lead), status: lead.status ?? "new" }))
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function updateLead(
  id: string,
  patch: Partial<Pick<LeadRecord, "status" | "telegram">>,
) {
  return locked(async () => {
    const leads = await readAll();
    const index = leads.findIndex((lead) => leadId(lead) === id);
    if (index < 0) return null;
    leads[index] = { ...leads[index], ...patch };
    await mkdir(dataDir(), { recursive: true });
    await writeFile(leadsFile(), JSON.stringify(leads, null, 2));
    return leads[index];
  });
}

export function isLeadStatus(value: string): value is LeadStatus {
  return value === "new" || value === "seen";
}

export function isTelegramState(value: string): value is TelegramState {
  return value === "sent" || value === "skipped" || value === "failed";
}
