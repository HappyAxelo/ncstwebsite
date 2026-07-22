import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import ChallengeSection from "@/components/ChallengeSection";
import Architecture from "@/components/Architecture";
import PhasesSection from "@/components/PhasesSection";
import NewsCard from "@/components/NewsCard";
import SectionHeading from "@/components/SectionHeading";
import { getNews, getContent } from "@/lib/store";

export const revalidate = 300;

export default async function Home() {
  const [news, content] = await Promise.all([getNews(), getContent()]);
  const latest = news.slice(0, 3);

  return (
    <>
      <HeroSection home={content.home} />
      <ChallengeSection home={content.home} />
      <Architecture arch={content.architecture} />
      <PhasesSection timeline={content.timeline} />

      {latest.length > 0 && (
        <section className="border-t border-mist-200 bg-mist-50 py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex items-end justify-between">
              <SectionHeading eyebrow="News" title="Latest from the project" />
              <Link
                href="/news"
                className="hidden text-sm font-semibold text-urblue-600 hover:text-urblue-700 sm:block"
              >
                All news →
              </Link>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {latest.map((n) => (
                <NewsCard key={n.id} item={n} />
              ))}
            </div>
            <Link
              href="/news"
              className="mt-6 inline-block text-sm font-semibold text-urblue-600 sm:hidden"
            >
              All news →
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
