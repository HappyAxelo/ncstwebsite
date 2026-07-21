import { createClient } from "@supabase/supabase-js";

export type NewsItem = {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  body: string;
  image?: string;
};

export type Collaborator = {
  id: string;
  name: string;
  role: string;
  org: string;
  photo?: string;
};

export type Partner = {
  id: string;
  name: string;
  type: string;
};

export type Settings = {
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  contactEmail: string;
};

export const defaultSettings: Settings = {
  heroTitle:
    "AI machine vision for quality control and waste reduction in food processing",
  heroSubtitle:
    "Cameras and neural networks inspect every maize grain on the production line, while IoT sensors watch the machines themselves. A 24-month research project in Rwanda and Malawi.",
  aboutText:
    "Workers check maize by eye for mold, discoloration and foreign objects. The method is slow, inconsistent, and misses the contamination that matters most. Aflatoxin, a toxic mold, is linked to liver disease and weakened immunity.",
  contactEmail: "info@ur.ac.rw",
};

// Supabase connection for the ncst-website project. These values are baked in
// as defaults so the site works without any hosting configuration; environment
// variables override them if set. The repository is private and this key is
// used server-side only (never sent to the browser), so it is not exposed.
const SUPABASE_URL =
  process.env.SUPABASE_URL || "https://njpgxaxpwngjfokmvkuk.supabase.co";
const SUPABASE_KEY =
  process.env.SUPABASE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qcGd4YXhwd25namZva212a3VrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ1NTQxNTUsImV4cCI6MjEwMDEzMDE1NX0.SEXsFM2f1e70BS56hGoezHPFurQyuHlg8XcnoKrdNaQ";

// Server-side only. The key never reaches the browser: all reads and writes
// happen in server components and route handlers.
export function db() {
  return createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: { persistSession: false },
  });
}

async function readDoc<T>(key: string, fallback: T): Promise<T> {
  try {
    const { data, error } = await db()
      .from("site_content")
      .select("value")
      .eq("key", key)
      .maybeSingle();
    if (error || !data) return fallback;
    return data.value as T;
  } catch {
    return fallback;
  }
}

async function writeDoc(key: string, value: unknown) {
  const { error } = await db()
    .from("site_content")
    .upsert({ key, value, updated_at: new Date().toISOString() });
  if (error) throw new Error(error.message);
}

export async function getNews(): Promise<NewsItem[]> {
  const items = await readDoc<NewsItem[]>("news", []);
  return items.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function saveNews(items: NewsItem[]) {
  await writeDoc("news", items);
}

export async function getCollaborators(): Promise<Collaborator[]> {
  return readDoc<Collaborator[]>("collaborators", []);
}

export async function saveCollaborators(items: Collaborator[]) {
  await writeDoc("collaborators", items);
}

export async function getPartners(): Promise<Partner[]> {
  return readDoc<Partner[]>("partners", []);
}

export async function savePartners(items: Partner[]) {
  await writeDoc("partners", items);
}

export async function getSettings(): Promise<Settings> {
  const stored = await readDoc<Partial<Settings>>("settings", {});
  return { ...defaultSettings, ...stored };
}

export async function saveSettings(s: Settings) {
  await writeDoc("settings", s);
}

export function isAuthorized(req: Request): boolean {
  const key = req.headers.get("x-admin-key") ?? "";
  const expected = process.env.ADMIN_KEY || "ur-unima-2026";
  return key === expected;
}

export function newId() {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
}
