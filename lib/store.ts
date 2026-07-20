import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

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

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, file), "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson(file: string, data: unknown) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(path.join(DATA_DIR, file), JSON.stringify(data, null, 2), "utf-8");
}

export async function getNews(): Promise<NewsItem[]> {
  const items = await readJson<NewsItem[]>("news.json", []);
  return items.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function saveNews(items: NewsItem[]) {
  await writeJson("news.json", items);
}

export async function getCollaborators(): Promise<Collaborator[]> {
  return readJson<Collaborator[]>("collaborators.json", []);
}

export async function saveCollaborators(items: Collaborator[]) {
  await writeJson("collaborators.json", items);
}

export async function getPartners(): Promise<Partner[]> {
  return readJson<Partner[]>("partners.json", []);
}

export async function savePartners(items: Partner[]) {
  await writeJson("partners.json", items);
}

export async function getSettings(): Promise<Settings> {
  const stored = await readJson<Partial<Settings>>("settings.json", {});
  return { ...defaultSettings, ...stored };
}

export async function saveSettings(s: Settings) {
  await writeJson("settings.json", s);
}

export function isAuthorized(req: Request): boolean {
  const key = req.headers.get("x-admin-key") ?? "";
  const expected = process.env.ADMIN_KEY || "ur-unima-2026";
  return key === expected;
}

export function newId() {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
}
