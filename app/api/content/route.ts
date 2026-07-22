import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getContent, saveContent, isAuthorized } from "@/lib/store";
import type { SiteContent } from "@/lib/content";

export async function GET() {
  return NextResponse.json(await getContent());
}

export async function PUT(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await req.json()) as SiteContent;
  await saveContent(body);
  // Refresh every page that renders editable content.
  for (const path of ["/", "/machine-vision", "/maintenance", "/impact", "/team", "/contact"]) {
    revalidatePath(path);
  }
  return NextResponse.json({ ok: true });
}
