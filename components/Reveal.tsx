"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const variants: Variants = {
  hidden: (dir: string) => ({
    opacity: 0,
    y: dir === "up" ? 22 : dir === "down" ? -22 : 0,
    x: dir === "left" ? 22 : dir === "right" ? -22 : 0,
  }),
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
  },
};

export default function Reveal({
  children,
  delay = 0,
  direction = "up",
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      custom={direction}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
