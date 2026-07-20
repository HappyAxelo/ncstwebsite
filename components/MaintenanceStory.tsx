"use client";

import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";

const scenario = [
  { value: 5, label: "Milling machines", sub: "3,000 kg of maize per day each" },
  { value: 2, label: "Breakdowns a month", sub: "Each causes a 12-hour delay" },
  { value: 2000, label: "kg of maize wasted", sub: "Per interruption" },
  { value: 600, suffix: "K RWF", label: "Lost every month", sub: "About $480" },
];

export default function MaintenanceStory() {
  return (
    <section className="border-t border-mist-200 bg-mist-50 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Case study · Musanze District"
          title="What one maize mill stands to gain"
          lead="From the project proposal: a milling facility in Rwanda's Musanze District, before and after predictive maintenance."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {scenario.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
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
              {[
                "Breakdowns drop from twice a month to about once every six months",
                "Over 10 million RWF (about $8,000) saved each year",
                "Production continues and deliveries reach markets on time",
              ].map((o) => (
                <div key={o} className="flex items-start gap-2.5">
                  <svg className="mt-0.5 h-5 w-5 shrink-0 text-leaf-600" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeOpacity="0.35" />
                    <path d="M6 10.2l2.6 2.6L14 7.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="text-sm leading-relaxed text-ink-600">{o}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 border-t border-mist-200 pt-4 text-sm leading-relaxed text-ink-600">
              The approach is proven at industrial scale. BMW and Volkswagen cut
              unexpected robotic-arm failures by over 25%, Boeing and GE
              Aviation reduced jet engine maintenance costs by up to 30%, and
              Siemens and Vestas raised wind farm efficiency by 20% using the
              same class of models.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
