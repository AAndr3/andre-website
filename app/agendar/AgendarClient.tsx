"use client";

import { useEffect, useState } from "react";

const CALENDLY_URL = "https://calendly.com/andre-andreantunes/chamada-com-andre";

const RESULTS = [
  { name: "Dr. Miguel Lima",    specialty: "Fisioterapeuta · Lisboa",    result: "+14 novos pacientes no 1.º mês"   },
  { name: "Dra. Rita Santos",   specialty: "Médica Dentista · Porto",    result: "1.ª posição no Google em 6 semanas" },
  { name: "Dr. André Barbosa",  specialty: "Osteopata · Coimbra",        result: "Agenda cheia em 8 semanas"        },
];

const WHAT_HAPPENS = [
  { n: "01", title: "Analisamos o teu mercado", body: "Vejo exactamente quantas pessoas pesquisam pela tua especialidade na tua cidade e o que os teus concorrentes estão a fazer." },
  { n: "02", title: "Digo-te o que fazer", body: "Não chego à chamada de mãos vazias. Trago dados concretos e um plano para os primeiros 30 dias." },
  { n: "03", title: "Decides sem pressão", body: "Se fizer sentido trabalharmos juntos, explico como. Se não, fica com o plano na mesma. Sem compromisso." },
];

const ABOUT = [
  "Trabalho exclusivamente com profissionais de saúde em Portugal.",
  "Mais de 3 anos a ajudar clínicas e consultórios a aparecer no Google.",
  "Resultados mensuráveis: mais visitas ao site, mais chamadas, mais consultas.",
  "Sem contratos longos. Sem jargão técnico. Só resultados.",
];

export default function AgendarClient() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => setLoaded(true);
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-10 lg:px-20">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <div className="text-center max-w-[680px] mx-auto pt-8 pb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/6 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-[0.12em]">Conversa gratuita · 15 minutos</span>
        </div>
        <h1 className="text-3xl md:text-[2.6rem] font-bold tracking-tight leading-[1.1] text-zinc-50 mb-4">
          Antes de falarmos,<br />
          <span className="text-zinc-400 font-normal">aqui está o que podes esperar.</span>
        </h1>
        <p className="text-base text-zinc-500 leading-relaxed max-w-[50ch] mx-auto">
          Não é uma chamada de vendas. É uma análise real do teu mercado — e um plano concreto para ganhares mais pacientes pelo Google.
        </p>
      </div>

      {/* ── Main grid ────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-12 lg:gap-16 items-start">

        {/* Left — context */}
        <div className="flex flex-col gap-12">

          {/* About André */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8">
            <div className="flex items-start gap-5 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center flex-shrink-0 text-emerald-400 font-bold text-lg">
                AA
              </div>
              <div>
                <p className="text-base font-semibold text-zinc-50">André Antunes</p>
                <p className="text-sm text-zinc-500 mt-0.5">Especialista em presença online para profissionais de saúde</p>
              </div>
            </div>
            <ul className="flex flex-col gap-3">
              {ABOUT.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <span className="text-sm text-zinc-400 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What happens */}
          <div>
            <p className="text-[11px] font-semibold text-zinc-600 uppercase tracking-[0.15em] mb-6">O que acontece na chamada</p>
            <div className="flex flex-col gap-6">
              {WHAT_HAPPENS.map((step) => (
                <div key={step.n} className="flex gap-5">
                  <span className="text-[11px] font-mono font-bold text-emerald-400/60 mt-0.5 w-6 flex-shrink-0">{step.n}</span>
                  <div>
                    <p className="text-sm font-semibold text-zinc-200 mb-1">{step.title}</p>
                    <p className="text-sm text-zinc-500 leading-relaxed">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Results */}
          <div>
            <p className="text-[11px] font-semibold text-zinc-600 uppercase tracking-[0.15em] mb-5">Resultados reais</p>
            <div className="flex flex-col gap-3">
              {RESULTS.map((r) => (
                <div key={r.name} className="flex items-center justify-between gap-4 rounded-xl border border-zinc-800 bg-zinc-900/40 px-5 py-4">
                  <div>
                    <p className="text-sm font-semibold text-zinc-200">{r.name}</p>
                    <p className="text-xs text-zinc-600 mt-0.5">{r.specialty}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-xs font-semibold text-emerald-400">{r.result}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reassurance */}
          <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 px-6 py-5 flex gap-4 items-start">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" className="flex-shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg>
            <p className="text-sm text-zinc-500 leading-relaxed">
              <span className="text-zinc-300 font-medium">Não há compromisso nenhum.</span> Esta chamada é completamente gratuita. Se no final não fizer sentido avançar, fica com a análise e o plano na mesma — sem custos, sem pressão.
            </p>
          </div>
        </div>

        {/* Right — Calendly */}
        <div className="sticky top-24">
          <div className="rounded-2xl border border-zinc-800 overflow-hidden bg-zinc-900/30">
            <div className="px-6 py-5 border-b border-zinc-800/60">
              <p className="text-sm font-semibold text-zinc-200">Escolhe o teu horário</p>
              <p className="text-xs text-zinc-600 mt-1">Disponibilidade actualizada em tempo real</p>
            </div>
            <div
              className="calendly-inline-widget"
              data-url={`${CALENDLY_URL}?hide_event_type_details=1&hide_gdpr_banner=1&background_color=111111&text_color=fafafa&primary_color=34d399`}
              style={{ minWidth: 320, height: 660 }}
            />
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/80 rounded-2xl">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 rounded-full border-2 border-emerald-400/30 border-t-emerald-400 animate-spin" />
                  <p className="text-xs text-zinc-500">A carregar calendário…</p>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
