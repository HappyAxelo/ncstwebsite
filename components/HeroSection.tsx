"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";
import CountUp from "@/components/CountUp";
import type { SiteContent } from "@/lib/content";

const Hero3D = dynamic(() => import("@/components/Hero3D"), {
  ssr: false,
  loading: () => null,
});

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function HeroSection({ home }: { home: SiteContent["home"] }) {
  return (
    <section className="relative overflow-hidden bg-urnavy-900">
      <div className="grid-lines-dark absolute inset-0 opacity-60" />

      {/* 3D conveyor scene */}
      <div className="absolute inset-x-0 bottom-0 top-0">
        <Hero3D />
      </div>
      {/* readability gradients */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-urnavy-900/90 via-urnavy-900/45 to-urnavy-900/20" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-urnavy-950/90 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-36 sm:pb-20 sm:pt-44">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          <motion.p
            variants={item}
            className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8fc1f7]"
          >
            {home.heroEyebrow}
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display mt-5 text-3xl font-semibold leading-[1.15] text-white sm:text-4xl lg:text-[2.9rem]"
          >
            {home.heroTitle}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/70"
          >
            {home.heroSubtitle}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/machine-vision"
              className="group inline-flex items-center gap-2 rounded-md bg-urblue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-urblue-700"
            >
              Explore the research
              <HiArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/#architecture"
              className="inline-flex items-center rounded-md border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/50"
            >
              How the system works
            </Link>
          </motion.div>
        </motion.div>

        {/* stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/15 bg-white/15 backdrop-blur-sm md:grid-cols-4"
        >
          {home.heroStats.map((s, i) => (
            <div key={i} className="bg-urnavy-900/70 px-5 py-4">
              <p className="font-display text-2xl font-semibold text-white">
                <CountUp value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-0.5 text-[13px] font-medium text-white/80">{s.label}</p>
              <p className="text-[11px] text-white/45">{s.hint}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
