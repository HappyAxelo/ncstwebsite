"use client";

import { motion } from "framer-motion";

export default function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead: string;
}) {
  return (
    <section className="border-b border-mist-200 bg-mist-50 pb-12 pt-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-xs font-semibold uppercase tracking-[0.14em] text-urblue-600"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="font-display mt-3 max-w-3xl text-3xl font-semibold leading-tight text-ink-900 sm:text-4xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-600"
        >
          {lead}
        </motion.p>
      </div>
    </section>
  );
}
