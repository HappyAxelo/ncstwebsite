"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Detection = {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  conf: number;
  ok: boolean;
};

const FRAMES: Detection[][] = [
  [
    { x: 12, y: 18, w: 22, h: 26, label: "healthy", conf: 98.2, ok: true },
    { x: 46, y: 30, w: 20, h: 24, label: "mold", conf: 96.8, ok: false },
    { x: 72, y: 14, w: 19, h: 24, label: "healthy", conf: 97.5, ok: true },
    { x: 60, y: 62, w: 21, h: 26, label: "healthy", conf: 99.1, ok: true },
  ],
  [
    { x: 8, y: 44, w: 20, h: 25, label: "broken", conf: 94.6, ok: false },
    { x: 38, y: 12, w: 21, h: 26, label: "healthy", conf: 98.8, ok: true },
    { x: 66, y: 40, w: 22, h: 27, label: "healthy", conf: 97.9, ok: true },
    { x: 30, y: 60, w: 19, h: 24, label: "discolored", conf: 92.4, ok: false },
  ],
  [
    { x: 18, y: 26, w: 21, h: 25, label: "healthy", conf: 99.3, ok: true },
    { x: 48, y: 52, w: 20, h: 25, label: "foreign obj", conf: 97.1, ok: false },
    { x: 74, y: 30, w: 19, h: 24, label: "healthy", conf: 98.4, ok: true },
    { x: 42, y: 8, w: 20, h: 24, label: "healthy", conf: 96.9, ok: true },
  ],
];

function GrainShape({ ok }: { ok: boolean }) {
  return (
    <svg viewBox="0 0 40 48" className="h-full w-full">
      <ellipse
        cx="20"
        cy="24"
        rx="13"
        ry="18"
        fill={ok ? "url(#grainOk)" : "url(#grainBad)"}
        stroke={ok ? "#f5cf6f" : "#8a6a3a"}
        strokeWidth="1"
      />
      <path d="M20 8 Q23 24 20 40" stroke="rgba(0,0,0,0.25)" strokeWidth="1.4" fill="none" />
      {!ok && (
        <>
          <circle cx="15" cy="20" r="2.6" fill="rgba(60,40,20,0.55)" />
          <circle cx="24" cy="30" r="3.4" fill="rgba(60,40,20,0.45)" />
        </>
      )}
      <defs>
        <radialGradient id="grainOk" cx="0.35" cy="0.3" r="1">
          <stop offset="0%" stopColor="#f7dd9a" />
          <stop offset="100%" stopColor="#d9a441" />
        </radialGradient>
        <radialGradient id="grainBad" cx="0.35" cy="0.3" r="1">
          <stop offset="0%" stopColor="#cfae72" />
          <stop offset="100%" stopColor="#8f6f3d" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export default function DetectionFeed() {
  const [frame, setFrame] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setFrame((f) => (f + 1) % FRAMES.length);
      setTick((t) => t + 1);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  const detections = FRAMES[frame];
  const rejected = detections.filter((d) => !d.ok).length;

  return (
    <div className="overflow-hidden rounded-xl border border-mist-200 bg-urnavy-900 p-4 shadow-[0_18px_44px_-24px_rgba(20,60,110,0.45)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
          </span>
          <span className="font-mono text-[10px] tracking-[0.18em] text-white/70">
            DETECTION DEMO
          </span>
        </div>
        <span className="font-mono text-[10px] text-[#8fc1f7]">YOLOv8 · CAM-01</span>
      </div>

      <div className="relative mt-3 aspect-[4/3] overflow-hidden rounded-lg border border-white/10 bg-urnavy-950">
        <div className="grid-lines-dark absolute inset-0 opacity-70" />
        <div className="absolute inset-x-0 top-0 h-10 w-full animate-scan">
          <div className="h-px w-full bg-[#7cc0ff] shadow-[0_0_16px_2px_rgba(124,192,255,0.6)]" />
        </div>

        <div key={tick} className="absolute inset-0">
          {detections.map((d, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${d.x}%`,
                top: `${d.y}%`,
                width: `${d.w}%`,
                height: `${d.h}%`,
              }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute inset-[14%]">
                <GrainShape ok={d.ok} />
              </div>
              <motion.div
                className="absolute inset-0 rounded border"
                style={{
                  borderColor: d.ok ? "#34d399" : "#f87171",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.12 }}
              />
              <motion.span
                className="font-mono absolute -top-4 left-0 whitespace-nowrap rounded-sm px-1 text-[8px] font-semibold leading-4"
                style={{
                  background: d.ok ? "#34d399" : "#f87171",
                  color: "#0f1b2e",
                }}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + i * 0.12 }}
              >
                {d.label} {d.conf.toFixed(1)}%
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="font-mono mt-3 grid grid-cols-3 gap-2 text-center text-[10px]">
        <div className="rounded bg-white/5 px-2 py-1.5">
          <p className="text-white/40">SCANNED</p>
          <p className="mt-0.5 text-[#8fc1f7]">{detections.length}</p>
        </div>
        <div className="rounded bg-white/5 px-2 py-1.5">
          <p className="text-white/40">ACCEPTED</p>
          <p className="mt-0.5 text-emerald-400">{detections.length - rejected}</p>
        </div>
        <div className="rounded bg-white/5 px-2 py-1.5">
          <p className="text-white/40">REJECTED</p>
          <p className="mt-0.5 text-orange-400">{rejected}</p>
        </div>
      </div>
      <p className="mt-2 text-center text-[10px] text-white/35">
        Illustration of the live inspection view. Values shown are examples.
      </p>
    </div>
  );
}
