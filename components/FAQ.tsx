"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const faqs = [
  {
    q: "Quanto tempo demora a aparecer no Google?",
    a: "A garantia é de 60 dias. Na maioria dos casos acontece mais cedo — entre 2 a 4 semanas após o lançamento. Depende da competitividade da tua especialidade e localização, mas nunca passei dos 60 dias.",
  },
  {
    q: "O que está incluído?",
    a: "Copy do site escrito à medida para os teus pacientes, SEO técnico totalmente configurado, Google Maps activo e optimizado, entrega em 10 dias úteis e suporte após o lançamento. Não há surpresas no final.",
  },
  {
    q: "E se não aparecer no Google em 60 dias?",
    a: "Devolvo 100% do valor pago. Sem condições, sem discussão, sem letras pequenas. O risco é inteiramente meu — é isso que significa uma garantia real.",
  },
  {
    q: "Preciso de saber tecnologia ou marketing?",
    a: "Não. Trato de absolutamente tudo — do copy ao SEO, do design à configuração técnica do Google Maps. O teu único trabalho é aprovar o resultado final antes de lançar.",
  },
  {
    q: "Trabalhas com qualquer especialidade médica?",
    a: "Trabalho com médicos e psicólogos independentes com consultório próprio — qualquer especialidade. Já ajudei clínicos gerais, psicólogos clínicos, pediatras e dermatologistas, entre outros.",
  },
  {
    q: "O site fica meu? Posso editar depois?",
    a: "Sim, o site fica completamente teu. É construído numa plataforma simples de gerir — se quiseres alterar um texto ou imagem no futuro, consegues fazê-lo sem precisar de mim.",
  },
];

function AccordionItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease }}
      className={`border-b border-white/6 last:border-0 transition-colors duration-200 ${open ? "border-white/10" : ""}`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
        aria-expanded={open}
      >
        <span className={`text-sm md:text-base font-medium leading-snug transition-colors duration-200 ${open ? "text-zinc-100" : "text-zinc-300 group-hover:text-zinc-100"}`}>
          {q}
        </span>
        <div className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ${open ? "border-emerald-400/40 bg-emerald-400/10 rotate-45" : "border-white/10 bg-white/3 group-hover:border-white/20"}`}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={open ? "#34d399" : "#71717a"} strokeWidth="2.5">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
          >
            <p className="text-sm text-zinc-400 leading-relaxed pb-5 max-w-[65ch]">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20">
      <div ref={ref} className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-16 lg:gap-24">

        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="flex flex-col gap-5"
        >
          <p className="text-[11px] font-semibold text-zinc-600 uppercase tracking-[0.15em]">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight text-zinc-50">
            Perguntas
            <br />
            frequentes.
          </h2>
          <p className="text-base text-zinc-500 leading-relaxed max-w-[36ch]">
            Se ainda tens dúvidas depois de leres, fala directamente comigo.
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors duration-200 font-medium mt-2"
          >
            Falar comigo
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>

        {/* Right — Accordion */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col divide-y divide-white/6"
        >
          {faqs.map((faq, i) => (
            <AccordionItem key={i} q={faq.q} a={faq.a} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
