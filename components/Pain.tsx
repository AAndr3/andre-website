"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

function AnimatedNumber({ target, duration = 1400, prefix = "", suffix = "" }: { target: number; duration?: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export default function Pain() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-28 max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20">
      <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

        {/* Left — metrics */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col gap-4"
        >
          <motion.p variants={item} className="text-[11px] font-semibold text-zinc-600 uppercase tracking-[0.15em]">
            O custo da invisibilidade
          </motion.p>

          {/* Metric 1 */}
          <motion.div
            variants={item}
            className="group relative rounded-2xl border border-white/6 bg-zinc-900/50 p-6 hover:border-white/10 transition-colors duration-300 overflow-hidden"
            style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
          >
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-zinc-800/40 rounded-full blur-2xl pointer-events-none" />
            <p className="text-[11px] text-zinc-600 mb-3 font-mono uppercase tracking-wider">Consultas perdidas</p>
            <p className="text-4xl font-bold tracking-tight text-zinc-100 font-mono">
              <AnimatedNumber target={5} duration={1000} />
              <span className="text-zinc-600 text-xl ml-2 font-normal">/mês</span>
            </p>
            <p className="text-sm text-zinc-500 mt-2.5 leading-relaxed">
              que vão para o teu concorrente porque não apareças no Google
            </p>
          </motion.div>

          {/* Metric 2 */}
          <motion.div
            variants={item}
            className="group relative rounded-2xl border border-white/6 bg-zinc-900/50 p-6 hover:border-white/10 transition-colors duration-300"
            style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
          >
            <p className="text-[11px] text-zinc-600 mb-3 font-mono uppercase tracking-wider">Receita perdida</p>
            <p className="text-4xl font-bold tracking-tight text-zinc-100 font-mono">
              <AnimatedNumber target={400} duration={1400} />
              <span className="text-zinc-600 text-xl ml-2 font-normal">€/mês</span>
            </p>
            <p className="text-sm text-zinc-500 mt-2.5 leading-relaxed">
              em receita perdida — estimativa conservadora por especialidade
            </p>
          </motion.div>

          {/* Metric 3 — accent */}
          <motion.div
            variants={item}
            className="relative rounded-2xl border border-emerald-400/15 bg-emerald-400/4 p-6 overflow-hidden"
            style={{ boxShadow: "inset 0 1px 0 rgba(52,211,153,0.06)" }}
          >
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-emerald-400/8 rounded-full blur-2xl pointer-events-none" />
            <p className="text-[11px] text-emerald-400/60 mb-3 font-mono uppercase tracking-wider">Por ano</p>
            <p className="text-4xl font-bold tracking-tight text-emerald-400 font-mono">
              <AnimatedNumber target={4800} duration={1800} />
              <span className="text-emerald-400/40 text-xl ml-2 font-normal">€</span>
            </p>
            <p className="text-sm text-zinc-400 mt-2.5 leading-relaxed">
              em consultas que ficaram em agendas alheias. Ano após ano.
            </p>
          </motion.div>
        </motion.div>

        {/* Right — copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.25, ease }}
          className="flex flex-col gap-8"
        >
          <h2 className="text-3xl md:text-4xl lg:text-[2.8rem] font-bold tracking-tight leading-[1.1] text-zinc-50">
            Quando alguém precisa de um médico,{" "}
            <span className="text-zinc-500 font-normal">vai ao Google.</span>
          </h2>

          <div className="flex flex-col gap-5 text-base text-zinc-400 leading-relaxed">
            <p>
              Escolhe um dos primeiros resultados. Liga. Marca consulta. É assim
              que funciona — para toda a gente.
            </p>
            <p>
              Se não aparecer, não existe — por melhor que seja no seu trabalho.
              E cada semana que passa tem um custo real, calculável.
            </p>
            <p className="text-zinc-300">
              A maioria dos profissionais não perde pacientes por falta de
              competência. Perde por invisibilidade.
            </p>
          </div>

          {/* Separator */}
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-emerald-400/20 to-transparent" />
            <span className="text-[11px] text-zinc-600 font-mono tracking-wider uppercase">isso tem solução</span>
          </div>

          {/* Mini proof */}
          <div className="flex flex-col gap-3">
            {[
              "30+ médicos e psicólogos já aparecem no Google",
              "Entrega em 10 dias úteis",
              "Garantia de resultado — ou devolução total",
            ].map((line) => (
              <div key={line} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center flex-shrink-0">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <p className="text-sm text-zinc-400">{line}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
