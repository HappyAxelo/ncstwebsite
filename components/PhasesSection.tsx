"use client";

import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import type { SiteContent } from "@/lib/content";

export default function PhasesSection({ timeline }: { timeline: SiteContent["timeline"] }) {
  return (
    <section className="py-16 sm:py-20" id="roadmap">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={timeline.eyebrow} title={timeline.title} />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {timeline.phases.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="card card-hover relative h-full p-6">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-urblue-600">
                    {p.phase}
                  </p>
                  <span className="rounded-full bg-mist-50 px-2.5 py-1 text-[11px] font-medium text-ink-400 ring-1 ring-mist-200">
                    {p.months}
                  </span>
                </div>
                <h3 className="font-display mt-3 text-lg font-semibold text-ink-900">
                  {p.title}
                </h3>
                <ul className="mt-3 space-y-2">
                  {p.points.map((pt, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-ink-600">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-urblue-600" />
                      {pt}
                    </li>
                  ))}
                </ul>
                {i < timeline.phases.length - 1 && (
                  <span className="absolute -right-3 top-1/2 hidden h-px w-6 bg-urblue-600/40 md:block" />
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
