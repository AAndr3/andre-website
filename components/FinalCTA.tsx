"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-28 max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease }}
        className="relative"
      >
        {/* Background */}
        <div className="absolute inset-0 rounded-3xl bg-zinc-900/50 backdrop-blur-sm border border-white/8" style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)" }} />
        <div className="absolute inset-0 rounded-3xl" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 120%, rgba(52,211,153,0.1) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />

        {/* Content */}
        <div className="relative flex flex-col items-center text-center gap-8 px-6 py-14 md:py-24">

          {/* design #2: header sem label genérico — directo ao ponto */}
          <div className="flex flex-col gap-5 max-w-2xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] text-zinc-50">
              Cada semana sem presença online
              <br />
              <span className="text-zinc-500 font-normal">são 100€ que ficaram noutro consultório.</span>
            </h2>
            {/* copy #3: custo de não agir + urgência */}
            <p className="text-base text-zinc-400 leading-relaxed mx-auto max-w-[48ch]">
              5 consultas por mês × 80€ × 52 semanas. Não é uma estimativa — é aritmética.
              Uma conversa de 15 minutos pode mudar isso. Gratuita. Sem compromisso. Sem pressão.
            </p>
          </div>

          {/* copy #6: price anchoring antes do CTA */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/6 bg-white/[0.02]">
              <span className="text-zinc-600 line-through decoration-zinc-700">Agência: 2.000–5.000€, 3 meses, sem garantia</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-400/20 bg-emerald-400/5">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
              <span className="text-emerald-400">Aqui: 10 dias, garantia 60 dias ou devolução total</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <motion.a
              href="#contacto"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-emerald-400 text-zinc-950 font-semibold text-sm hover:bg-emerald-300 transition-colors duration-200"
              style={{ boxShadow: "0 0 40px rgba(52,211,153,0.3), 0 4px 16px rgba(52,211,153,0.2)" }}
            >
              Marca uma conversa de 15 min — gratuita
              <svg
                className="transition-transform duration-200 group-hover:translate-x-0.5"
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.a>
          </div>

          {/* copy #5: scarcity no CTA final */}
          <p className="text-xs text-zinc-700 font-mono">
            ◆ Máximo de 4 clientes por mês — para garantir qualidade em cada projecto.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
