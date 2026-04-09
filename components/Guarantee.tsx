"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function Guarantee() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="garantia" className="py-10 max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease }}
        className="relative rounded-3xl overflow-hidden"
      >
        {/* Dark bg with grid */}
        <div className="absolute inset-0 bg-zinc-900/70 backdrop-blur-sm" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Border */}
        <div className="absolute inset-0 rounded-3xl border border-emerald-400/12 pointer-events-none" />

        {/* Glow orbs */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-400/6 rounded-full blur-3xl pointer-events-none" />

        {/* Top border accent */}
        <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

        <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-center p-7 sm:p-10 md:p-16">
          {/* Left */}
          <div className="flex flex-col gap-8">
            <div className="inline-flex items-center gap-2 w-fit px-3 py-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span className="text-[11px] font-semibold text-emerald-400 tracking-wide">GARANTIA</span>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-3xl md:text-4xl lg:text-[3rem] font-bold tracking-tight leading-[1.08] text-zinc-50">
                Aparecer no Google
                <br />
                em 60 dias.
                <br />
                <span
                  style={{
                    background: "linear-gradient(90deg, #34d399, #6ee7b7)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Ou devolvo tudo.
                </span>
              </h2>

              <p className="text-base text-zinc-400 leading-relaxed max-w-[52ch]">
                O risco é completamente meu. Se o teu site não aparecer no Google
                nos primeiros 60 dias após o lançamento, recebes 100% do valor de
                volta — sem condições, sem letras pequenas, sem discussão.
              </p>
              <p className="text-base text-zinc-300 leading-relaxed max-w-[52ch]">
                Só faço esta garantia porque já aconteceu com mais de 30 médicos
                e psicólogos que hoje recebem consultas de pacientes que os
                encontraram online.
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              {[
                { label: "100% devolvido", sub: "se não aparecer no Google" },
                { label: "60 dias", sub: "prazo garantido" },
                { label: "Sem letras pequenas", sub: "condições simples" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/6 bg-white/2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <div>
                    <p className="text-xs font-semibold text-zinc-200">{item.label}</p>
                    <p className="text-[11px] text-zinc-600">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Guarantee badge SVG (design #3: sem o número gigante genérico) */}
          <div className="hidden lg:flex flex-col items-center justify-center px-10 border-l border-white/5">
            <svg width="160" height="180" viewBox="0 0 160 180" fill="none" aria-label="Garantia de 60 dias">
              {/* Shield base */}
              <path d="M80 8 L148 36 L148 92 C148 132 80 172 80 172 C80 172 12 132 12 92 L12 36 Z" fill="rgba(52,211,153,0.05)" stroke="rgba(52,211,153,0.3)" strokeWidth="1.5"/>
              {/* Shield inner */}
              <path d="M80 24 L134 46 L134 90 C134 122 80 156 80 156 C80 156 26 122 26 90 L26 46 Z" fill="rgba(52,211,153,0.04)" stroke="rgba(52,211,153,0.15)" strokeWidth="1"/>
              {/* Check mark */}
              <path d="M52 90 L70 108 L108 68" stroke="#34d399" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
              {/* 60 dias label */}
              <text x="80" y="134" textAnchor="middle" fontSize="11" fontWeight="600" fill="rgba(52,211,153,0.6)" fontFamily="ui-monospace,monospace">60 DIAS</text>
              {/* Decorative dots */}
              <circle cx="80" cy="16" r="2.5" fill="rgba(52,211,153,0.4)"/>
              <circle cx="148" cy="36" r="2" fill="rgba(52,211,153,0.3)"/>
              <circle cx="12" cy="36" r="2" fill="rgba(52,211,153,0.3)"/>
              {/* Outer glow ring */}
              <path d="M80 2 L154 32 L154 94 C154 138 80 178 80 178 C80 178 6 138 6 94 L6 32 Z" stroke="rgba(52,211,153,0.08)" strokeWidth="1" fill="none"/>
            </svg>
            <p className="text-xs text-zinc-600 text-center mt-1 font-mono">garantia real</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
