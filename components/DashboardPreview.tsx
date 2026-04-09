"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ─── Mini data ─────────────────────────────────────────── */
const trafficData = [42, 58, 51, 74, 68, 91, 84, 112, 97, 138, 124, 161];
const months = ["Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez", "Jan", "Fev", "Mar", "Abr"];

const keywords = [
  { term: "psicólogo clínico lisboa", pos: 1, delta: +11, vol: "1.2k" },
  { term: "psicólogo ansiedade lisboa", pos: 2, delta: +8,  vol: "880" },
  { term: "consulta psicologia online", pos: 3, delta: +5,  vol: "640" },
  { term: "terapeuta burnout lisboa",   pos: 4, delta: +14, vol: "390" },
  { term: "psicólogo particular preço", pos: 6, delta: +7,  vol: "720" },
];

const activity = [
  { time: "há 2h",  msg: "Nova marcação via Google", type: "booking" },
  { time: "há 5h",  msg: "Posição #1 mantida · 3 dias seguidos", type: "rank" },
  { time: "ontem",  msg: "Nova avaliação 5 estrelas", type: "review" },
  { time: "ontem",  msg: "+18 visitas orgânicas", type: "traffic" },
];

/* ─── Animated counter ───────────────────────────────────── */
function Counter({ to, prefix = "", suffix = "", delay = 0 }: { to: number; prefix?: string; suffix?: string; delay?: number }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const id = setTimeout(() => {
      const start = performance.now();
      const dur = 1200;
      const tick = (now: number) => {
        const p = Math.min((now - start) / dur, 1);
        setV(Math.round((1 - Math.pow(1 - p, 3)) * to));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(id);
  }, [inView, to, delay]);
  return <span ref={ref}>{prefix}{v}{suffix}</span>;
}

/* ─── SVG area chart ─────────────────────────────────────── */
function AreaChart() {
  const W = 560; const H = 120;
  const max = Math.max(...trafficData);
  const pts = trafficData.map((d, i) => ({
    x: (i / (trafficData.length - 1)) * W,
    y: H - (d / max) * H * 0.88,
  }));
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x},${p.y}`).join(" ");
  const area = `${path} L ${W},${H} L 0,${H} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 120 }} preserveAspectRatio="none">
      <defs>
        <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <path d={area} fill="url(#ag)" />
      <path d={path} fill="none" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)" />
      {/* Last point dot */}
      <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="3.5" fill="#34d399" filter="url(#glow)" />
      <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="6" fill="#34d399" fillOpacity="0.2" />
    </svg>
  );
}

/* ─── KPI card ───────────────────────────────────────────── */
function KPI({ label, value, delta, sub, delay }: { label: string; value: React.ReactNode; delta: string; sub: string; delay: number }) {
  const positive = delta.startsWith("+");
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease }}
      className="flex flex-col gap-2 p-4 rounded-xl border border-white/5 bg-zinc-900/60"
      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
    >
      <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">{label}</p>
      <p className="text-2xl font-bold text-zinc-50 tracking-tight font-mono leading-none">{value}</p>
      <div className="flex items-center gap-1.5">
        <span className={`text-[10px] font-semibold ${positive ? "text-emerald-400" : "text-red-400"}`}>{delta}</span>
        <span className="text-[10px] text-zinc-600">{sub}</span>
      </div>
    </motion.div>
  );
}

