import { NextResponse } from "next/server";
import { isAuthorized, db, newId } from "@/lib/store";

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_BYTES = 8 * 1024 * 1024;

// Images are stored in the Supabase "uploads" bucket (public read),
// so they persist on serverless hosts like Vercel.
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
  const name = `${newId()}.${ext}`;
  const supabase = db();
  const buf = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage
    .from("uploads")
    .upload(name, buf, { contentType: file.type, upsert: false });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data } = supabase.storage.from("uploads").getPublicUrl(name);
  return NextResponse.json({ url: data.publicUrl }, { status: 201 });
}
