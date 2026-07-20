import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSettings, saveSettings, isAuthorized, type Settings } from "@/lib/store";

export async function GET() {
  return NextResponse.json(await getSettings());
}

export async function PUT(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await req.json()) as Partial<Settings>;
  const current = await getSettings();
  const next: Settings = {
    heroTitle: body.heroTitle?.trim() || current.heroTitle,
    heroSubtitle: body.heroSubtitle?.trim() || current.heroSubtitle,
    aboutText: body.aboutText?.trim() || current.aboutText,
    contactEmail: body.contactEmail?.trim() || current.contactEmail,
  };
  await saveSettings(next);
  revalidatePath("/");
  revalidatePath("/contact");
  return NextResponse.json(next);
}
