import type { NewsItem } from "@/lib/store";

export function formatDate(d: string) {
  try {
    return new Date(`${d}T00:00:00`).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return d;
  }
}

export default function NewsCard({
  item,
  clamp = true,
}: {
  item: NewsItem;
  clamp?: boolean;
}) {
  return (
    <article className="card card-hover flex h-full flex-col overflow-hidden">
      {item.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.image}
          alt={item.title}
          className="h-44 w-full object-cover"
        />
      )}
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-urblue-600">
          {formatDate(item.date)}
        </p>
        <h3 className="font-display mt-2 text-[15px] font-semibold leading-snug text-ink-900">
          {item.title}
        </h3>
        <p
          className={`mt-2 text-sm leading-relaxed text-ink-600 ${
            clamp ? "line-clamp-3" : "whitespace-pre-line"
          }`}
        >
          {item.body}
        </p>
      </div>
    </article>
  );
}
