import { promises as fs } from "fs";
import path from "path";

const TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  // strip any path components so only plain filenames are readable
  const safe = path.basename(name);
  const ext = path.extname(safe).toLowerCase();
  const type = TYPES[ext];
  if (!type) {
    return new Response("Not found", { status: 404 });
  }
  try {
    const buf = await fs.readFile(path.join(process.cwd(), "data", "uploads", safe));
    return new Response(new Uint8Array(buf), {
      headers: {
        "Content-Type": type,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
