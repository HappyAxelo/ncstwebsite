"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import type { Collaborator, Partner } from "@/lib/store";
import { HiOutlineUserGroup, HiOutlineGlobeAlt, HiOutlineAcademicCap } from "react-icons/hi2";

function initials(name: string) {
  return name
    .replace(/^Dr\.?\s+/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function Photo({ person, size }: { person: Collaborator; size: "lg" | "md" }) {
  const cls = size === "lg" ? "h-24 w-24 text-xl" : "h-14 w-14 text-sm";
  if (person.photo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={person.photo}
        alt={person.name}
        className={`${cls} rounded-xl object-cover ring-1 ring-mist-200`}
      />
    );
  }
  return (
    <div
      className={`${cls} flex items-center justify-center rounded-xl bg-urblue-50 font-semibold text-urblue-600 ring-1 ring-urblue-600/15`}
    >
      <span className="font-display">{initials(person.name)}</span>
    </div>
  );
}

export default function TeamContent({
  collaborators,
  partners,
}: {
  collaborators: Collaborator[];
  partners: Partner[];
}) {
  const leads = collaborators.filter((c) => /principal investigator$/i.test(c.role) && !/co-/i.test(c.role));
  const others = collaborators.filter((c) => !leads.includes(c));

  return (
    <>
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading eyebrow="Principal investigators" title="Project leadership" />
          <div className="mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
            {leads.map((m, i) => (
              <Reveal key={m.id} delay={i * 0.08}>
                <div className="card card-hover flex h-full items-center gap-5 p-6">
                  <Photo person={m} size="lg" />
                  <div>
                    <h3 className="font-display text-base font-semibold text-ink-900">{m.name}</h3>
                    <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-urblue-600">
                      {m.role}
                    </p>
                    <p className="mt-1 text-sm text-ink-600">{m.org}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-12">
            <SectionHeading eyebrow="Co-investigators" title="The research team" />
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="card card-hover flex items-center gap-4 p-4"
                >
                  <Photo person={m} size="md" />
                  <div>
                    <p className="text-sm font-semibold text-ink-900">{m.name}</p>
                    <p className="mt-0.5 text-xs text-ink-600">{m.role}</p>
                    <p className="text-xs text-ink-400">{m.org}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-mist-200 bg-mist-50 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Partners"
            title="Industry, government and international collaboration"
            lead="Researchers spend 40 to 50% of their time at industry premises, developing and testing the systems where they will actually run."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((p, i) => (
              <Reveal key={p.name} delay={(i % 3) * 0.06}>
                <div className="card card-hover flex h-full items-start gap-3.5 p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-urblue-50 text-lg text-urdeep-700">
                    {i < 2 ? <HiOutlineUserGroup /> : i < 4 ? <HiOutlineGlobeAlt /> : <HiOutlineAcademicCap />}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink-900">{p.name}</p>
                    <p className="mt-0.5 text-xs text-ink-400">{p.type}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="card mt-5 grid gap-6 p-6 sm:grid-cols-3">
              {[
                {
                  v: "Postgraduate assistantships",
                  l: "Students join system development, testing and deployment.",
                },
                {
                  v: "Two research labs",
                  l: "AI and IoT labs established at UR and UNIMA.",
                },
                {
                  v: "Industry training",
                  l: "Workshops for operators on running and maintaining the systems.",
                },
              ].map((x) => (
                <div key={x.v}>
                  <p className="font-display text-sm font-semibold text-urdeep-700">{x.v}</p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-ink-600">{x.l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
