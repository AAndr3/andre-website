"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SpotlightCard from "./SpotlightCard";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

function IconPen() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1.5">
      <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}
function IconSearch() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1.5">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
    </svg>
  );
}
function IconMap() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1.5">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function IconZap() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1.5">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

export default function ValueStack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="como-funciona" className="py-28 max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20">
      <div ref={ref} className="flex flex-col gap-14">

        {/* Header — design #2: sem label, H2 sozinho com contraste forte */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end"
        >
          <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.05] text-zinc-50">
            Tudo feito por mim.
            <br />
            <span className="text-zinc-600 font-normal text-3xl md:text-4xl">Tu só aprovias.</span>
          </h2>
          <p className="text-base text-zinc-500 leading-relaxed max-w-[44ch] lg:ml-auto lg:text-right">
            Uma agência cobra 2.000–5.000€ e demora 3 meses.
            Aqui tens tudo em 10 dias — com garantia de resultado que nenhuma agência dá.
          </p>
        </motion.div>

        {/* Bento grid — design #1: cada card tem formato diferente */}
        <div className="flex flex-col gap-3">

          {/* Row 1: Card 01 (wide) + Card 02 (stat) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

            {/* 01 — Copy: wide anchor card com preview visual */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08, ease }}
              className="md:col-span-2"
            >
              <SpotlightCard>
                <div
                  className="h-full rounded-2xl border border-white/8 bg-zinc-900/50 p-8 flex flex-col justify-between gap-8 hover:border-white/12 transition-colors duration-300"
                  style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)" }}
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-emerald-400/8 border border-emerald-400/15 flex items-center justify-center">
                      <IconPen />
                    </div>
                    <span className="text-[11px] font-mono text-zinc-700">01</span>
                  </div>

                  <div className="flex flex-col lg:flex-row lg:items-end gap-6">
                    <div className="flex-1 flex flex-col gap-3">
                      <h3 className="text-xl font-semibold tracking-tight text-zinc-100">
                        Copy escrito à medida
                      </h3>
                      {/* copy #2: outcome, não feature */}
                      <p className="text-sm text-zinc-500 leading-relaxed max-w-[52ch]">
                        O teu futuro paciente lê e marca — sem precisar de te ligar primeiro para perceber se és a pessoa certa. Uma agência cobra 800€ só por esta peça.
                      </p>
                    </div>
                    {/* Mini copy preview — visual diferenciador */}
                    <div className="flex-shrink-0 w-full lg:w-48 rounded-xl border border-white/5 bg-zinc-950/60 p-3 font-mono">
                      <p className="text-[10px] text-zinc-700 mb-1.5">site.copy</p>
                      <p className="text-[10px] text-emerald-400/70 leading-relaxed">
                        &ldquo;Quando alguém pesquisa<br/>
                        <span className="text-emerald-400">'psicólogo Lisboa'</span><br/>
                        apareces tu — não o<br/>
                        teu concorrente.&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>

            {/* 02 — SEO: stat card com número grande */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.14, ease }}
            >
              <SpotlightCard>
                <div
                  className="h-full rounded-2xl border border-white/6 bg-zinc-900/50 p-7 flex flex-col justify-between gap-4 hover:border-white/10 transition-colors duration-300 min-h-[220px]"
                  style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
                >
                  <div className="flex items-start justify-between">
                    <div className="w-9 h-9 rounded-xl bg-emerald-400/8 border border-emerald-400/15 flex items-center justify-center">
                      <IconSearch />
                    </div>
                    <span className="text-[11px] font-mono text-zinc-700">02</span>
                  </div>
                  {/* copy #2: big stat outcome */}
                  <div>
                    <p className="text-5xl font-black text-zinc-100 font-mono tracking-tight leading-none">91<span className="text-emerald-400">%</span></p>
                    <p className="text-xs text-zinc-600 mt-1">dos cliques ficam na 1ª página do Google</p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-sm font-semibold tracking-tight text-zinc-200">SEO configurado</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed">Aparecer no Google, de graça, para sempre — sem pagar por clique. Valor de mercado: 150€/mês em Ads para o mesmo tráfego.</p>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          </div>

          {/* Row 2: Card 03 (maps, horizontal evidence) + Card 04 (timeline) + Card 05 (proof) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

            {/* 03 — Google Maps: evidence card horizontal */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.18, ease }}
            >
              <SpotlightCard>
                <div
                  className="h-full rounded-2xl border border-blue-400/10 bg-blue-400/[0.02] p-7 flex flex-col justify-between gap-4 hover:border-blue-400/15 transition-colors duration-300 min-h-[220px]"
                  style={{ boxShadow: "inset 0 1px 0 rgba(96,165,250,0.04)" }}
                >
                  <div className="flex items-start justify-between">
                    <div className="w-9 h-9 rounded-xl bg-blue-400/8 border border-blue-400/15 flex items-center justify-center">
                      <IconMap />
                    </div>
                    <span className="text-[11px] font-mono text-zinc-700">03</span>
                  </div>
                  {/* Mini Maps mock */}
                  <div className="flex flex-col gap-1.5 rounded-lg border border-white/5 bg-zinc-950/50 p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400"/>
                      <span className="text-[10px] font-semibold text-emerald-400">#1 — Dr. João Silva</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-zinc-600"/>
                      <span className="text-[10px] text-zinc-600">#2 — Clínica X</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-zinc-600"/>
                      <span className="text-[10px] text-zinc-600">#3 — Consultório Y</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-200 mb-1">Google Maps activo</h3>
                    {/* copy #2: outcome */}
                    <p className="text-xs text-zinc-500 leading-relaxed">3× mais chamadas é o resultado médio de um perfil Maps optimizado. É onde os pacientes decidem a quem ligar.</p>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>

            {/* 04 — Entrega 10 dias: timeline card */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.22, ease }}
            >
              <SpotlightCard>
                <div
                  className="h-full rounded-2xl border border-white/6 bg-zinc-900/50 p-7 flex flex-col justify-between gap-4 hover:border-white/10 transition-colors duration-300 min-h-[220px]"
                  style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
                >
                  <div className="flex items-start justify-between">
                    <div className="w-9 h-9 rounded-xl bg-emerald-400/8 border border-emerald-400/15 flex items-center justify-center">
                      <IconZap />
                    </div>
                    <span className="text-[11px] font-mono text-zinc-700">04</span>
                  </div>
                  {/* Timeline visual */}
                  <div className="flex items-center gap-0.5">
                    {[1,2,3,4,5,6,7,8,9,10].map((d) => (
                      <div
                        key={d}
                        className="flex-1 h-1.5 rounded-full"
                        style={{
                          background: d <= 10 ? `rgba(52,211,153,${0.15 + d * 0.085})` : "#27272a"
                        }}
                      />
                    ))}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-200 mb-1">Entrega em 10 dias</h3>
                    {/* copy #2: outcome */}
                    <p className="text-xs text-zinc-500 leading-relaxed">Enquanto uma agência ainda está no briefing, tu já tens pacientes a marcar. 10 dias do primeiro email ao site live — garantido.</p>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>

            {/* 05 — Suporte: proof card com snippet de testemunho */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.26, ease }}
            >
              <SpotlightCard>
                <div
                  className="h-full rounded-2xl border border-purple-400/10 bg-purple-400/[0.02] p-7 flex flex-col justify-between gap-4 hover:border-purple-400/15 transition-colors duration-300 min-h-[220px]"
                  style={{ boxShadow: "inset 0 1px 0 rgba(167,139,250,0.04)" }}
                >
                  <div className="flex items-start justify-between">
                    <div className="w-9 h-9 rounded-xl bg-purple-400/8 border border-purple-400/15 flex items-center justify-center">
                      <IconShield />
                    </div>
                    <span className="text-[11px] font-mono text-zinc-700">05</span>
                  </div>
                  {/* Proof snippet */}
                  <div className="rounded-lg border border-white/5 bg-zinc-950/50 p-3">
                    <p className="text-[10px] text-zinc-400 leading-relaxed italic">&ldquo;Não desapareceu após a entrega. Quando precisei de alterar o horário, foi em minutos.&rdquo;</p>
                    <p className="text-[10px] text-zinc-600 mt-1.5">— Dr. Rui Fernandes, Porto</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-200 mb-1">Suporte pós-lançamento</h3>
                    {/* copy #2: outcome */}
                    <p className="text-xs text-zinc-500 leading-relaxed">30 dias incluídos. Sem contratos de manutenção, sem mensalidades. O site é teu — para sempre.</p>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
