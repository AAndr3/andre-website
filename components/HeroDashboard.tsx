"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

function MiniSparkline() {
  const points = [30, 45, 38, 60, 52, 75, 68, 90, 82, 100];
  const max = Math.max(...points);
  const h = 36;
  const w = 120;
  const pts = points
    .map((p, i) => `${(i / (points.length - 1)) * w},${h - (p / max) * h}`)
    .join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <polyline points={pts} stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={`0,${h} ${pts} ${w},${h}`} fill="url(#sg)" opacity="0.15" />
      <defs>
        <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function AnimCounter({ to, duration = 1600 }: { to: number; duration?: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const e = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(e * to));
      if (t < 1) requestAnimationFrame(tick);
    };
    const id = setTimeout(() => requestAnimationFrame(tick), 800);
    return () => clearTimeout(id);
  }, [to, duration]);
  return <>{val}</>;
}

export default function HeroDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60, y: 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 1, delay: 0.4, ease }}
      className="relative w-full max-w-[420px]"
    >
      {/* Ambient glow */}
      <div className="absolute -inset-12 bg-emerald-400/8 rounded-full blur-3xl pointer-events-none" />

      {/* Main card */}
      <motion.div
        className="float relative rounded-2xl border border-white/8 bg-zinc-900/80 backdrop-blur-xl overflow-hidden"
        style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 24px 64px rgba(0,0,0,0.6)" }}
      >
        {/* Card header */}
        <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 ping-slow" />
            <span className="text-xs font-medium text-zinc-300">Presença Online</span>
          </div>
          <span className="text-[10px] text-zinc-600 font-mono">andreantunes.co</span>
        </div>

        {/* Google ranking */}
        <div className="px-5 pt-5 pb-4 border-b border-white/5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] text-zinc-500 uppercase tracking-wider">Google Ranking</p>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 font-mono">
              +12 posições
            </span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-zinc-50 font-mono tracking-tight">
                #<AnimCounter to={1} duration={1200} />
              </p>
              <p className="text-[11px] text-zinc-500 mt-1">"psicólogo clínico lisboa"</p>
            </div>
            <MiniSparkline />
          </div>
        </div>

        {/* Metrics row */}
        <div className="grid grid-cols-2 divide-x divide-white/5">
          <div className="px-5 py-4">
            <p className="text-[11px] text-zinc-500 mb-1.5">Novos pacientes</p>
            <p className="text-xl font-bold text-zinc-100 font-mono tracking-tight">
              +<AnimCounter to={8} duration={2000} />
              <span className="text-zinc-500 text-sm font-normal ml-1">/mês</span>
            </p>
          </div>
          <div className="px-5 py-4">
            <p className="text-[11px] text-zinc-500 mb-1.5">Avaliações</p>
            <div className="flex items-center gap-1.5">
              <p className="text-xl font-bold text-zinc-100 font-mono tracking-tight">4.9</p>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="10" height="10" viewBox="0 0 12 12" fill="#34d399">
                    <path d="M6 1l1.5 3 3.3.5-2.4 2.3.6 3.2L6 8.5 3 10l.6-3.2L1.2 4.5l3.3-.5z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom status */}
        <div className="px-5 py-3.5 bg-emerald-400/4 border-t border-emerald-400/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span className="text-[11px] text-emerald-400 font-medium">Garantia activa — 60 dias</span>
          </div>
          <span className="text-[10px] text-zinc-600 font-mono">60d</span>
        </div>
      </motion.div>

      {/* Floating badge — delivery */}
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.1, ease }}
        className="absolute -top-5 -right-6 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-800/90 border border-white/10 backdrop-blur-sm"
        style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }}
      >
        <div className="w-5 h-5 rounded-md bg-emerald-400/15 flex items-center justify-center">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </div>
        <div>
          <p className="text-[11px] font-semibold text-zinc-100 leading-none">10 dias</p>
          <p className="text-[9px] text-zinc-500 mt-0.5">tempo de entrega</p>
        </div>
      </motion.div>

      {/* Floating badge — social proof */}
      <motion.div
        initial={{ opacity: 0, y: -16, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.3, ease }}
        className="absolute -bottom-5 -left-6 flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-zinc-800/90 border border-white/10 backdrop-blur-sm"
        style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }}
      >
        <div className="flex -space-x-1.5">
          {["#3b82f6", "#8b5cf6", "#f59e0b"].map((c, i) => (
            <div key={i} className="w-5 h-5 rounded-full border border-zinc-800" style={{ background: c + "44" }} />
          ))}
        </div>
        <p className="text-[11px] text-zinc-300">
          <span className="font-semibold text-zinc-100">30+</span> profissionais
        </p>
      </motion.div>
    </motion.div>
  );
}
