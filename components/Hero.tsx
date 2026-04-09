"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const HeroDashboard = dynamic(() => import("./HeroDashboard"), { ssr: false });

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* Mesh gradient background — all contained inside overflow-hidden */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        {/* Orb 1 — kept inside bounds with inset values */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-[120px]" />
        {/* Orb 2 — right side, kept inside */}
        <div className="absolute -bottom-40 -right-20 w-[400px] h-[400px] rounded-full bg-emerald-400/6 blur-[100px]" />
        {/* Top border glow */}
        <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />
      </div>

      <div className="relative w-full max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 items-center pt-28 md:pt-32 pb-20 md:pb-24">

          {/* Left */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-7"
          >
            {/* Badge */}
            <motion.div variants={item}>
              <div className="inline-flex items-center gap-2.5 pl-1 pr-4 py-1 rounded-full border border-white/8 bg-white/3 backdrop-blur-sm">
                <div className="flex items-center gap-1.5 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-2.5 py-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 ping-slow" />
                  <span className="text-[11px] font-semibold text-emerald-400 tracking-wide">NOVO</span>
                </div>
                <span className="text-xs text-zinc-400">Growth partner para profissionais de saúde</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={item}
              className="text-[1.9rem] sm:text-[2.4rem] md:text-[3.2rem] lg:text-[3.6rem] font-bold tracking-[-0.03em] leading-[1.08] text-zinc-50"
            >
              Quantos pacientes
              <br />
              pesquisaram por ti
              <br />
              <span
                className="relative"
                style={{
                  background: "linear-gradient(90deg, #34d399, #6ee7b7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                esta semana
              </span>
              <br />
              sem te encontrar?
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={item}
              className="text-base text-zinc-400 leading-relaxed max-w-[50ch]"
            >
              5 novos pacientes por mês, sem publicidade paga, sem aprender
              marketing. Em 10 dias tens uma presença que trabalha por ti
              24 horas — para sempre.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-wrap items-center gap-3">
              <a
                href="#contacto"
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-400 text-zinc-950 font-semibold text-sm transition-all duration-200 hover:bg-emerald-300 active:scale-[0.97]"
                style={{ boxShadow: "0 0 0 0 rgba(52,211,153,0.5), 0 4px 24px rgba(52,211,153,0.25)" }}
              >
                Marca uma conversa de 15 min
                <svg
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                  width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>

              <a
                href="#garantia"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/8 text-zinc-400 font-medium text-sm hover:text-zinc-100 hover:border-white/15 transition-all duration-200 active:scale-[0.97] backdrop-blur-sm"
              >
                Ver garantia
              </a>
            </motion.div>

            {/* Trust row — metrics strip, sem avatares genéricos */}
            <motion.div variants={item} className="flex flex-col gap-3 pt-1">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                {[
                  { icon: "M20 6L9 17l-5-5", label: "30+ clientes", sub: "médicos e psicólogos" },
                  { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", label: "Garantia 60 dias", sub: "ou devolução total" },
                  { icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8z", label: "Entrega 10 dias", sub: "do briefing ao live" },
                ].map((t) => (
                  <div key={t.label} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center flex-shrink-0">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5"><path d={t.icon}/></svg>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs font-semibold text-zinc-300">{t.label}</span>
                      <span className="text-[10px] text-zinc-600">{t.sub}</span>
                    </div>
                  </div>
                ))}
              </div>
              {/* Scarcity */}
              <p className="text-[11px] text-zinc-600 font-mono">
                ◆ Aceito um máximo de <span className="text-zinc-400">4 clientes por mês</span> — para garantir qualidade em cada projecto.
              </p>
            </motion.div>
          </motion.div>

          {/* Right — Dashboard */}
          <div className="hidden lg:flex justify-end items-center pr-8">
            <HeroDashboard />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
    </section>
  );
}
