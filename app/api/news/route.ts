import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getNews, saveNews, isAuthorized, newId, type NewsItem } from "@/lib/store";

function refresh() {
  revalidatePath("/");
  revalidatePath("/news");
}

export async function GET() {
  return NextResponse.json(await getNews());
}

export async function POST(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await req.json()) as Partial<NewsItem>;
  if (!body.title || !body.body || !body.date) {
    return NextResponse.json({ error: "title, date and body are required" }, { status: 400 });
  }
  const items = await getNews();
  const item: NewsItem = {
    id: newId(),
    title: body.title,
    date: body.date,
    body: body.body,
    image: body.image || undefined,
  };
  items.push(item);
  await saveNews(items);
  refresh();
  return NextResponse.json(item, { status: 201 });
}

export async function PUT(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await req.json()) as NewsItem;
  const items = await getNews();
  const idx = items.findIndex((n) => n.id === body.id);
  if (idx === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  items[idx] = { ...items[idx], ...body, image: body.image || undefined };
  await saveNews(items);
  refresh();
  return NextResponse.json(items[idx]);
}

export async function DELETE(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const id = new URL(req.url).searchParams.get("id");
  const items = await getNews();
  const next = items.filter((n) => n.id !== id);
  if (next.length === items.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  await saveNews(next);
  refresh();
  return NextResponse.json({ ok: true });
}
