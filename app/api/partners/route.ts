import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getPartners, savePartners, isAuthorized, newId, type Partner } from "@/lib/store";

function refresh() {
  revalidatePath("/team");
}

export async function GET() {
  return NextResponse.json(await getPartners());
}

export async function POST(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await req.json()) as Partial<Partner>;
  if (!body.name || !body.type) {
    return NextResponse.json({ error: "name and type are required" }, { status: 400 });
  }
  const items = await getPartners();
  const item: Partner = { id: newId(), name: body.name, type: body.type };
  items.push(item);
  await savePartners(items);
  refresh();
  return NextResponse.json(item, { status: 201 });
}

export async function PUT(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await req.json()) as Partner;
  const items = await getPartners();
  const idx = items.findIndex((p) => p.id === body.id);
  if (idx === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  items[idx] = { ...items[idx], ...body };
  await savePartners(items);
  refresh();
  return NextResponse.json(items[idx]);
}

export async function DELETE(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const id = new URL(req.url).searchParams.get("id");
  const items = await getPartners();
  const next = items.filter((p) => p.id !== id);
  if (next.length === items.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  await savePartners(next);
  refresh();
  return NextResponse.json({ ok: true });
}
