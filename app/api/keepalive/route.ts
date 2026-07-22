import { NextResponse } from "next/server";
import { getContent } from "@/lib/store";

// Pinged daily (Vercel cron) so the free Supabase project never pauses
// from inactivity.
export async function GET() {
  const content = await getContent();
  return NextResponse.json({ ok: true, checked: !!content.home.heroTitle });
}
