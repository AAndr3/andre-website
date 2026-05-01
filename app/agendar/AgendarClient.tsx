"use client";

import { useRef, useState } from "react";

const VALUE_STACK = [
  { outcome: "Pacientes a encontrarem-te antes dos teus concorrentes no Google",    value: "3.600€" },
  { outcome: "Site construído para converter visitantes em marcações",               value: "2.500€" },
  { outcome: "Perfil Google optimizado — 1.ª impressão para novos pacientes",       value: "500€"   },
  { outcome: "Análise da concorrência — sabes porque é que eles aparecem primeiro", value: "400€"   },
  { outcome: "Relatório mensal: quantos pacientes vieram do Google",                 value: "600€"   },
  { outcome: "Acesso directo (WhatsApp) — sem agência no meio",                     value: "600€"   },
];

const RESULTS = [
  { initials: "LS", name: "Dra. Lúcia Silva",  specialty: "Psicóloga Clínica · Mafra", before: "Sem visibilidade no Google", after: "1.ª posição — 'psicóloga mafra'", time: "3 semanas" },
  { initials: "ML", name: "Dr. Miguel Lima",   specialty: "Fisioterapeuta · Lisboa",   before: "8 marcações/semana",         after: "22 marcações/semana",             time: "6 semanas" },
  { initials: "RS", name: "Dra. Rita Santos",  specialty: "Médica Dentista · Porto",   before: "Página 3 do Google",         after: "1.ª posição no Google",           time: "47 dias"  },
  { initials: "AB", name: "Dr. André Barbosa", specialty: "Osteopata · Coimbra",       before: "Agenda a meio",              after: "Agenda cheia em 2 meses",         time: "8 semanas" },
];

const FAQ = [
  { q: "Já tive uma agência e não resultou.",   a: "Agências generalistas fazem publicidade para restaurantes, lojas e clínicas ao mesmo tempo. Eu só trabalho com saúde — sei exactamente que palavras os teus pacientes pesquisam." },
  { q: "Quando começo a ver resultados?",        a: "Primeiros leads nos primeiros 30 dias. 1.ª página do Google garantida em 90. Se não chegar lá, devolvo 100% do valor." },
  { q: "Tenho de assinar um contrato longo?",    a: "Não. A única razão para ficares é porque a agenda está a encher." },
];

const PACIENTES_OPTS = ["Menos de 20", "Entre 20 e 30", "Entre 30 e 50", "Entre 50 e 80", "Mais de 80"];
const ORCAMENTO_OPTS = ["Até 200€", "Entre 200€ e 500€", "Mais de 500€", "Ainda não decidi"];

/* ── Multi-step form ─────────────────────────────────────────── */
type Step = 1 | 2 | 3;

interface FormData {
  name: string;
  email: string;
  phone: string;
  pacientes: string;
  orcamento: string;
  problema: string;
}

