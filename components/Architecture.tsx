"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import type { SiteContent } from "@/lib/content";
import {
  HiOutlineCamera,
  HiOutlinePhoto,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineCube,
  HiOutlineViewfinderCircle,
  HiOutlineScale,
  HiOutlineHandRaised,
  HiOutlineWifi,
  HiOutlineCloud,
  HiOutlineArrowTrendingUp,
  HiOutlineChartBar,
} from "react-icons/hi2";
import type { IconType } from "react-icons";

// Icons are assigned by position; extra nodes cycle through the list.
const iconList: IconType[] = [
  HiOutlineCamera,
  HiOutlinePhoto,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineCube,
  HiOutlineViewfinderCircle,
  HiOutlineScale,
  HiOutlineHandRaised,
  HiOutlineWifi,
  HiOutlineCloud,
  HiOutlineArrowTrendingUp,
  HiOutlineChartBar,
];
const iconFor = (i: number) => iconList[i % iconList.length];

function Connector() {
  return (
    <svg className="h-3 w-6 shrink-0" viewBox="0 0 24 8" aria-hidden>
      <line
        x1="0"
        y1="4"
        x2="24"
        y2="4"
        stroke="#1a76d1"
        strokeOpacity="0.45"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        className="animate-dash-flow"
      />
    </svg>
  );
}

export default function Architecture({ arch }: { arch: SiteContent["architecture"] }) {
  const [active, setActive] = useState(Math.min(4, arch.nodes.length - 1));
  const activeNode = arch.nodes[active] ?? arch.nodes[0];
  const ActiveIcon = iconFor(active);

  return (
    <section className="scroll-mt-20 border-y border-mist-200 bg-mist-50 py-16 sm:py-20" id="architecture">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={arch.eyebrow} title={arch.title} lead={arch.lead} />

        <Reveal className="mt-10">
          <div className="card p-5 sm:p-7">
            <div className="flex flex-wrap items-center justify-center gap-y-2">
              {arch.nodes.map((node, i) => {
                const Icon = iconFor(i);
                const isActive = active === i;
                return (
                  <div key={i} className="flex items-center">
                    <button
                      onClick={() => setActive(i)}
                      onMouseEnter={() => setActive(i)}
                      className={`flex flex-col items-center gap-1.5 rounded-xl px-3 py-2.5 transition-colors duration-200 ${
                        isActive
                          ? "bg-urblue-50 text-urblue-600 ring-1 ring-urblue-600/30"
                          : "text-ink-400 hover:bg-mist-50 hover:text-ink-600"
                      }`}
                    >
                      <span className="text-xl">
                        <Icon />
                      </span>
                      <span
                        className={`whitespace-nowrap text-[11px] font-medium ${
                          isActive ? "text-urblue-700" : "text-ink-600"
                        }`}
                      >
                        {node.name}
                      </span>
                    </button>
                    {i < arch.nodes.length - 1 && (
                      <span className="hidden sm:block">
                        <Connector />
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-5 border-t border-mist-200 pt-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-urblue-50 text-xl text-urblue-600">
                    <ActiveIcon />
                  </span>
                  <div>
                    <p className="font-display text-[15px] font-semibold text-ink-900">
                      {activeNode.name}
                    </p>
                    <p className="mt-1 max-w-3xl text-sm leading-relaxed text-ink-600">
                      {activeNode.detail}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-5 text-center text-xs text-ink-400">{arch.hardwareNote}</p>
        </Reveal>
      </div>
    </section>
  );
}
