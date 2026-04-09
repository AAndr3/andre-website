"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const reviews = [
  {
    name: "Dra. Mariana Costa",
    role: "Psicóloga Clínica",
    location: "Lisboa",
    rating: 5,
    text: "Estava completamente invisível no Google. Em menos de 3 semanas o meu site aparecia no topo para 'psicóloga clínica Lisboa'. Recebi a primeira marcação directamente pelo site na primeira semana após o lançamento.",
    initials: "MC",
    color: "#3b82f6",
  },
  {
    name: "Dr. Rui Fernandes",
    role: "Médico de Família",
    location: "Porto",
    rating: 5,
    text: "Demorei anos a adiar isto por achar que era complicado. Em 10 dias tinha um site profissional, aparecia no Google Maps e o copy estava escrito melhor do que eu alguma vez conseguiria. Vale cada cêntimo.",
    initials: "RF",
    color: "#8b5cf6",
  },
  {
    name: "Dra. Ana Rodrigues",
    role: "Dermatologista",
    location: "Braga",
    rating: 5,
    text: "O que me convenceu foi a garantia. Ou aparecia no Google em 60 dias ou devolvia o dinheiro. Apareci em 18 dias. Hoje tenho uma lista de espera de 3 semanas — algo que nunca tinha acontecido antes.",
    initials: "AR",
    color: "#ec4899",
  },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(n)].map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="#34d399">
          <path d="M6 1l1.5 3 3.3.5-2.4 2.3.6 3.2L6 8.5 3 10l.6-3.2L1.2 4.5l3.3-.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="py-24 max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20"
      aria-label="Testemunhos de clientes"
    >
      <div ref={ref} className="flex flex-col gap-12">

        {/* Header — design #2: centrado + design #4: acento de cor nos stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="flex flex-col items-center text-center gap-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight text-zinc-50">
            O que dizem os profissionais
            <br />
            <span className="text-zinc-500 font-normal">que já cresceram online.</span>
          </h2>
          {/* design #4: strip de estatísticas com paleta variada */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-400/20 bg-emerald-400/5">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="10" height="10" viewBox="0 0 12 12" fill="#34d399">
                    <path d="M6 1l1.5 3 3.3.5-2.4 2.3.6 3.2L6 8.5 3 10l.6-3.2L1.2 4.5l3.3-.5z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-bold text-emerald-400 font-mono">4.9</span>
              <span className="text-xs text-zinc-500">média</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-blue-400/20 bg-blue-400/5">
              <span className="text-sm font-bold text-blue-400 font-mono">30+</span>
              <span className="text-xs text-zinc-500">clientes</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-purple-400/20 bg-purple-400/5">
              <span className="text-sm font-bold text-purple-400 font-mono">0</span>
              <span className="text-xs text-zinc-500">devoluções</span>
            </div>
          </div>
        </motion.div>

        {/* Cards — asymmetric: 2 cols top, 1 wide bottom */}
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.slice(0, 2).map((r, i) => (
              <motion.article
                key={r.name}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease }}
                className={`flex flex-col gap-5 p-7 rounded-2xl bg-zinc-900/50 hover:border-white/12 transition-colors duration-300 ${i === 0 ? "border border-white/8" : "border border-white/4"}`}
                style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
                itemScope
                itemType="https://schema.org/Review"
              >
                <Stars n={r.rating} />
                <blockquote
                  className="text-sm text-zinc-300 leading-relaxed flex-1"
                  itemProp="reviewBody"
                >
                  "{r.text}"
                </blockquote>
                <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                    style={{ background: r.color + "22", color: r.color, border: `1px solid ${r.color}33` }}
                  >
                    {r.initials}
                  </div>
                  <div itemProp="author" itemScope itemType="https://schema.org/Person">
                    <p className="text-xs font-semibold text-zinc-200" itemProp="name">{r.name}</p>
                    <p className="text-[11px] text-zinc-500">
                      <span itemProp="jobTitle">{r.role}</span> · {r.location}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Third review — wide */}
          <motion.article
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            className="flex flex-col md:flex-row gap-6 p-7 rounded-2xl border border-emerald-400/10 bg-emerald-400/3 hover:border-emerald-400/20 transition-colors duration-300"
            style={{ boxShadow: "inset 0 1px 0 rgba(52,211,153,0.05)" }}
            itemScope
            itemType="https://schema.org/Review"
          >
            <div className="flex flex-col gap-4 flex-1">
              <Stars n={reviews[2].rating} />
              <blockquote
                className="text-sm text-zinc-300 leading-relaxed"
                itemProp="reviewBody"
              >
                "{reviews[2].text}"
              </blockquote>
            </div>
            <div className="flex md:flex-col items-center md:items-end gap-3 md:justify-between md:min-w-[160px]">
              <div className="flex items-center gap-3 md:flex-col md:items-end">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                  style={{ background: reviews[2].color + "22", color: reviews[2].color, border: `1px solid ${reviews[2].color}33` }}
                >
                  {reviews[2].initials}
                </div>
                <div itemProp="author" itemScope itemType="https://schema.org/Person" className="md:text-right">
                  <p className="text-xs font-semibold text-zinc-200" itemProp="name">{reviews[2].name}</p>
                  <p className="text-[11px] text-zinc-500">
                    <span itemProp="jobTitle">{reviews[2].role}</span> · {reviews[2].location}
                  </p>
                </div>
              </div>
              <div className="hidden md:block text-right">
                <p className="text-[10px] text-zinc-600 font-mono">lista de espera</p>
                <p className="text-sm font-bold text-emerald-400 font-mono">3 semanas</p>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
