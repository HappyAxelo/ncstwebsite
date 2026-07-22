"use client";

import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import DetectionFeed from "@/components/DetectionFeed";
import { defectColors, type SiteContent } from "@/lib/content";
import {
  HiOutlineCamera,
  HiOutlineSparkles,
  HiOutlineCube,
  HiOutlineViewfinderCircle,
  HiOutlineScale,
  HiOutlineArrowsRightLeft,
} from "react-icons/hi2";
import type { IconType } from "react-icons";

// Step icons assigned by position; extra steps cycle through the list.
const stepIcons: IconType[] = [
  HiOutlineCamera,
  HiOutlineSparkles,
  HiOutlineCube,
  HiOutlineViewfinderCircle,
  HiOutlineScale,
  HiOutlineArrowsRightLeft,
];

function Pipeline({ mv }: { mv: SiteContent["machineVision"] }) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={mv.pipelineEyebrow} title={mv.pipelineTitle} />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mv.steps.map((s, i) => {
            const Icon = stepIcons[i % stepIcons.length];
            return (
              <Reveal key={i} delay={(i % 3) * 0.07}>
                <div className="card card-hover h-full p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-urblue-50 text-xl text-urblue-600">
                      <Icon />
                    </span>
                    <span className="text-xs font-semibold text-ink-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-display mt-4 text-[15px] font-semibold text-ink-900">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{s.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function LiveDemo({ mv }: { mv: SiteContent["machineVision"] }) {
  return (
    <section className="border-y border-mist-200 bg-mist-50 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal direction="right">
            <div>
              <SectionHeading eyebrow={mv.demoEyebrow} title={mv.demoTitle} lead={mv.demoLead} />
              <Reveal delay={0.15}>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-600">{mv.demoBody}</p>
              </Reveal>
            </div>
          </Reveal>
          <Reveal direction="left" delay={0.1}>
            <DetectionFeed />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// Illustration is chosen by position so renaming a defect keeps its drawing.
function DefectGrain({ index, color }: { index: number; color: string }) {
  const id = `grain-${index}`;
  return (
    <svg viewBox="0 0 120 120" className="h-24 w-24">
      <defs>
        <radialGradient id={id} cx="0.35" cy="0.3" r="1">
          <stop offset="0%" stopColor="#f7dd9a" />
          <stop offset="100%" stopColor="#d9a441" />
        </radialGradient>
      </defs>
      {index === 0 && (
        <ellipse cx="60" cy="60" rx="30" ry="42" fill={`url(#${id})`} stroke="#e5bc5e" strokeWidth="1.5" />
      )}
      {index === 1 && (
        <>
          <path d="M60 18 C77 18 90 38 90 60 L64 66 Z" fill={`url(#${id})`} stroke="#e5bc5e" />
          <path d="M56 70 L86 66 C82 92 72 102 60 102 C43 102 30 82 30 60 C30 44 37 30 48 23 Z" fill={`url(#${id})`} stroke="#e5bc5e" />
        </>
      )}
      {index === 2 && (
        <>
          <ellipse cx="60" cy="60" rx="30" ry="42" fill={`url(#${id})`} stroke="#8a6a3a" strokeWidth="1.5" />
          <circle cx="50" cy="48" r="7" fill="rgba(74,94,60,0.8)" />
          <circle cx="68" cy="66" r="9" fill="rgba(64,84,54,0.75)" />
          <circle cx="55" cy="80" r="5" fill="rgba(74,94,60,0.7)" />
        </>
      )}
      {index === 3 && (
        <>
          <ellipse cx="60" cy="60" rx="30" ry="42" fill="#b98a4e" stroke="#8a6a3a" strokeWidth="1.5" />
          <ellipse cx="66" cy="52" rx="14" ry="20" fill="rgba(120,72,32,0.55)" />
        </>
      )}
      {index >= 4 && (
        <>
          <ellipse cx="44" cy="66" rx="20" ry="28" fill={`url(#${id})`} stroke="#e5bc5e" opacity="0.5" />
          <path d="M64 34 L92 44 L86 76 L58 70 Z" fill="#6b7280" stroke="#9ca3af" strokeWidth="1.5" />
          <path d="M68 42 L80 46" stroke="#d1d5db" strokeWidth="1.5" />
        </>
      )}
      <rect x="18" y="8" width="84" height="104" rx="6" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="6 4" />
    </svg>
  );
}

function DefectGallery({ mv }: { mv: SiteContent["machineVision"] }) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={mv.defectsEyebrow} title={mv.defectsTitle} lead={mv.defectsLead} />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {mv.defects.map((d, i) => {
            const color = defectColors[i % defectColors.length];
            return (
              <Reveal key={i} delay={i * 0.06}>
                <div className="card card-hover flex h-full flex-col items-center p-5 text-center">
                  <DefectGrain index={i} color={color} />
                  <p
                    className="mt-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide"
                    style={{ background: `${color}18`, color }}
                  >
                    {d.verdict}
                  </p>
                  <h3 className="font-display mt-2.5 text-sm font-semibold text-ink-900">
                    {d.name}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-600">{d.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function VisionContent({ mv }: { mv: SiteContent["machineVision"] }) {
  return (
    <>
      <Pipeline mv={mv} />
      <LiveDemo mv={mv} />
      <DefectGallery mv={mv} />
    </>
  );
}