function BookingForm({ onScrollTo }: { onScrollTo: () => void }) {
  const [step, setStep]       = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [form, setForm]       = useState<FormData>({
    name: "", email: "", phone: "",
    pacientes: "", orcamento: "", problema: "",
  });

  function set(field: keyof FormData, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function step1Valid() {
    return form.name.trim() && form.email.includes("@") && form.phone.trim().length >= 9;
  }
  function step2Valid() {
    return form.pacientes && form.orcamento && form.problema.trim();
  }

  async function submit() {
    setLoading(true);
    setError("");
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:      form.name,
          email:     form.email,
          phone:     form.phone,
          source:    "agendar",
          specialty: form.pacientes,
          patients:  parseInt(form.pacientes.match(/\d+/)?.[0] ?? "0") || 0,
          orcamento: form.orcamento,
          problema:  form.problema,
          notes:     `Orçamento: ${form.orcamento} | Problema: ${form.problema}`,
        }),
      });
      setStep(3);
    } catch {
      setError("Algo correu mal. Tenta de novo.");
    } finally {
      setLoading(false);
    }
  }

  /* ── Progress bar ──────────────────────────────────────────── */
  const steps = ["Os teus dados", "O teu consultório", "Confirmação"];

  return (
    <div className="rounded-2xl border border-zinc-200 overflow-hidden shadow-sm bg-white">

      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-zinc-100">
        <p className="text-sm font-bold text-zinc-800 mb-3">
          {step < 3 ? "Marcar conversa gratuita · 15 min" : "Recebemos o teu pedido"}
        </p>

        {/* Step indicators */}
        {step < 3 && (
          <div className="flex items-center gap-1.5">
            {steps.slice(0, 2).map((s, i) => {
              const n = (i + 1) as Step;
              const done    = step > n;
              const current = step === n;
              return (
                <div key={s} className="flex items-center gap-1.5 flex-1">
                  <div className={`flex items-center gap-1.5 ${i > 0 ? "flex-1" : ""}`}>
                    {i > 0 && <div className={`h-px flex-1 rounded ${done || current ? "bg-emerald-500" : "bg-zinc-200"}`} />}
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-bold transition-colors ${
                      done    ? "bg-emerald-500 text-white" :
                      current ? "bg-emerald-50 border-2 border-emerald-500 text-emerald-600" :
                                "bg-zinc-100 text-zinc-400"
                    }`}>
                      {done ? (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                      ) : n}
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="h-px flex-1 rounded bg-zinc-200" />
          </div>
        )}
      </div>

      {/* ── STEP 1 — Dados pessoais ──────────────────────────── */}
      {step === 1 && (
        <div className="px-5 py-5 flex flex-col gap-4">
          <p className="text-xs text-zinc-500 leading-relaxed">
            Vamos falar sobre o teu consultório, os teus números e o que queres alcançar. No fim da call ficamos a saber se faz sentido avançar — ou não.
          </p>

          <div className="flex flex-col gap-3">
            <Field label="Nome completo" required>
              <input
                type="text"
                placeholder="Dr. Maria Silva"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-200 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all"
              />
            </Field>
            <Field label="Email profissional" required>
              <input
                type="email"
                placeholder="maria@consultorio.pt"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-200 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all"
              />
            </Field>
            <Field label="Telemóvel" required>
              <input
                type="tel"
                placeholder="912 345 678"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-200 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all"
              />
            </Field>
          </div>

          <button
            onClick={() => step1Valid() && setStep(2)}
            disabled={!step1Valid()}
            className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-200 disabled:text-zinc-400 disabled:cursor-not-allowed text-white font-bold text-sm transition-colors flex items-center justify-center gap-2"
          >
            Continuar
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>

          <p className="text-[11px] text-zinc-400 text-center">Sem compromisso. Sem follow up insistente.</p>
        </div>
      )}

      {/* ── STEP 2 — Qualificação ────────────────────────────── */}
      {step === 2 && (
        <div className="px-5 py-5 flex flex-col gap-5">

          <Field label="Quantos pacientes atendes em média por mês?" required>
            <div className="flex flex-col gap-1.5 mt-1">
              {PACIENTES_OPTS.map((opt) => (
                <label key={opt} className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg border cursor-pointer transition-all ${
                  form.pacientes === opt
                    ? "border-emerald-400 bg-emerald-50"
                    : "border-zinc-200 hover:border-zinc-300"
                }`}>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    form.pacientes === opt ? "border-emerald-500" : "border-zinc-300"
                  }`}>
                    {form.pacientes === opt && <div className="w-2 h-2 rounded-full bg-emerald-500" />}
                  </div>
                  <span className="text-sm text-zinc-700">{opt}</span>
                  <input type="radio" className="sr-only" checked={form.pacientes === opt} onChange={() => set("pacientes", opt)} />
                </label>
              ))}
            </div>
          </Field>

          <Field label="Orçamento mensal disponível para marketing?" required>
            <div className="flex flex-col gap-1.5 mt-1">
              {ORCAMENTO_OPTS.map((opt) => (
                <label key={opt} className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg border cursor-pointer transition-all ${
                  form.orcamento === opt
                    ? "border-emerald-400 bg-emerald-50"
                    : "border-zinc-200 hover:border-zinc-300"
                }`}>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    form.orcamento === opt ? "border-emerald-500" : "border-zinc-300"
                  }`}>
                    {form.orcamento === opt && <div className="w-2 h-2 rounded-full bg-emerald-500" />}
                  </div>
                  <span className="text-sm text-zinc-700">{opt}</span>
                  <input type="radio" className="sr-only" checked={form.orcamento === opt} onChange={() => set("orcamento", opt)} />
                </label>
              ))}
            </div>
          </Field>

          <Field label="O que mais te incomoda hoje no teu consultório?" required>
            <textarea
              rows={3}
              placeholder="Escreve à vontade..."
              value={form.problema}
              onChange={(e) => set("problema", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-200 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all resize-none mt-1"
            />
          </Field>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <div className="flex gap-2">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-3 rounded-xl border border-zinc-200 text-sm text-zinc-500 hover:border-zinc-300 hover:text-zinc-700 transition-colors"
            >
              Voltar
            </button>
            <button
              onClick={submit}
              disabled={!step2Valid() || loading}
              className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-200 disabled:text-zinc-400 disabled:cursor-not-allowed text-white font-bold text-sm transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <>Enviar pedido<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></>
              )}
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 3 — Confirmação ─────────────────────────────── */}
      {step === 3 && (
        <div className="px-5 py-8 flex flex-col items-center text-center gap-4">
          <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
              <path d="M22 4L12 14.01l-3-3"/>
            </svg>
          </div>
          <div>
            <p className="text-base font-bold text-zinc-800 mb-1">Pedido recebido.</p>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-[260px]">
              Vou entrar em contacto nas próximas 24 horas para confirmar o horário da call.
            </p>
          </div>
          <div className="w-full pt-2 border-t border-zinc-100">
            <p className="text-xs text-zinc-400 mb-3">Preferes marcar já um horário?</p>
            <a
              href="https://calendly.com/andre-andreantunes/chamada-com-andre"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-zinc-200 text-sm text-zinc-600 hover:border-emerald-400 hover:text-emerald-600 transition-colors"
            >
              Escolher horário no Calendly
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-zinc-600 mb-1">
        {label}{required && <span className="text-emerald-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

function Check() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3.5">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export default function AgendarClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const formRef               = useRef<HTMLDivElement>(null);

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="bg-white min-h-screen">

      {/* ── SCARCITY BANNER ──────────────────────────────────────── */}
      <div className="bg-amber-50 border-b border-amber-200 px-5 py-3 flex items-center justify-center gap-2.5">
        <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
        <p className="text-xs text-amber-800 text-center leading-snug">
          <span className="font-bold">Só aceito 3 novos clientes por mês.</span>
          {" "}1 por especialidade e cidade. Quando as vagas fecham, fecham.
        </p>
      </div>

      <div className="max-w-[1160px] mx-auto px-5 md:px-10 lg:px-20">

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <div className="pt-12 pb-14 max-w-[640px]">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-5">
            Para clínicas e consultórios em Portugal
          </p>
          <h1 className="text-[1.9rem] md:text-[2.75rem] font-bold tracking-tight leading-[1.1] text-zinc-900 mb-5">
            Todos os dias perdes pacientes para o teu concorrente.
            <span className="text-zinc-400"> Ele aparece no Google. Tu não.</span>
          </h1>
          <p className="text-[15px] text-zinc-500 leading-relaxed mb-8">
            A diferença entre uma agenda cheia e uma agenda meio vazia é quase sempre uma coisa: quem aparece primeiro na pesquisa. Eu trato disso.
          </p>
          <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
            <div className="w-5 h-5 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check />
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900">+10 pacientes/mês em 90 dias.</p>
              <p className="text-sm text-zinc-500">Ou trabalho de graça até lá chegares.</p>
            </div>
          </div>
        </div>

        {/* ── GRID ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 lg:gap-14 items-start">

          {/* ── LEFT ───────────────────────────────────────────────── */}
          <div className="flex flex-col gap-12">

            {/* HOW IT WORKS */}
            <div>
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">Como funciona</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { n: "01", title: "Auditoria",    desc: "Analiso o que os concorrentes fazem e que palavras os teus pacientes pesquisam." },
                  { n: "02", title: "Optimização",  desc: "Site e Google optimizados para a tua especialidade e cidade." },
                  { n: "03", title: "Resultados",   desc: "Apareces primeiro. Os primeiros leads chegam nos primeiros 30 dias." },
                ].map((s) => (
                  <div key={s.n} className="border border-zinc-200 rounded-xl px-4 py-4 bg-zinc-50">
                    <p className="text-[10px] font-bold text-emerald-600/60 tracking-[0.2em] mb-2">{s.n}</p>
                    <p className="text-sm font-bold text-zinc-800 mb-1">{s.title}</p>
                    <p className="text-xs text-zinc-500 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* VALUE STACK */}
            <div>
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">O que recebes</p>
              <div className="border border-zinc-200 rounded-xl overflow-hidden divide-y divide-zinc-100">
                {VALUE_STACK.map((v) => (
                  <div key={v.outcome} className="flex items-start gap-3 px-4 py-3.5 bg-white">
                    <div className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-zinc-700 leading-snug">{v.outcome}</p>
                      <p className="text-xs text-zinc-400 mt-0.5">{v.value}</p>
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-between gap-4 px-4 py-3.5 bg-zinc-50">
                  <p className="text-sm font-bold text-zinc-600">Valor total</p>
                  <p className="text-base font-bold text-zinc-400 line-through">8.200€</p>
                </div>
              </div>
              <div className="mt-2.5 border-2 border-emerald-500 rounded-xl px-5 py-5 flex items-center justify-between gap-4 bg-white">
                <div>
                  <p className="text-sm font-bold text-zinc-900">O teu investimento</p>
                  <p className="text-xs text-zinc-400 mt-0.5">A partir de. Discutimos na call.</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[1.9rem] font-bold text-emerald-600 leading-none">950€</p>
                  <p className="text-[11px] text-zinc-400 mt-1">em vez de 8.200€</p>
                </div>
              </div>
            </div>

            {/* GUARANTEE */}
            <div className="rounded-2xl bg-emerald-600 px-6 py-8 text-center">
              <div className="mx-auto mb-4 w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.75">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="M9 12l2 2 4-4" strokeWidth="2.5"/>
                </svg>
              </div>
              <p className="text-xs font-semibold text-emerald-200/70 uppercase tracking-widest mb-3">Garantia</p>
              <p className="text-xl md:text-2xl font-bold text-white leading-snug mb-3">
                1.ª página do Google em 90 dias —{" "}
                <span className="text-emerald-200">ou trabalho de graça até lá chegares.</span>
              </p>
              <p className="text-sm text-emerald-100/70 max-w-[380px] mx-auto leading-relaxed">
                Se não cumprires o objectivo em 90 dias, continuo a trabalhar sem cobrar. Sem excepções, sem letras pequenas.
              </p>
            </div>

            {/* SOCIAL PROOF */}
            <div>
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">Clientes que já chegaram lá</p>
              <div className="flex flex-col gap-2.5">
                {RESULTS.map((r) => (
                  <div key={r.name} className="border border-zinc-200 rounded-xl px-4 py-4 bg-white">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-[10px] font-bold text-zinc-500 flex-shrink-0">
                        {r.initials}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-zinc-800">{r.name}</p>
                        <p className="text-[11px] text-zinc-400">{r.specialty}</p>
                      </div>
                      <span className="ml-auto text-[11px] text-zinc-400 flex-shrink-0">{r.time}</span>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2">
                        <p className="text-[10px] text-zinc-400 mb-1">Antes</p>
                        <p className="text-xs text-zinc-600">{r.before}</p>
                      </div>
                      <div className="flex-1 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                        <p className="text-[10px] text-emerald-600/70 mb-1">Depois</p>
                        <p className="text-xs font-semibold text-emerald-700">{r.after}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div>
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">Perguntas frequentes</p>
              <div className="flex flex-col gap-2">
                {FAQ.map((f, i) => (
                  <div key={i} className="border border-zinc-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left bg-white hover:bg-zinc-50 transition-colors"
                    >
                      <span className="text-sm font-medium text-zinc-800">{f.q}</span>
                      <svg
                        width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="2"
                        className={`flex-shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                      >
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </button>
                    {openFaq === i && (
                      <div className="px-4 py-3.5 border-t border-zinc-100 bg-zinc-50">
                        <p className="text-sm text-zinc-500 leading-relaxed">{f.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* MOBILE CTA */}
            <div className="lg:hidden pb-2">
              <button
                onClick={scrollToForm}
                className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 transition-colors text-white font-bold text-sm shadow-lg shadow-emerald-600/20"
              >
                Garantir o meu lugar — 15 min gratuitos
              </button>
              <p className="text-xs text-zinc-400 text-center mt-2">Sem compromisso. Cancelas quando quiseres.</p>
            </div>

          </div>

          {/* ── RIGHT — Form sticky ─────────────────────────────────── */}
          <div className="sticky top-8" ref={formRef}>
            <BookingForm onScrollTo={scrollToForm} />
            <p className="text-xs text-zinc-400 text-center mt-3">
              Já há clientes na tua especialidade e cidade à espera de vaga.
            </p>
          </div>

        </div>

        <div className="h-20" />
      </div>
    </div>
  );
}
