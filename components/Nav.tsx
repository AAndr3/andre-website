"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const links = [
  { href: "/#como-funciona",      label: "Como funciona" },
  { href: "/casos-de-sucesso",    label: "Resultados" },
  { href: "/calculadora",         label: "Calculadora" },
  { href: "/blog",                label: "Blog" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change / resize
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="fixed top-0 left-0 right-0 z-40 flex justify-center pt-6 px-4"
      >
        <div
          className={`flex items-center justify-between gap-4 px-5 py-3 rounded-full border transition-all duration-500 w-full max-w-[820px] ${
            scrolled || open
              ? "bg-zinc-900/95 border-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              : "bg-zinc-950/50 border-white/5 backdrop-blur-sm"
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            className="text-sm font-medium tracking-tight text-zinc-100 hover:text-zinc-300 transition-colors duration-200 flex-shrink-0"
            onClick={() => setOpen(false)}
          >
            André Antunes
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* CTA — desktop */}
            <a
              href="/contacto"
              className="hidden md:inline-flex relative text-sm font-medium px-4 py-1.5 rounded-full bg-emerald-400 text-zinc-950 hover:bg-emerald-300 transition-colors duration-200 active:scale-[0.97]"
            >
              Falar comigo
            </a>

            {/* Hamburger — mobile */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-white/3 text-zinc-400 hover:text-zinc-100 transition-colors duration-200"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {open ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-30 bg-zinc-950/80 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.25, ease }}
              className="fixed top-24 left-4 right-4 z-40 md:hidden rounded-2xl border border-white/8 bg-zinc-900/98 backdrop-blur-xl overflow-hidden"
              style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)" }}
            >
              <div className="flex flex-col p-4 gap-1">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-zinc-400 hover:text-zinc-100 hover:bg-white/4 transition-all duration-150"
                  >
                    {l.label}
                  </a>
                ))}

                <div className="h-px bg-white/6 my-1" />

                <a
                  href="/contacto"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-400 text-zinc-950 font-semibold text-sm hover:bg-emerald-300 transition-colors duration-200 active:scale-[0.97]"
                >
                  Falar comigo
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
