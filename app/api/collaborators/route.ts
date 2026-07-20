import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  getCollaborators,
  saveCollaborators,
  isAuthorized,
  newId,
  type Collaborator,
} from "@/lib/store";

function refresh() {
  revalidatePath("/team");
}

export async function GET() {
  return NextResponse.json(await getCollaborators());
}

export async function POST(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await req.json()) as Partial<Collaborator>;
  if (!body.name || !body.role || !body.org) {
    return NextResponse.json({ error: "name, role and org are required" }, { status: 400 });
  }
  const items = await getCollaborators();
  const item: Collaborator = {
    id: newId(),
    name: body.name,
    role: body.role,
    org: body.org,
    photo: body.photo || undefined,
  };
  items.push(item);
  await saveCollaborators(items);
  refresh();
  return NextResponse.json(item, { status: 201 });
}

export async function PUT(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await req.json()) as Collaborator;
  const items = await getCollaborators();
  const idx = items.findIndex((c) => c.id === body.id);
  if (idx === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  items[idx] = { ...items[idx], ...body, photo: body.photo || undefined };
  await saveCollaborators(items);
  refresh();
  return NextResponse.json(items[idx]);
}

export async function DELETE(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const id = new URL(req.url).searchParams.get("id");
  const items = await getCollaborators();
  const next = items.filter((c) => c.id !== id);
  if (next.length === items.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  await saveCollaborators(next);
  refresh();
  return NextResponse.json({ ok: true });
}
