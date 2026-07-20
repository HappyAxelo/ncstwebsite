import Reveal from "@/components/Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "center" | "left";
}) {
  const alignCls = align === "center" ? "mx-auto text-center" : "text-left";
  return (
    <div className={`max-w-2xl ${alignCls}`}>
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-urblue-600">
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="font-display mt-3 text-2xl font-semibold leading-snug text-ink-900 sm:text-3xl">
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.12}>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-600">{lead}</p>
        </Reveal>
      )}
    </div>
  );
}
