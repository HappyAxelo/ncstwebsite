"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineMenuAlt4, HiOutlineX } from "react-icons/hi";

const links = [
  { href: "/", label: "Home" },
  { href: "/machine-vision", label: "Machine Vision" },
  { href: "/maintenance", label: "Maintenance" },
  { href: "/impact", label: "Impact" },
  { href: "/news", label: "News" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-urblue-600">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="4" stroke="#fff" strokeWidth="1.6" />
          <circle cx="12" cy="12" r="3" fill="#fff" />
          <path d="M12 5v2M12 17v2M5 12h2M17 12h2" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </span>
      <span className="leading-tight">
        <span className="font-display block text-[13px] font-semibold text-ink-900">
          Machine Vision Research
        </span>
        <span className="block text-[11px] text-ink-400">
          University of Rwanda · University of Malawi
        </span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-white/90 backdrop-blur transition-shadow duration-300 ${
        scrolled ? "border-mist-200 shadow-[0_4px_18px_-12px_rgba(20,60,110,0.25)]" : "border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`rounded-md px-3 py-2 text-[13.5px] font-medium transition-colors ${
                    active
                      ? "text-urblue-600"
                      : "text-ink-600 hover:text-urblue-600"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
          <li className="ml-2">
            <Link
              href="/contact"
              className="rounded-md bg-urblue-600 px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-urblue-700"
            >
              Partner with us
            </Link>
          </li>
        </ul>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="flex h-9 w-9 items-center justify-center rounded-md border border-mist-200 text-ink-600 lg:hidden"
        >
          {open ? <HiOutlineX size={18} /> : <HiOutlineMenuAlt4 size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-mist-200 bg-white lg:hidden"
          >
            <ul className="px-4 py-3">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`block rounded-md px-3 py-2.5 text-sm font-medium ${
                      pathname === l.href ? "bg-urblue-50 text-urblue-600" : "text-ink-600"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