/* ─── Main component ─────────────────────────────────────── */
export default function DashboardPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease }}
      className="w-full max-w-[1100px] mx-auto"
    >
      {/* Browser chrome */}
      <div className="rounded-t-2xl border border-white/8 bg-zinc-900/80 px-4 py-3 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="px-3 py-1 rounded-md bg-zinc-800/80 border border-white/5 text-[11px] text-zinc-500 font-mono">
            andreantunes.co/dashboard
          </div>
        </div>
      </div>

      {/* Dashboard shell */}
      <div
        className="border-x border-b border-white/8 rounded-b-2xl overflow-hidden flex"
        style={{ background: "#0e0e11", minHeight: 520 }}
      >
        {/* Sidebar */}
        <div className="hidden md:flex flex-col w-[180px] flex-shrink-0 border-r border-white/5 p-4 gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2 px-2 pt-1">
            <div className="w-6 h-6 rounded-lg bg-emerald-400/15 border border-emerald-400/25 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            </div>
            <span className="text-xs font-semibold text-zinc-300 tracking-tight">André Antunes</span>
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-0.5">
            {[
              { icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", label: "Visão Geral", active: true },
              { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", label: "SEO", active: false },
              { icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z", label: "Google Maps", active: false },
              { icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z", label: "Avaliações", active: false },
            ].map((nav) => (
              <div
                key={nav.label}
                className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[11px] font-medium cursor-default transition-colors ${
                  nav.active ? "bg-zinc-800 text-zinc-100" : "text-zinc-600 hover:text-zinc-400"
                }`}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d={nav.icon} />
                </svg>
                {nav.label}
              </div>
            ))}
          </nav>

          {/* Status */}
          <div className="mt-auto flex flex-col gap-1.5 px-2">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 ping-slow" />
              <span className="text-[10px] text-emerald-400 font-medium">Online</span>
            </div>
            <p className="text-[10px] text-zinc-600 leading-snug">Dr. Mariana Costa<br />Psicóloga Clínica</p>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-5 flex flex-col gap-5 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-zinc-100 tracking-tight">Visão Geral</h3>
              <p className="text-[11px] text-zinc-500 font-mono mt-0.5">Abril 2026 · últimos 12 meses</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-2.5 py-1 rounded-md border border-white/6 bg-zinc-800/60 text-[11px] text-zinc-400 font-mono">
                12 meses
              </div>
              <div className="w-6 h-6 rounded-md border border-white/6 bg-zinc-800/60 flex items-center justify-center">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth="2">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <KPI label="Posição Google" value={<Counter to={1} prefix="#" delay={200} />} delta="+11 posições" sub="vs. mês anterior" delay={0.1} />
            <KPI label="Visitas / mês" value={<Counter to={847} delay={300} />} delta="+34%" sub="orgânico" delay={0.15} />
            <KPI label="Novos pacientes" value={<Counter to={12} prefix="+" delay={400} />} delta="+8 vs. antes" sub="do site" delay={0.2} />
            <KPI label="Avaliação" value={<Counter to={49} prefix="" suffix="" delay={500} />} delta="47 avaliações" sub="Google Maps" delay={0.25} />
          </div>

          {/* Chart */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="flex-1 rounded-xl border border-white/5 bg-zinc-900/40 p-4 flex flex-col gap-3"
            style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)" }}
          >
            <div className="flex items-center justify-between">
              <p className="text-[11px] text-zinc-400 font-medium">Visitas orgânicas</p>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-[10px] text-zinc-500 font-mono">+161 Abr</span>
              </div>
            </div>

            <div className="flex-1">
              <AreaChart />
            </div>

            {/* X axis labels */}
            <div className="flex justify-between px-0">
              {months.map((m) => (
                <span key={m} className="text-[9px] text-zinc-700 font-mono">{m}</span>
              ))}
            </div>
          </motion.div>

          {/* Bottom row: Keywords + Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {/* Keywords */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45, ease }}
              className="rounded-xl border border-white/5 bg-zinc-900/40 p-4 flex flex-col gap-3"
              style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)" }}
            >
              <p className="text-[11px] text-zinc-400 font-medium">Top Keywords</p>
              <div className="flex flex-col divide-y divide-white/4">
                {keywords.map((kw) => (
                  <div key={kw.term} className="flex items-center justify-between py-2 first:pt-0 last:pb-0">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[10px] font-mono text-zinc-600 w-4 text-right flex-shrink-0">#{kw.pos}</span>
                      <span className="text-[11px] text-zinc-400 truncate">{kw.term}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                      <span className="text-[10px] text-zinc-600 font-mono">{kw.vol}</span>
                      <span className="text-[10px] text-emerald-400 font-mono font-semibold">+{kw.delta}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Activity */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.52, ease }}
              className="rounded-xl border border-white/5 bg-zinc-900/40 p-4 flex flex-col gap-3"
              style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)" }}
            >
              <p className="text-[11px] text-zinc-400 font-medium">Actividade recente</p>
              <div className="flex flex-col gap-2.5">
                {activity.map((a, i) => {
                  const colors: Record<string, string> = {
                    booking: "#34d399", rank: "#60a5fa", review: "#f59e0b", traffic: "#a78bfa",
                  };
                  const icons: Record<string, string> = {
                    booking: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
                    rank:    "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
                    review:  "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
                    traffic: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
                  };
                  return (
                    <div key={i} className="flex items-start gap-2.5">
                      <div
                        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: colors[a.type] + "15", border: `1px solid ${colors[a.type]}25` }}
                      >
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={colors[a.type]} strokeWidth="1.8">
                          <path d={icons[a.type]} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] text-zinc-300 leading-snug">{a.msg}</p>
                        <p className="text-[10px] text-zinc-600 font-mono mt-0.5">{a.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Reflection / ground shadow */}
      <div
        className="h-12 mx-4 rounded-b-3xl opacity-40"
        style={{ background: "linear-gradient(to bottom, rgba(52,211,153,0.04), transparent)" }}
      />
    </motion.div>
  );
}
