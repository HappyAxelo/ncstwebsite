import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { isAuthorized } from "@/lib/store";

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_BYTES = 8 * 1024 * 1024;

// Files are stored in data/uploads (not public/) because the production
// server only serves public/ files that existed at build time. They are
// served back by app/uploads/[name]/route.ts.
export async function POST(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (!ALLOWED.has(file.type)) {
    return NextResponse.json({ error: "Only JPEG, PNG, WebP or GIF images are allowed" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Image must be under 8 MB" }, { status: 400 });
  }

  const ext = file.type === "image/jpeg" ? "jpg" : file.type.split("/")[1];
  const name = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}.${ext}`;
  const dir = path.join(process.cwd(), "data", "uploads");
  await fs.mkdir(dir, { recursive: true });
  const buf = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(dir, name), buf);

  return NextResponse.json({ url: `/uploads/${name}` }, { status: 201 });
}
