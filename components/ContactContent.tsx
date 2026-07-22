"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import type { SiteContent } from "@/lib/content";
import {
  HiOutlineMapPin,
  HiOutlineBuildingLibrary,
  HiOutlinePaperAirplane,
} from "react-icons/hi2";

const fieldCls =
  "w-full rounded-lg border border-mist-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 outline-none transition-colors focus:border-urblue-600 focus:ring-2 focus:ring-urblue-600/15";

export default function ContactContent({ contact }: { contact: SiteContent["contact"] }) {
  const email = contact.email;
  const institutions = contact.institutions;
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", org: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Machine vision research project: inquiry from ${form.name}${form.org ? ` (${form.org})` : ""}`
    );
    const body = encodeURIComponent(`${form.message}\n\n${form.name}\n${form.email}\n${form.org}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section className="py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
          <div className="space-y-4">
            {institutions.map((inst, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="card card-hover p-5">
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-urblue-50 text-lg text-urblue-600">
                      <HiOutlineBuildingLibrary />
                    </span>
                    <div>
                      <h3 className="font-display text-[15px] font-semibold text-ink-900">
                        {inst.name}
                      </h3>
                      <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-urblue-600">
                        {inst.role}
                      </p>
                      <p className="mt-2 flex items-center gap-1.5 text-sm text-ink-600">
                        <HiOutlineMapPin className="text-ink-400" /> {inst.where}
                      </p>
                      <p className="mt-0.5 text-sm text-ink-600">{inst.lead}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal delay={0.12}>
              <div className="card overflow-hidden">
                <iframe
                  title="University of Rwanda, Kigali"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=29.95%2C-2.05%2C30.25%2C-1.85&layer=mapnik&marker=-1.9536%2C30.0929"
                  className="h-56 w-full border-0"
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>

          <Reveal direction="left" delay={0.08}>
            <div className="card h-full p-6 sm:p-8">
              <h2 className="font-display text-xl font-semibold text-ink-900">
                {contact.formTitle}
              </h2>
              <p className="mt-1.5 text-sm text-ink-600">{contact.formLead}</p>

              {sent ? (
                <div className="mt-8 rounded-lg border border-leaf-600/30 bg-leaf-600/5 p-6 text-center">
                  <p className="font-display text-base font-semibold text-leaf-600">
                    Your email draft is ready
                  </p>
                  <p className="mt-2 text-sm text-ink-600">
                    Your mail client should have opened with the message
                    pre-filled, addressed to {email}.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-4 text-sm font-semibold text-urblue-600 hover:underline"
                  >
                    Compose another
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="mt-6 space-y-3.5">
                  <div className="grid gap-3.5 sm:grid-cols-2">
                    <input
                      required
                      placeholder="Full name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={fieldCls}
                    />
                    <input
                      required
                      type="email"
                      placeholder="Email address"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={fieldCls}
                    />
                  </div>
                  <input
                    placeholder="Organization"
                    value={form.org}
                    onChange={(e) => setForm({ ...form, org: e.target.value })}
                    className={fieldCls}
                  />
                  <textarea
                    required
                    rows={5}
                    placeholder="How would you like to collaborate?"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${fieldCls} resize-none`}
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-lg bg-urblue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-urblue-700"
                  >
                    Send message
                    <HiOutlinePaperAirplane />
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
