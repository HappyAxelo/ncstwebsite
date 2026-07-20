"use client";

import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import { problemStats } from "@/lib/content";

export default function ChallengeSection({ about }: { about: string }) {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="The problem"
              title="Manual grain inspection loses food, money and safety"
              lead={about}
            />
            <Reveal delay={0.15}>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-600">
                This project replaces guesswork with an affordable system built
                for small and medium enterprises: machine vision for sorting,
                IoT sensors for monitoring, and machine learning to keep
                equipment running.
              </p>
            </Reveal>
          </div>

          <div className="grid content-start gap-4 sm:grid-cols-3">
            {problemStats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="card card-hover h-full p-5">
                  <p className="font-display text-3xl font-semibold text-urblue-600">
                    <CountUp value={s.value} prefix={s.prefix ?? ""} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-[13px] leading-snug text-ink-600">{s.label}</p>
                  <p className="mt-2 text-[11px] font-medium uppercase tracking-wide text-ink-400">
                    {s.source}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
