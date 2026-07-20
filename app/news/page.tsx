import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import NewsCard from "@/components/NewsCard";
import { getNews } from "@/lib/store";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "News",
  description:
    "News and updates from the machine vision research project of the University of Rwanda and the University of Malawi.",
};

export default async function NewsPage() {
  const news = await getNews();

  return (
    <>
      <PageHeader
        eyebrow="News"
        title="Project news and updates"
        lead="Announcements, milestones and events from the research team."
      />
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-6">
          {news.length === 0 ? (
            <p className="text-sm text-ink-400">No news published yet.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {news.map((n) => (
                <NewsCard key={n.id} item={n} clamp={false} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
