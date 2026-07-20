import Link from "next/link";
import { project } from "@/lib/content";

const cols = [
  {
    title: "Research",
    links: [
      { href: "/machine-vision", label: "Machine Vision" },
      { href: "/maintenance", label: "Predictive Maintenance" },
      { href: "/impact", label: "Impact" },
    ],
  },
  {
    title: "Project",
    links: [
      { href: "/news", label: "News" },
      { href: "/team", label: "Team" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-20 bg-urnavy-900 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <p className="font-display text-base font-semibold">
            Machine Vision Research Project
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60">
            {project.fullTitle}. Hosted by the University of Rwanda with the
            University of Malawi as collaborating institution.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
              {c.title}
            </p>
            <ul className="mt-4 space-y-2.5">
              {c.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">
        © {new Date().getFullYear()} University of Rwanda · University of Malawi
      </div>
    </footer>
  );
}
