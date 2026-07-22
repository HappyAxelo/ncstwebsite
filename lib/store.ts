import { createClient } from "@supabase/supabase-js";
import { defaultContent, type SiteContent } from "@/lib/content";

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

// Supabase connection for the ncst-website project. These values are baked in
// as defaults so the site works without any hosting configuration; environment
// variables override them if set. The repository is private and this key is
// used server-side only (never sent to the browser), so it is not exposed.
const SUPABASE_URL =
  process.env.SUPABASE_URL || "https://njpgxaxpwngjfokmvkuk.supabase.co";
const SUPABASE_KEY =
  process.env.SUPABASE_KEY || "sb_publishable_YSPaE6GVcjmDiOvonl70BA_JzT77rip";

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

// Deep-merge stored overrides on top of defaults: plain objects merge key by
// key, while arrays and primitives are taken wholesale from the stored value
// when present. This lets new default fields appear automatically after a code
// update, while user-edited lists fully replace the defaults.
function deepMerge<T>(base: T, override: unknown): T {
  if (
    override &&
    typeof override === "object" &&
    !Array.isArray(override) &&
    base &&
    typeof base === "object" &&
    !Array.isArray(base)
  ) {
    const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
    for (const [k, v] of Object.entries(override as Record<string, unknown>)) {
      out[k] = k in (base as Record<string, unknown>)
        ? deepMerge((base as Record<string, unknown>)[k], v)
        : v;
    }
    return out as T;
  }
  return (override === undefined || override === null ? base : (override as T));
}

export async function getContent(): Promise<SiteContent> {
  const stored = await readDoc<Partial<SiteContent>>("content", {});
  return deepMerge(defaultContent, stored);
}

export async function saveContent(content: SiteContent) {
  await writeDoc("content", content);
}

export function isAuthorized(req: Request): boolean {
  const key = req.headers.get("x-admin-key") ?? "";
  const expected = process.env.ADMIN_KEY || "ur-unima-2026";
  return key === expected;
}

export function newId() {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
}
