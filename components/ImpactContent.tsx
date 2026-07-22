"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import type { SiteContent } from "@/lib/content";
import {
  HiOutlineDocumentText,
  HiOutlineCircleStack,
  HiOutlineCodeBracket,
  HiOutlineShieldCheck,
  HiOutlineAcademicCap,
  HiOutlinePresentationChartLine,
  HiOutlineBuildingLibrary,
  HiOutlineBeaker,
  HiOutlinePlus,
} from "react-icons/hi2";
import type { IconType } from "react-icons";

// Output icons assigned by position; extra outputs cycle through the list.
const outputIconList: IconType[] = [
  HiOutlineDocumentText,
  HiOutlineCircleStack,
  HiOutlineCodeBracket,
  HiOutlineShieldCheck,
  HiOutlineAcademicCap,
  HiOutlinePresentationChartLine,
  HiOutlineBuildingLibrary,
  HiOutlineBeaker,
];

function ImpactCounters({ impact }: { impact: SiteContent["impact"] }) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow={impact.countersEyebrow}
          title={impact.countersTitle}
          lead={impact.countersLead}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {impact.stats.map((s, i) => (
            <Reveal key={i} delay={(i % 3) * 0.07}>
              <div className="card card-hover h-full p-6">
                <p className="font-display text-4xl font-semibold text-urblue-600">
                  <CountUp value={s.value} prefix={s.prefix ?? ""} suffix={s.suffix} />
                </p>
                <p className="font-display mt-2 text-[15px] font-semibold text-ink-900">
                  {s.label}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{s.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="card mt-5 grid gap-6 p-6 sm:grid-cols-4 sm:p-7">
            {impact.qualitative.map((x, i) => (
              <div key={i}>
                <p className="font-display text-sm font-semibold text-urdeep-700">{x.t}</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink-600">{x.d}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Questions({ impact }: { impact: SiteContent["impact"] }) {
  return (
    <section className="border-y border-mist-200 bg-mist-50 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={impact.questionsEyebrow} title={impact.questionsTitle} />
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {impact.questions.map((q, i) => (
            <Reveal key={i} delay={(i % 2) * 0.06}>
              <div className="card flex items-start gap-3.5 p-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-urblue-50 text-xs font-bold text-urblue-600">
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed text-ink-600">{q}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function OutputsGrid({ impact }: { impact: SiteContent["impact"] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="py-16" id="outputs">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow={impact.outputsEyebrow}
          title={impact.outputsTitle}
          lead={impact.outputsLead}
        />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {impact.outputs.map((o, i) => {
            const Icon = outputIconList[i % outputIconList.length];
            const open = openIdx === i;
            return (
              <Reveal key={i} delay={(i % 4) * 0.05}>
                <button
                  onClick={() => setOpenIdx(open ? null : i)}
                  className={`card card-hover w-full p-5 text-left ${
                    open ? "border-urblue-600/40 bg-urblue-50/40" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-lg text-lg ${
                        open ? "bg-urblue-600 text-white" : "bg-urblue-50 text-urblue-600"
                      }`}
                    >
                      <Icon />
                    </span>
                    <motion.span animate={{ rotate: open ? 45 : 0 }} className="text-ink-400">
                      <HiOutlinePlus />
                    </motion.span>
                  </div>
                  <p className="font-display mt-3.5 text-sm font-semibold text-ink-900">
                    {o.title}
                  </p>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-1.5 overflow-hidden text-[13px] leading-relaxed text-ink-600"
                      >
                        {o.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function ImpactContent({ impact }: { impact: SiteContent["impact"] }) {
  return (
    <>
      <ImpactCounters impact={impact} />
      <Questions impact={impact} />
      <OutputsGrid impact={impact} />
    </>
  );
}
