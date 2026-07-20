"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

function useLiveSeries(base: number, jitter: number, drift = 0, len = 40) {
  const [data, setData] = useState<number[]>(() =>
    Array.from({ length: len }, (_, i) => base + Math.sin(i / 4) * jitter * 0.5)
  );
  const tick = useRef(0);
  useEffect(() => {
    const id = setInterval(() => {
      tick.current += 1;
      setData((prev) => {
        const t = tick.current;
        const next =
          base +
          drift * t * 0.02 +
          Math.sin(t / 3.5) * jitter * 0.6 +
          (Math.random() - 0.5) * jitter;
        return [...prev.slice(1), next];
      });
    }, 900);
    return () => clearInterval(id);
  }, [base, jitter, drift]);
  return data;
}

function Sparkline({
  data,
  color,
  min,
  max,
}: {
  data: number[];
  color: string;
  min: number;
  max: number;
}) {
  const w = 220;
  const h = 52;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / (max - min)) * (h - 6) - 3;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-12 w-full" preserveAspectRatio="none">
      <polygon points={`0,${h} ${points} ${w},${h}`} fill={color} opacity="0.1" />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle
        cx={w}
        cy={h - ((data[data.length - 1] - min) / (max - min)) * (h - 6) - 3}
        r="2.8"
        fill={color}
      >
        <animate attributeName="opacity" values="1;0.3;1" dur="1.4s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function RULGauge({ value }: { value: number }) {
  const angle = (value / 100) * 260 - 130;
  const r = 74;
  const arc = (deg: number) => {
    const rad = ((deg - 90) * Math.PI) / 180;
    return { x: 90 + r * Math.cos(rad), y: 90 + r * Math.sin(rad) };
  };
  const start = arc(-130);
  const end = arc(130);
  const needleEnd = arc(angle);

  return (
    <svg viewBox="0 0 180 150" className="mx-auto w-full max-w-[220px]">
      <defs>
        <linearGradient id="gaugeGrad" x1="0" y1="1" x2="1" y2="1">
          <stop offset="0%" stopColor="#d64545" />
          <stop offset="45%" stopColor="#e8a020" />
          <stop offset="100%" stopColor="#2f9e6e" />
        </linearGradient>
      </defs>
      <path
        d={`M ${start.x} ${start.y} A ${r} ${r} 0 1 1 ${end.x} ${end.y}`}
        fill="none"
        stroke="#e3ebf4"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <motion.path
        d={`M ${start.x} ${start.y} A ${r} ${r} 0 1 1 ${end.x} ${end.y}`}
        fill="none"
        stroke="url(#gaugeGrad)"
        strokeWidth="12"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: value / 100 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
      <line
        x1="90"
        y1="90"
        x2={needleEnd.x}
        y2={needleEnd.y}
        stroke="#2c2d3f"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="90" cy="90" r="5" fill="#1a76d1" />
      <text x="90" y="126" textAnchor="middle" fill="#2c2d3f" fontSize="20" fontWeight="600">
        {Math.round((value / 100) * 380)}h
      </text>
      <text x="90" y="142" textAnchor="middle" fill="#8593a3" fontSize="9" letterSpacing="2">
        ESTIMATED REMAINING USEFUL LIFE
      </text>
    </svg>
  );
}

const stages = [
  { label: "Healthy", color: "#2f9e6e", desc: "Normal vibration and temperature" },
  { label: "Warning", color: "#e8a020", desc: "Readings drift from the learned baseline" },
  { label: "Critical", color: "#d64545", desc: "Failure probability crosses the threshold" },
  { label: "Maintenance", color: "#1a76d1", desc: "Service scheduled before breakdown" },
];

