"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="px-4 md:px-10 lg:px-20 py-28 max-w-[1400px] mx-auto">
      <div
        ref={ref}
        className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-start"
      >
        {/* Left — Photo placeholder + name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="flex flex-col gap-5 items-center lg:items-start"
        >
          {/* Avatar */}
          <div
            className="relative w-full aspect-[3/4] max-w-[260px] rounded-2xl overflow-hidden bg-zinc-900 border border-white/6"
            style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)" }}
          >
            <Image
              src="/andre.png"
              alt="André Antunes — Growth Partner para médicos e psicólogos em Portugal"
              fill
              className="object-cover"
              sizes="260px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent" />

            {/* Name overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="text-sm font-semibold text-zinc-50 tracking-tight">
                André Antunes
              </p>
              <p className="text-xs text-zinc-400">Growth Partner</p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex gap-4">
            <div className="flex-1 p-4 rounded-xl border border-white/5 bg-zinc-900/40">
              <p className="text-xl font-bold text-zinc-50 font-mono">30+</p>
              <p className="text-xs text-zinc-500 mt-0.5">profissionais</p>
            </div>
            <div className="flex-1 p-4 rounded-xl border border-white/5 bg-zinc-900/40">
              <p className="text-xl font-bold text-zinc-50 font-mono">10</p>
              <p className="text-xs text-zinc-500 mt-0.5">dias de entrega</p>
            </div>
          </div>
        </motion.div>

        {/* Right — Copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="flex flex-col gap-8 pt-2"
        >
          <p className="text-xs font-medium text-zinc-600 uppercase tracking-widest">
            Quem sou
          </p>

          <div className="flex flex-col gap-5">
            <p className="text-2xl md:text-3xl font-bold tracking-tight leading-tight text-zinc-50">
              Não sou uma agência.
              <br />
              <span className="text-zinc-400 font-normal">
                Sou uma pessoa — e o meu método tem uma razão para funcionar.
              </span>
            </p>

            <div className="flex flex-col gap-4 text-base text-zinc-400 leading-relaxed">
              <p>
                Passei anos a perceber como o Google avalia e rankeia sites de saúde — um nicho com regras específicas (E-E-A-T) que a maioria das agências ignora. É por isso que os resultados chegam em semanas, não meses.
              </p>
              <p>
                Trabalho exclusivamente com médicos e psicólogos. Não porque não consiga fazer outros sectores — mas porque a especialização profunda é o que me permite dar garantia de resultado. Um generalista não pode garantir o que não controla.
              </p>
              <p className="text-zinc-300">
                Aceito um máximo de 4 clientes por mês. Se não tiver vaga, digo-o directamente. Se não fizer sentido trabalharmos juntos, também.
              </p>
            </div>
          </div>

          {/* Divider com mecanismo */}
          <div className="flex flex-col gap-4 pt-4 border-t border-white/5">
            <div className="flex flex-col gap-3">
              {[
                { label: "Especialização exclusiva", body: "Só profissionais de saúde — o que significa keywords, copy e SEO afinados para este sector específico." },
                { label: "Mecanismo comprovado", body: "30+ profissionais. 0 devoluções. O método funciona porque foi testado e refinado — não porque é teoria." },
              ].map((item) => (
                <div key={item.label} className="flex gap-3">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-400/60 flex-shrink-0"/>
                  <div>
                    <span className="text-sm font-semibold text-zinc-300">{item.label} — </span>
                    <span className="text-sm text-zinc-500">{item.body}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
