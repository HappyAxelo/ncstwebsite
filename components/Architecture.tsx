"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { architecture } from "@/lib/content";
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

const icons: Record<string, IconType> = {
  camera: HiOutlineCamera,
  acquisition: HiOutlinePhoto,
  processing: HiOutlineAdjustmentsHorizontal,
  cnn: HiOutlineCube,
  yolo: HiOutlineViewfinderCircle,
  classify: HiOutlineScale,
  reject: HiOutlineHandRaised,
  iot: HiOutlineWifi,
  cloud: HiOutlineCloud,
  lstm: HiOutlineArrowTrendingUp,
  dashboard: HiOutlineChartBar,
};

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

export default function Architecture() {
  const [active, setActive] = useState(architecture[4]);

  return (
    <section className="scroll-mt-20 border-y border-mist-200 bg-mist-50 py-16 sm:py-20" id="architecture">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="System architecture"
          title="From camera to decision"
          lead="Eleven connected components take each grain from the lens to the sorting mechanism, and each machine's data to the maintenance model. Select a component to see what it does."
        />

        <Reveal className="mt-10">
          <div className="card p-5 sm:p-7">
            <div className="flex flex-wrap items-center justify-center gap-y-2">
              {architecture.map((node, i) => {
                const Icon = icons[node.id];
                const isActive = active.id === node.id;
                return (
                  <div key={node.id} className="flex items-center">
                    <button
                      onClick={() => setActive(node)}
                      onMouseEnter={() => setActive(node)}
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
                    {i < architecture.length - 1 && (
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
                  key={active.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-urblue-50 text-xl text-urblue-600">
                    {(() => {
                      const Icon = icons[active.id];
                      return <Icon />;
                    })()}
                  </span>
                  <div>
                    <p className="font-display text-[15px] font-semibold text-ink-900">
                      {active.name}
                    </p>
                    <p className="mt-1 max-w-3xl text-sm leading-relaxed text-ink-600">
                      {active.detail}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-5 text-center text-xs text-ink-400">
            Hardware: NVIDIA Jetson Xavier NX / Orin Nano · ESP32 · Arduino Mega
            2560 · Impinj R700 RFID · DHT22 · HX711 · LoRa RAK3172
          </p>
        </Reveal>
      </div>
    </section>
  );
}