function HealthTimeline() {
  return (
    <div className="card p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-urblue-600">
        How a failure is intercepted
      </p>
      <div className="mt-6 flex flex-col sm:flex-row">
        {stages.map((s, i) => (
          <div key={s.label} className="relative flex flex-1 gap-4 sm:flex-col sm:gap-0">
            {i < stages.length - 1 && (
              <span
                className="absolute left-[11px] top-8 h-[calc(100%-8px)] w-px sm:left-[calc(50%+18px)] sm:top-[11px] sm:h-px sm:w-[calc(100%-36px)]"
                style={{ background: `${s.color}55` }}
              />
            )}
            <span
              className="relative z-10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full sm:mx-auto"
              style={{ background: `${s.color}1a`, border: `1.5px solid ${s.color}` }}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
            </span>
            <div className="pb-6 sm:px-3 sm:pb-0 sm:pt-3 sm:text-center">
              <p className="text-sm font-semibold" style={{ color: s.color }}>
                {s.label}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-ink-600">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MaintenanceDashboard() {
  const temp = useLiveSeries(64, 3, 0.4);
  const vib = useLiveSeries(4.2, 1.1, 0.25);
  const power = useLiveSeries(11.4, 0.9);

  const health = 76;

  const sensors = useMemo(
    () => [
      { name: "Temperature", unit: "°C", data: temp, color: "#e8a020", min: 50, max: 90, value: temp[temp.length - 1] },
      { name: "Vibration", unit: "mm/s", data: vib, color: "#1a76d1", min: 0, max: 12, value: vib[vib.length - 1] },
      { name: "Power draw", unit: "kW", data: power, color: "#00628b", min: 8, max: 15, value: power[power.length - 1] },
    ],
    [temp, vib, power]
  );

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Dashboard preview"
          title="The machine's vital signs in one view"
          lead="A simulation of the operator dashboard. IoT sensors stream temperature, vibration and power data into an LSTM model that estimates when each machine will need service."
        />

        <Reveal className="mt-10">
          <div className="card overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-mist-200 bg-mist-50 px-6 py-3.5">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute h-full w-full animate-ping rounded-full bg-leaf-600 opacity-50" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-leaf-600" />
                </span>
                <p className="text-xs font-semibold text-ink-900">
                  Maize mill · Milling motor 03
                </p>
              </div>
              <p className="text-[11px] text-ink-400">Simulated data</p>
            </div>

            <div className="grid gap-5 p-6 lg:grid-cols-[1.5fr_1fr]">
              <div className="space-y-4">
                {sensors.map((s) => (
                  <div key={s.name} className="rounded-lg border border-mist-200 p-4">
                    <div className="flex items-baseline justify-between">
                      <p className="text-xs font-medium uppercase tracking-wide text-ink-400">
                        {s.name}
                      </p>
                      <p className="font-display text-lg font-semibold" style={{ color: s.color }}>
                        {s.value.toFixed(1)}
                        <span className="ml-1 text-xs font-normal text-ink-400">{s.unit}</span>
                      </p>
                    </div>
                    <div className="mt-2">
                      <Sparkline data={s.data} color={s.color} min={s.min} max={s.max} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4">
                <div className="rounded-lg border border-mist-200 p-4">
                  <RULGauge value={health} />
                </div>
                <div className="rounded-lg border border-mist-200 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium uppercase tracking-wide text-ink-400">
                      Health score
                    </p>
                    <p className="font-display text-lg font-semibold text-leaf-600">{health}%</p>
                  </div>
                  <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-mist-50 ring-1 ring-mist-200">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-urblue-600 to-leaf-600"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${health}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>
                <div className="flex-1 rounded-lg border border-mist-200 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-ink-400">
                    Alerts
                  </p>
                  <div className="mt-2.5 space-y-2">
                    {[
                      { t: "Bearing wear pattern on motor 03", tone: "#e8a020" },
                      { t: "Service scheduled ahead of predicted failure", tone: "#1a76d1" },
                      { t: "Other motors running normally", tone: "#2f9e6e" },
                    ].map((a) => (
                      <div key={a.t} className="flex items-start gap-2.5 rounded-md bg-mist-50 p-2.5">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: a.tone }} />
                        <p className="text-xs leading-snug text-ink-600">{a.t}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-6">
          <Reveal>
            <HealthTimeline />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
