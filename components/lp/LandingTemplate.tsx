import Link from "next/link";
import type { LPPage } from "@/content/lp/pages";
import { LPIllustration } from "@/components/lp/SVGs";
import FAQAccordion from "@/components/lp/FAQAccordion";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];
void ease;

const comparisonRows = (copyFeature: string) => [
  { feature: copyFeature,              andre: true,       agency: "Às vezes", diy: false },
  { feature: "SEO técnico configurado", andre: true,       agency: true,       diy: false },
  { feature: "Google Maps activo",      andre: true,       agency: true,       diy: "Manual" },
  { feature: "Entrega em 10 dias",      andre: true,       agency: false,      diy: false },
  { feature: "Garantia de resultado",   andre: "60 dias",  agency: false,      diy: false },
  { feature: "Acompanhamento pessoal",  andre: true,       agency: false,      diy: false },
];

type CellVal = boolean | string;
function Cell({ v, highlight = false }: { v: CellVal; highlight?: boolean }) {
  if (v === true) return (
    <div className="flex justify-center">
      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${highlight ? "bg-emerald-400/15 border border-emerald-400/30" : "bg-zinc-800"}`}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={highlight ? "#34d399" : "#52525b"} strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
      </div>
    </div>
  );
  if (v === false) return (
    <div className="flex justify-center">
      <div className="w-6 h-6 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#3f3f46" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </div>
    </div>
  );
  return (
    <div className="flex justify-center">
      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${highlight ? "text-emerald-400 bg-emerald-400/10 border border-emerald-400/20" : "text-zinc-500 bg-zinc-800/60"}`}>{v}</span>
    </div>
  );
}

