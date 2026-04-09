"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

type CellValue = boolean | string;

const rows: { feature: string; andre: CellValue; agency: CellValue; diy: CellValue }[] = [
  { feature: "Copy escrito à medida",      andre: true,        agency: "Às vezes",  diy: false },
  { feature: "SEO configurado",            andre: true,        agency: true,        diy: false },
  { feature: "Google Maps activo",         andre: true,        agency: true,        diy: "Manual" },
  { feature: "Entrega em 10 dias",         andre: true,        agency: false,       diy: false },
  { feature: "Garantia de resultado",      andre: "60 dias",   agency: false,       diy: false },
  { feature: "Acompanhamento pessoal",     andre: true,        agency: false,       diy: false },
  { feature: "Foco em profissionais saúde",andre: true,        agency: false,       diy: false },
];

function Cell({ value, highlight = false }: { value: CellValue; highlight?: boolean }) {
  if (value === true) {
    return (
      <div className="flex justify-center">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${highlight ? "bg-emerald-400/15 border border-emerald-400/30" : "bg-zinc-800"}`}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={highlight ? "#34d399" : "#52525b"} strokeWidth="2.5">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
      </div>
    );
  }
  if (value === false) {
    return (
      <div className="flex justify-center">
        <div className="w-6 h-6 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#3f3f46" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-center">
      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${highlight ? "text-emerald-400 bg-emerald-400/10 border border-emerald-400/20" : "text-zinc-500 bg-zinc-800/60"}`}>
        {value}
      </span>
    </div>
  );
}

export default function ComparisonTable() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20">
      <div ref={ref} className="flex flex-col gap-12">

        {/* Header — design #2: label à direita + H2 esquerda */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="flex items-end justify-between gap-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight text-zinc-50">
            Porque é diferente
            <br />
            <span className="text-zinc-500 font-normal">de uma agência ou DIY.</span>
          </h2>
          <p className="hidden md:block text-[11px] font-semibold text-zinc-600 uppercase tracking-[0.15em] text-right flex-shrink-0">Comparação<br/>lado a lado</p>
        </motion.div>

        {/* Hard clip wrapper — prevents iOS from counting inner scroll width as page width */}
        <div style={{ maxWidth: "100vw", overflow: "hidden" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="w-full overflow-x-auto rounded-2xl border border-white/6"
          style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
        >
          <table className="w-full min-w-[560px] border-collapse">
            <thead>
              <tr className="border-b border-white/6">
                <th className="text-left px-6 py-4 text-[11px] font-semibold text-zinc-600 uppercase tracking-wider w-[40%]">
                  O que inclui
                </th>
                {/* André — highlighted */}
                <th className="px-4 py-4 text-center relative">
                  <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs font-bold text-emerald-400">André Antunes</span>
                    <span className="text-[10px] text-emerald-400/50 bg-emerald-400/8 border border-emerald-400/15 rounded-full px-2 py-0.5">Recomendado</span>
                  </div>
                </th>
                <th className="px-4 py-4 text-center text-xs font-semibold text-zinc-500">Agência</th>
                <th className="px-4 py-4 text-center text-xs font-semibold text-zinc-500">DIY</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <motion.tr
                  key={row.feature}
                  initial={{ opacity: 0, y: 8 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.05, ease }}
                  className="border-b border-white/4 last:border-0 hover:bg-white/[0.015] transition-colors duration-150 group"
                >
                  <td className="px-6 py-4 text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors duration-150">
                    {row.feature}
                  </td>
                  {/* André column — subtle highlight bg */}
                  <td className="px-4 py-4 bg-emerald-400/[0.03]">
                    <Cell value={row.andre} highlight />
                  </td>
                  <td className="px-4 py-4">
                    <Cell value={row.agency} />
                  </td>
                  <td className="px-4 py-4">
                    <Cell value={row.diy} />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
