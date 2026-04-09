"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";

const DashboardPreview = dynamic(() => import("./DashboardPreview"), { ssr: false });

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function DashboardSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24">
      <div ref={ref} className="max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20 flex flex-col gap-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="flex flex-col gap-3 max-w-xl"
        >
          <p className="text-[11px] font-semibold text-zinc-600 uppercase tracking-[0.15em]">Resultado real</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight text-zinc-50">
            É isto que os teus pacientes
            <br />
            <span className="text-zinc-500 font-normal">passam a ver sobre ti.</span>
          </h2>
          <p className="text-base text-zinc-500 leading-relaxed max-w-[46ch]">
            Posição #1 no Google, avaliações em crescimento, novos pacientes a marcar consultas — tudo acompanhado em tempo real.
          </p>
        </motion.div>

        {/* Hard clip to viewport — prevents iOS from counting inner scroll width */}
        <div style={{ maxWidth: "100vw", overflow: "hidden", marginLeft: "-1rem", marginRight: "-1rem", paddingLeft: "1rem", paddingRight: "1rem" }}>
          <div className="overflow-x-auto">
            <div style={{ minWidth: 700 }}>
              <DashboardPreview />
            </div>
          </div>
          <p className="text-[11px] text-zinc-700 text-center mt-3 md:hidden">← desliza para ver →</p>
        </div>
      </div>
    </section>
  );
}
