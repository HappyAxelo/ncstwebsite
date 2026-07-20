import { NextResponse } from "next/server";
import { getSettings } from "@/lib/store";

// Pinged daily (Vercel cron) so the free Supabase project never pauses
// from inactivity.
export async function GET() {
  const settings = await getSettings();
  return NextResponse.json({ ok: true, checked: !!settings.heroTitle });
}