export default function LandingTemplate({ page }: { page: LPPage }) {
  const rows = comparisonRows(page.copyFeature);

  return (
    <main className="bg-zinc-950 min-h-[100dvh] w-full">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90dvh] flex items-center overflow-hidden">
        {/* Bg */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "56px 56px" }}/>
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-emerald-500/8 blur-[100px]"/>
          <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-emerald-400/25 to-transparent"/>
        </div>

        <div className="relative w-full max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20 pt-32 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left */}
            <div className="flex flex-col gap-7">
              {/* Badge */}
              <div className="inline-flex self-start items-center gap-2 pl-1 pr-4 py-1 rounded-full border border-white/8 bg-white/3">
                <div className="flex items-center gap-1.5 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-2.5 py-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 ping-slow"/>
                  <span className="text-[11px] font-semibold text-emerald-400 tracking-wide uppercase">{page.hero.badge}</span>
                </div>
              </div>

              {/* H1 */}
              <h1 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-bold tracking-[-0.03em] leading-[1.08] text-zinc-50">
                {page.hero.headline.map((line, i) => (
                  <span key={i}>
                    {i === page.hero.headline.length - 1
                      ? <span style={{ background: "linear-gradient(90deg,#34d399,#6ee7b7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{line}</span>
                      : line}
                    {i < page.hero.headline.length - 1 && <br/>}
                  </span>
                ))}
              </h1>

              {/* Sub */}
              <p className="text-base text-zinc-400 leading-relaxed max-w-[50ch]">{page.hero.sub}</p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/contacto"
                  className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-400 text-zinc-950 font-semibold text-sm hover:bg-emerald-300 transition-colors duration-200 active:scale-[0.97]"
                  style={{ boxShadow: "0 4px 24px rgba(52,211,153,0.25)" }}
                >
                  Marca uma conversa de 15 min
                  <svg className="group-hover:translate-x-0.5 transition-transform duration-200" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
                <Link href="/#garantia" className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/8 text-zinc-400 font-medium text-sm hover:text-zinc-100 hover:border-white/15 transition-all duration-200 active:scale-[0.97]">
                  Ver garantia
                </Link>
              </div>

              {/* Trust */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1.5">
                    {["#3b82f6","#8b5cf6","#ec4899","#f59e0b","#06b6d4"].map((c,i) => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-zinc-950" style={{ background: `linear-gradient(135deg,${c}55,${c}22)` }}/>
                    ))}
                  </div>
                  <span className="text-xs text-zinc-500"><span className="text-zinc-300 font-medium">30+</span> já aparecem no Google</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  <span className="text-xs text-zinc-500">Garantia 60 dias</span>
                </div>
              </div>
            </div>

            {/* Right — SVG */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="w-full max-w-[360px]">
                <LPIllustration type={page.svgType}/>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none"/>
      </section>

      {/* ── TRUST STRIP ──────────────────────────────────────────────── */}
      <section className="border-y border-white/5 bg-zinc-900/20">
        <div className="max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x md:divide-white/5">
            {[
              { value: "30+", label: "profissionais clientes" },
              { value: "4.9★", label: "avaliação média" },
              { value: "10 dias", label: "entrega garantida" },
              { value: "60 dias", label: "garantia ou devolução" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1 md:px-8">
                <p className="text-xl font-bold text-zinc-50 font-mono tracking-tight">{s.value}</p>
                <p className="text-[11px] text-zinc-500 text-center">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM ──────────────────────────────────────────────────── */}
      <section className="py-24 max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-3 max-w-2xl">
            <p className="text-[11px] font-semibold text-zinc-600 uppercase tracking-[0.15em]">O problema</p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-50 leading-tight">
              O que está a acontecer<br/>
              <span className="text-zinc-500 font-normal">enquanto não tens presença online.</span>
            </h2>
            <p className="text-base text-zinc-500 leading-relaxed">{page.problem.intro}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {page.problem.points.map((pt) => (
              <div key={pt.title} className="flex flex-col gap-4 p-6 rounded-2xl border border-white/6 bg-zinc-900/40" style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)" }}>
                <span className="text-2xl">{pt.icon}</span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm font-semibold text-zinc-200">{pt.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{pt.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────── */}
      <section className="py-12 border-y border-white/5 bg-zinc-900/20">
        <div className="max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {page.stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1 p-7 rounded-2xl border border-white/6 bg-zinc-900/40 text-center" style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)" }}>
                <p className="text-4xl font-bold text-zinc-50 font-mono tracking-tight">{s.value}</p>
                <p className="text-sm font-semibold text-zinc-300 mt-1">{s.label}</p>
                <p className="text-xs text-zinc-600">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMO FUNCIONA ────────────────────────────────────────────── */}
      <section className="py-24 max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20" id="como-funciona">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-3 max-w-xl">
            <p className="text-[11px] font-semibold text-zinc-600 uppercase tracking-[0.15em]">Como funciona</p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-50 leading-tight">
              Do contacto ao site live<br/>
              <span className="text-zinc-500 font-normal">em 3 passos simples.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: "01", title: "Conversa de 15 min", body: "Falamos sobre a tua especialidade, os teus pacientes-alvo e os teus objectivos. Sem formulários longos, sem burocracia." },
              { n: "02", title: "Eu faço tudo", body: "Escrevo o copy, crio o design, configuro o SEO e activo o Google Maps. Em 10 dias apresento-te o resultado para aprovação." },
              { n: "03", title: "Site live + garantia", body: "O site fica live e começa a trabalhar por ti. Se não aparecer no Google em 60 dias, devolvo 100% do valor — sem condições." },
            ].map((step) => (
              <div key={step.n} className="relative flex flex-col gap-5 p-7 rounded-2xl border border-white/6 bg-zinc-900/40">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-emerald-400 font-mono">{step.n}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-semibold text-zinc-100">{step.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ─────────────────────────────────────────── */}
      <section className="py-24 bg-zinc-900/20 border-y border-white/5">
        <div className="max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20 flex flex-col gap-10">
          <div className="flex flex-col gap-3 max-w-xl">
            <p className="text-[11px] font-semibold text-zinc-600 uppercase tracking-[0.15em]">Comparação</p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-50 leading-tight">
              Porque é diferente<br/>
              <span className="text-zinc-500 font-normal">de uma agência ou fazer sozinho.</span>
            </h2>
          </div>

          <div style={{ maxWidth: "100vw", overflow: "hidden" }}>
            <div className="overflow-x-auto rounded-2xl border border-white/6" style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}>
              <table className="w-full min-w-[520px] border-collapse">
                <thead>
                  <tr className="border-b border-white/6">
                    <th className="text-left px-6 py-4 text-[11px] font-semibold text-zinc-600 uppercase tracking-wider w-[40%]">O que inclui</th>
                    <th className="px-4 py-4 text-center relative">
                      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"/>
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
                  {rows.map((row) => (
                    <tr key={row.feature} className="border-b border-white/4 last:border-0 hover:bg-white/[0.015] transition-colors">
                      <td className="px-6 py-4 text-sm text-zinc-400">{row.feature}</td>
                      <td className="px-4 py-4 bg-emerald-400/[0.03]"><Cell v={row.andre} highlight/></td>
                      <td className="px-4 py-4"><Cell v={row.agency}/></td>
                      <td className="px-4 py-4"><Cell v={row.diy}/></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="py-24 max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="flex flex-col gap-4 lg:sticky lg:top-28">
            <p className="text-[11px] font-semibold text-zinc-600 uppercase tracking-[0.15em]">FAQ</p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-50 leading-tight">
              Perguntas frequentes<br/>
              <span className="text-zinc-500 font-normal">sobre este serviço.</span>
            </h2>
            <p className="text-sm text-zinc-500 leading-relaxed">Se a tua pergunta não estiver aqui, fala comigo directamente — respondo em menos de 24h.</p>
            <Link href="/contacto" className="self-start inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-full border border-white/8 text-zinc-400 text-sm hover:text-zinc-100 hover:border-white/15 transition-all duration-200">
              Faz a tua pergunta →
            </Link>
          </div>
          <FAQAccordion faqs={page.faq}/>
        </div>
      </section>

      {/* ── TESTIMONIAL ──────────────────────────────────────────────── */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20">
          <div className="p-8 md:p-10 rounded-2xl border border-emerald-400/10 bg-emerald-400/3" style={{ boxShadow: "inset 0 1px 0 rgba(52,211,153,0.05)" }}>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="13" height="13" viewBox="0 0 12 12" fill="#34d399"><path d="M6 1l1.5 3 3.3.5-2.4 2.3.6 3.2L6 8.5 3 10l.6-3.2L1.2 4.5l3.3-.5z"/></svg>
                  ))}
                </div>
                <blockquote className="text-base text-zinc-300 leading-relaxed italic mb-6">
                  &ldquo;{page.testimonial.text}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ background: page.testimonial.color + "22", color: page.testimonial.color, border: `1px solid ${page.testimonial.color}33` }}
                  >
                    {page.testimonial.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-200">{page.testimonial.name}</p>
                    <p className="text-xs text-zinc-500">{page.testimonial.role} · {page.testimonial.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────── */}
      <section className="py-24 max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20" id="contacto">
        <div className="relative flex flex-col items-center text-center gap-7 py-20 px-6 rounded-3xl border border-white/6 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent"/>
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-emerald-500/5 blur-[80px]"/>
          </div>
          <div className="relative flex flex-col items-center gap-6">
            <p className="text-[11px] font-semibold text-zinc-600 uppercase tracking-[0.15em]">Pronto para crescer</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-50 leading-tight max-w-lg">
              A próxima consulta<br/>
              <span className="text-zinc-500 font-normal">pode vir do Google.</span>
            </h2>
            <p className="text-base text-zinc-500 leading-relaxed max-w-[44ch]">
              Marca uma conversa gratuita de 15 minutos. Sem compromisso. Se não fizer sentido trabalharmos juntos, digo-o directamente.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-emerald-400 text-zinc-950 font-semibold text-sm hover:bg-emerald-300 transition-colors duration-200 active:scale-[0.97]"
                style={{ boxShadow: "0 4px 32px rgba(52,211,153,0.3)" }}
              >
                Marca uma conversa de 15 min
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-zinc-600">
              <span className="flex items-center gap-1.5">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                Conversa gratuita
              </span>
              <span className="flex items-center gap-1.5">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                Entrega em 10 dias
              </span>
              <span className="flex items-center gap-1.5">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                Garantia 60 dias
              </span>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
