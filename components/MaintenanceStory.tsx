"use client";

import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import type { SiteContent } from "@/lib/content";

export default function MaintenanceStory({ m }: { m: SiteContent["maintenance"] }) {
  return (
    <section className="border-t border-mist-200 bg-mist-50 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={m.caseEyebrow} title={m.caseTitle} lead={m.caseLead} />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {m.scenario.map((s, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="card card-hover h-full p-5">
                <p className="font-display text-2xl font-semibold text-ink-900">
                  <CountUp value={s.value} suffix={s.suffix ?? ""} />
                </p>
                <p className="mt-1.5 text-sm font-medium text-ink-900">{s.label}</p>
                <p className="mt-0.5 text-xs text-ink-400">{s.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="card mt-5 p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-leaf-600">
              With LSTM predictive maintenance
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {m.outcomes.map((o, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <svg className="mt-0.5 h-5 w-5 shrink-0 text-leaf-600" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeOpacity="0.35" />
                    <path d="M6 10.2l2.6 2.6L14 7.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="text-sm leading-relaxed text-ink-600">{o}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 border-t border-mist-200 pt-4 text-sm leading-relaxed text-ink-600">
              {m.industryNote}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
