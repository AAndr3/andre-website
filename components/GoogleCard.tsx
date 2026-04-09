"use client";

import { motion } from "framer-motion";

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="#34d399">
      <path d="M6 1l1.5 3 3.3.5-2.4 2.3.6 3.2L6 8.5 3 10l.6-3.2L1.2 4.5l3.3-.5z" />
    </svg>
  );
}

export default function GoogleCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40, y: 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="relative"
    >
      {/* Floating glow */}
      <div className="absolute -inset-8 bg-emerald-400/5 rounded-3xl blur-3xl" />

      {/* Google search mock */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative bg-zinc-900 border border-white/8 rounded-2xl p-5 w-[300px] shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
        style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 20px 60px rgba(0,0,0,0.5)" }}
      >
        {/* Search bar */}
        <div className="flex items-center gap-2 bg-zinc-800 rounded-lg px-3 py-2 mb-4">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <span className="text-xs text-zinc-400 font-mono">psicólogo lisboa</span>
          <div className="ml-auto w-0.5 h-3 bg-emerald-400 animate-pulse" />
        </div>

        {/* Result item */}
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-emerald-400 text-xs font-bold">D</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-emerald-400 font-medium truncate">
                Dr. Mariana Costa — Psicóloga Clínica
              </p>
              <p className="text-[10px] text-zinc-500 truncate">
                marianacosta.pt · Avenida da Liberdade, Lisboa
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
            </div>
            <span className="text-[10px] text-zinc-400">4.9</span>
            <span className="text-[10px] text-zinc-600">(47 avaliações)</span>
          </div>

          <p className="text-[10px] text-zinc-500 leading-relaxed">
            Psicóloga clínica especializada em ansiedade e burnout. Consultas presenciais e online.
          </p>
        </div>

        {/* Status badge */}
        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-emerald-400"
            />
            <span className="text-[10px] text-emerald-400 font-medium">No topo do Google</span>
          </div>
          <span className="text-[10px] text-zinc-600 font-mono">60 dias</span>
        </div>
      </motion.div>

      {/* Stats card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="absolute -bottom-10 -right-8 bg-zinc-900 border border-white/8 rounded-xl px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.4)" }}
      >
        <p className="text-xl font-bold text-zinc-50 tracking-tight">30+</p>
        <p className="text-[10px] text-zinc-500">profissionais cresceram</p>
      </motion.div>
    </motion.div>
  );
}
