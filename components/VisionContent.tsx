"use client";

import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import DetectionFeed from "@/components/DetectionFeed";
import { defectClasses } from "@/lib/content";
import {
  HiOutlineCamera,
  HiOutlineSparkles,
  HiOutlineCube,
  HiOutlineViewfinderCircle,
  HiOutlineScale,
  HiOutlineArrowsRightLeft,
} from "react-icons/hi2";

const steps = [
  {
    icon: HiOutlineCamera,
    title: "Image acquisition",
    desc: "High-resolution cameras photograph maize on the conveyor at key points in the line.",
  },
  {
    icon: HiOutlineSparkles,
    title: "Preprocessing",
    desc: "Frames are cleaned and segmented so each kernel can be analyzed separately.",
  },
  {
    icon: HiOutlineCube,
    title: "Feature extraction",
    desc: "A CNN learns what separates healthy maize from moldy, broken or discolored grain.",
  },
  {
    icon: HiOutlineViewfinderCircle,
    title: "YOLOv8 detection",
    desc: "The model reads the whole frame in one pass and locates every grain with a confidence score.",
  },
  {
    icon: HiOutlineScale,
    title: "Classification",
    desc: "Grains are marked accepted, rejected, or flagged for a person to review.",
  },
  {
    icon: HiOutlineArrowsRightLeft,
    title: "Sorting",
    desc: "A pneumatic mechanism removes rejected grain from the line automatically.",
  },
];

function Pipeline() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="The pipeline"
          title="Six steps from camera to decision"
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.07}>
              <div className="card card-hover h-full p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-urblue-50 text-xl text-urblue-600">
                    <s.icon />
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
          ))}
        </div>
      </div>
    </section>
  );
}

function LiveDemo() {
  return (
    <section className="border-y border-mist-200 bg-mist-50 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal direction="right">
            <div>
              <SectionHeading
                eyebrow="Real-time detection"
                title="Fast enough for a moving belt"
                lead="YOLOv8 reads the whole frame in a single pass, so it keeps up with a conveyor carrying 1,000 kg of maize per hour. Older methods like R-CNN and SSD scan region by region and cannot match production speed."
              />
              <Reveal delay={0.15}>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-600">
                  Clear defects trigger the reject mechanism automatically.
                  Borderline grains are flagged on the operator dashboard for
                  review, so people handle the judgment calls and the machine
                  handles the volume.
                </p>
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

function DefectGrain({ type, color }: { type: string; color: string }) {
  return (
    <svg viewBox="0 0 120 120" className="h-24 w-24">
      <defs>
        <radialGradient id={`g-${type}`} cx="0.35" cy="0.3" r="1">
          <stop offset="0%" stopColor="#f7dd9a" />
          <stop offset="100%" stopColor="#d9a441" />
        </radialGradient>
      </defs>
      {type === "Healthy" && (
        <ellipse cx="60" cy="60" rx="30" ry="42" fill={`url(#g-${type})`} stroke="#e5bc5e" strokeWidth="1.5" />
      )}
      {type === "Broken" && (
        <>
          <path d="M60 18 C77 18 90 38 90 60 L64 66 Z" fill={`url(#g-${type})`} stroke="#e5bc5e" />
          <path d="M56 70 L86 66 C82 92 72 102 60 102 C43 102 30 82 30 60 C30 44 37 30 48 23 Z" fill={`url(#g-${type})`} stroke="#e5bc5e" />
        </>
      )}
      {type.startsWith("Mold") && (
        <>
          <ellipse cx="60" cy="60" rx="30" ry="42" fill={`url(#g-${type})`} stroke="#8a6a3a" strokeWidth="1.5" />
          <circle cx="50" cy="48" r="7" fill="rgba(74,94,60,0.8)" />
          <circle cx="68" cy="66" r="9" fill="rgba(64,84,54,0.75)" />
          <circle cx="55" cy="80" r="5" fill="rgba(74,94,60,0.7)" />
        </>
      )}
      {type === "Discoloration" && (
        <>
          <ellipse cx="60" cy="60" rx="30" ry="42" fill="#b98a4e" stroke="#8a6a3a" strokeWidth="1.5" />
          <ellipse cx="66" cy="52" rx="14" ry="20" fill="rgba(120,72,32,0.55)" />
        </>
      )}
      {type === "Foreign object" && (
        <>
          <ellipse cx="44" cy="66" rx="20" ry="28" fill={`url(#g-${type})`} stroke="#e5bc5e" opacity="0.5" />
          <path d="M64 34 L92 44 L86 76 L58 70 Z" fill="#6b7280" stroke="#9ca3af" strokeWidth="1.5" />
          <path d="M68 42 L80 46" stroke="#d1d5db" strokeWidth="1.5" />
        </>
      )}
      <rect x="18" y="8" width="84" height="104" rx="6" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="6 4" />
    </svg>
  );
}

function DefectGallery() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Defect classes"
          title="What the model is trained to find"
          lead="The models are trained on thousands of maize images collected in Rwandan and Malawian facilities, so they recognize local grain varieties."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {defectClasses.map((d, i) => (
            <Reveal key={d.name} delay={i * 0.06}>
              <div className="card card-hover flex h-full flex-col items-center p-5 text-center">
                <DefectGrain type={d.name} color={d.color} />
                <p
                  className="mt-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide"
                  style={{ background: `${d.color}18`, color: d.color }}
                >
                  {d.verdict}
                </p>
                <h3 className="font-display mt-2.5 text-sm font-semibold text-ink-900">
                  {d.name}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-600">{d.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function VisionContent() {
  return (
    <>
      <Pipeline />
      <LiveDemo />
      <DefectGallery />
    </>
  );
}
