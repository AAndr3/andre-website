"use client";

import { useState } from "react";

const WHATSAPP  = "https://wa.me/351960442568";

const PACIENTES_OPTS = ["Menos de 20", "Entre 20 e 30", "Entre 30 e 50", "Entre 50 e 80", "Mais de 80"];
const ORCAMENTO_OPTS = ["Até 200€", "Entre 200€ e 500€", "Mais de 500€", "Ainda não decidi"];

/* ── Booking modal ─────────────────────────────────────────────── */
function BookingModal({ onClose }: { onClose: () => void }) {
  type Step = 1 | 2 | 3;
  const [step, setStep]       = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [form, setForm]       = useState({ name: "", email: "", phone: "", pacientes: "", orcamento: "", problema: "" });

  function set(field: string, value: string) { setForm((f) => ({ ...f, [field]: value })); }
  const step1Valid = () => form.name.trim() && form.email.includes("@") && form.phone.trim().length >= 9;
  const step2Valid = () => form.pacientes && form.orcamento && form.problema.trim();

  async function submit() {
    setLoading(true); setError("");
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name, email: form.email, phone: form.phone,
          source: "oferta", specialty: form.pacientes,
          patients: parseInt(form.pacientes.match(/\d+/)?.[0] ?? "0") || 0,
          notes: `Orçamento: ${form.orcamento} | Problema: ${form.problema}`,
        }),
      });
      setStep(3);
    } catch { setError("Algo correu mal. Tenta de novo."); }
    finally { setLoading(false); }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-[560px] max-h-[90dvh] overflow-y-auto rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
          <p className="text-sm font-bold text-zinc-100">
            {step < 3 ? "Marcar conversa gratuita · 15 min" : "Pedido recebido"}
          </p>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Step indicators */}
        {step < 3 && (
          <div className="px-5 pt-4 pb-0 flex items-center gap-1.5">
            {["Os teus dados", "O teu consultório"].map((s, i) => {
              const n = i + 1;
              const done = step > n; const current = step === n;
              return (
                <div key={s} className={`flex items-center gap-1.5 ${i > 0 ? "flex-1" : ""}`}>
                  {i > 0 && <div className={`h-px flex-1 rounded ${done || current ? "bg-emerald-400" : "bg-zinc-700"}`} />}
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-bold transition-colors ${
                    done    ? "bg-emerald-400 text-zinc-950" :
                    current ? "bg-transparent border-2 border-emerald-400 text-emerald-400" :
                              "bg-zinc-800 text-zinc-500"
                  }`}>
                    {done ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg> : n}
                  </div>
                </div>
              );
            })}
            <div className="h-px flex-1 rounded bg-zinc-700" />
          </div>
        )}

        {/* ── Step 1 ── */}
        {step === 1 && (
          <div className="px-5 py-5 flex flex-col gap-4">
            <p className="text-xs text-zinc-500 leading-relaxed">
              Vamos falar sobre o teu consultório, os teus números e o que queres alcançar. No fim da call ficamos a saber se faz sentido avançar.
            </p>
            {[
              { label: "Nome completo", field: "name", type: "text",  placeholder: "Dr. Maria Silva" },
              { label: "Email profissional", field: "email", type: "email", placeholder: "maria@consultorio.pt" },
              { label: "Telemóvel", field: "phone", type: "tel",   placeholder: "912 345 678" },
            ].map(({ label, field, type, placeholder }) => (
              <div key={field}>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">{label}<span className="text-emerald-400 ml-0.5">*</span></label>
                <input
                  type={type} placeholder={placeholder}
                  value={(form as Record<string, string>)[field]}
                  onChange={(e) => set(field, e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-zinc-800 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 focus:border-emerald-400/50 transition-all"
                />
              </div>
            ))}
            <button
              onClick={() => step1Valid() && setStep(2)}
              disabled={!step1Valid()}
              className="w-full py-3.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 disabled:bg-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed text-zinc-950 font-bold text-sm transition-colors flex items-center justify-center gap-2"
            >
              Continuar
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <p className="text-[11px] text-zinc-600 text-center">Sem compromisso. Sem follow up insistente.</p>
          </div>
        )}

        {/* ── Step 2 ── */}
        {step === 2 && (
          <div className="px-5 py-5 flex flex-col gap-5">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-2">Quantos pacientes atendes em média por mês?<span className="text-emerald-400 ml-0.5">*</span></label>
              <div className="flex flex-col gap-1.5">
                {PACIENTES_OPTS.map((opt) => (
                  <label key={opt} className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg border cursor-pointer transition-all ${
                    form.pacientes === opt ? "border-emerald-400/50 bg-emerald-400/8" : "border-zinc-700 hover:border-zinc-600"
                  }`}>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${form.pacientes === opt ? "border-emerald-400" : "border-zinc-600"}`}>
                      {form.pacientes === opt && <div className="w-2 h-2 rounded-full bg-emerald-400" />}
                    </div>
                    <span className="text-sm text-zinc-300">{opt}</span>
                    <input type="radio" className="sr-only" checked={form.pacientes === opt} onChange={() => set("pacientes", opt)} />
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-2">Orçamento mensal disponível para marketing?<span className="text-emerald-400 ml-0.5">*</span></label>
              <div className="flex flex-col gap-1.5">
                {ORCAMENTO_OPTS.map((opt) => (
                  <label key={opt} className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg border cursor-pointer transition-all ${
                    form.orcamento === opt ? "border-emerald-400/50 bg-emerald-400/8" : "border-zinc-700 hover:border-zinc-600"
                  }`}>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${form.orcamento === opt ? "border-emerald-400" : "border-zinc-600"}`}>
                      {form.orcamento === opt && <div className="w-2 h-2 rounded-full bg-emerald-400" />}
                    </div>
                    <span className="text-sm text-zinc-300">{opt}</span>
                    <input type="radio" className="sr-only" checked={form.orcamento === opt} onChange={() => set("orcamento", opt)} />
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">O que mais te incomoda hoje no teu consultório?<span className="text-emerald-400 ml-0.5">*</span></label>
              <textarea
                rows={3} placeholder="Escreve à vontade..."
                value={form.problema} onChange={(e) => set("problema", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-zinc-800 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 focus:border-emerald-400/50 transition-all resize-none mt-1"
              />
            </div>

            {error && <p className="text-xs text-red-400">{error}</p>}

            <div className="flex gap-2">
              <button onClick={() => setStep(1)} className="px-4 py-3 rounded-xl border border-zinc-700 text-sm text-zinc-500 hover:border-zinc-600 hover:text-zinc-300 transition-colors">
                Voltar
              </button>
              <button
                onClick={submit} disabled={!step2Valid() || loading}
                className="flex-1 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 disabled:bg-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed text-zinc-950 font-bold text-sm transition-colors flex items-center justify-center gap-2"
              >
                {loading
                  ? <div className="w-4 h-4 rounded-full border-2 border-zinc-600 border-t-zinc-950 animate-spin" />
                  : <><span>Enviar pedido</span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></>
                }
              </button>
            </div>
          </div>
        )}

        {/* ── Step 3 ── */}
        {step === 3 && (
          <div className="flex flex-col">
            <div className="px-5 py-5 flex items-center gap-3 border-b border-zinc-800">
              <div className="w-8 h-8 rounded-full bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-100">Pedido recebido. Escolhe o horário.</p>
                <p className="text-xs text-zinc-500">Selecciona o dia e hora que preferires.</p>
              </div>
            </div>
            <iframe
              src="https://calendly.com/andre-andreantunes/marcaly?hide_event_type_details=1&hide_gdpr_banner=1&background_color=18181b&text_color=f4f4f5&primary_color=34d399"
              className="w-full border-0"
              style={{ height: 520 }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Reusable CTA button ───────────────────────────────────────── */
function CTAButton({ label, secondary = false, onClick }: { label: string; secondary?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-sm transition-all duration-200 active:scale-[0.97] ${
        secondary
          ? "border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-zinc-100"
          : "bg-emerald-400 text-zinc-950 hover:bg-emerald-300 shadow-lg shadow-emerald-400/20"
      }`}
    >
      {label}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </button>
  );
}

/* ── Vagas indicator ───────────────────────────────────────────── */
function Vagas({ total = 5, fechadas = 1 }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`w-7 h-7 rounded-full border-2 flex items-center justify-center ${
            i < fechadas
              ? "bg-emerald-400/20 border-emerald-400"
              : "bg-zinc-900 border-zinc-700"
          }`}
        >
          {i < fechadas && (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="3">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          )}
        </div>
      ))}
      <span className="text-xs text-zinc-500 ml-1">{fechadas} de {total} vagas preenchidas</span>
    </div>
  );
}

/* ── Testimonials data ─────────────────────────────────────────── */
const LUCIA = {
  initials: "LS",
  name: "Lúcia Monteiro da Silva",
  role: "Psicóloga Clínica · Lisboa",
  quote: "Passei de 32 para 58 pacientes/mês em 4 meses.",
  before: "Antes do André, dependia de passa palavra e da minha conta de Instagram que ninguém via. Em Janeiro tinha agenda cheia, em Agosto vazia, e nunca percebia porquê. Tentei Google Ads sozinha duas vezes. Gastei dinheiro, não veio ninguém, desisti.",
  change: "O André montou-me o site de raiz, tratou do Google Business e começou a correr anúncios em duas semanas. Ao fim do primeiro mês já recebia marcações de pessoas que me encontraram a procurar \"psicóloga Lisboa\". Coisa que nunca me tinha acontecido em 6 anos de consultório.",
  today: "Hoje tenho lista de espera. Subi o preço da consulta de 60€ para 75€ e ninguém saiu. E pela primeira vez sinto que tenho um negócio, não uma roleta.",
  metric: "+81% pacientes",
  metricLabel: "em 4 meses",
};

const MORE_TESTIMONIALS = [
  {
    initials: "JP",
    name: "João Pereira Costa",
    role: "Psicólogo Clínico e Forense · Porto",
    quote: "Já tinha contratado duas agências antes. Esta foi a primeira vez que vi resultados.",
    before: "Tenho consultório há 14 anos. Sempre recusei mexer no online porque achava que o passa palavra chegava. Mas os últimos dois anos comecei a perder terreno para colegas mais novos com presença no Google.",
    change: "Contratei duas agências em três anos sem resultados. Quando o André me explicou o que ia fazer, gostei de uma coisa: falou em números, não em \"estratégia\". No primeiro mês recebi 11 marcações pelo Google. No terceiro, 23.",
    today: "Hoje não imagino o consultório sem este sistema. E percebo que o problema nunca foi o online — era quem geria.",
    metric: "18€",
    metricLabel: "custo médio por paciente",
  },
  {
    initials: "MF",
    name: "Mariana Ferreira",
    role: "Psicóloga especializada em Ansiedade · Braga",
    quote: "Saí de uma clínica para abrir consultório próprio. Em 5 meses, estava a facturar mais do que antes.",
    before: "Trabalhei 8 anos numa clínica em Braga e em Setembro decidi abrir consultório próprio. Tinha medo. Tinha pacientes que vinham comigo, mas não chegava para encher uma agenda inteira.",
    change: "O André começou comigo antes de eu sequer ter consultório aberto. Na primeira semana de consultório próprio já tinha 6 marcações de pessoas novas.",
    today: "Hoje, 5 meses depois, facturo 4.800€ por mês contra os 3.200€ que ganhava na clínica. E tenho a minha agenda, o meu espaço, e o meu nome.",
    metric: "0 → 41",
    metricLabel: "pacientes/mês em 5 meses",
  },
  {
    initials: "RA",
    name: "Ricardo Almeida",
    role: "Psicólogo Clínico · Coimbra",
    quote: "Não percebo nada de marketing e não quero perceber. Por isso paguei ao André.",
    before: "Atendo 9h por dia. Não tenho tempo nem paciência para aprender Instagram, Google Ads, SEO, nada disso. Queria que alguém tratasse de tudo.",
    change: "É exactamente isso que o André faz. Mando-lhe um WhatsApp uma vez por mês a perguntar como está, ele responde com os números.",
    today: "Tenho mais 14 pacientes/mês desde que começamos, e gastei zero horas em marketing.",
    metric: "+14 pac/mês",
    metricLabel: "0 horas investidas",
  },
  {
    initials: "CA",
    name: "Catarina Silva Antunes",
    role: "Psicóloga Clínica · Aveiro",
    quote: "Achei que era caro. Em 3 meses tinha pago o investimento de um ano.",
    before: "Quando o André me passou a proposta, hesitei. 297€ por mês mais anúncios pareceu-me muito para uma psicóloga em início de carreira como eu.",
    change: "Acabei por avançar porque percebi que o custo real não era o que ia pagar ao André — era o que estava a perder por não fazer nada.",
    today: "Em 3 meses os pacientes novos que ganhei pagaram-me o serviço do ano inteiro. Hoje vejo isto como o melhor investimento que fiz no meu negócio.",
    metric: "3 meses",
    metricLabel: "para pagar 12",
  },
  {
    initials: "PR",
    name: "Pedro Ramos",
    role: "Psicólogo Clínico · Funchal",
    quote: "Pensava que ia falar com um account manager. Falo com o André, sempre.",
    before: "Já trabalhei com agências grandes. A experiência foi sempre a mesma: o vendedor que conheci não era a pessoa que ia trabalhar comigo, ninguém percebia o meu negócio.",
    change: "Com o André é diferente. Mando WhatsApp e ele responde no próprio dia. Quando algo não está a correr bem, ele diz-me logo, sem esconder.",
    today: "Os resultados são bons, mas o que mais valorizo é saber que tenho uma pessoa, não uma estrutura.",
    metric: "+27 pacientes",
    metricLabel: "em 6 meses",
  },
];

/* ── FAQ accordion ─────────────────────────────────────────────── */
const FAQ_ITEMS = [
  {
    q: "Quanto tempo até ver resultados?",
    a: "Os primeiros pacientes via Google Ads aparecem na primeira ou segunda semana. SEO e crescimento orgânico levam três a seis meses. Por isso é que o sistema é completo: tens resultados imediatos enquanto se constrói o activo de longo prazo.",
  },
  {
    q: "Tenho de aparecer em vídeos ou fotos?",
    a: "Quanto mais aparecemos, melhor converte. Mas não é obrigatório. Trabalhamos com o que tu te sentires confortável.",
  },
  {
    q: "E se não funcionar?",
    a: "Não dou garantia de resultado. Dou-te garantia de trabalho: tudo o que está nesta página é entregue, no prazo combinado. Se não cumprir, não pagas o mês.",
  },
  {
    q: "Quanto custa Google Ads por cima?",
    a: "Recomendo entre 200€ e 500€ por mês de budget de anúncios, à parte do meu fee. É o teu, pagas directamente ao Google.",
  },
  {
    q: "Tenho contrato de fidelização?",
    a: "Não. Trabalhamos mês a mês. Se quiseres sair, sais.",
  },
  {
    q: "Porquê só psicólogos?",
    a: "Porque conheço o mercado, percebo a linguagem, e sei o que funciona. Especialização traz melhores resultados do que generalização.",
  },
];

function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="flex flex-col gap-2">
      {FAQ_ITEMS.map((f, i) => (
        <div key={i} className="border border-zinc-800 rounded-xl overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-zinc-900/40 hover:bg-zinc-900/80 transition-colors"
          >
            <span className="text-sm font-medium text-zinc-200">{f.q}</span>
            <svg
              width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth="2"
              className={`flex-shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          {open === i && (
            <div className="px-5 py-4 border-t border-zinc-800/50 bg-zinc-950/40">
              <p className="text-sm text-zinc-400 leading-relaxed">{f.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Section label ─────────────────────────────────────────────── */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-bold text-zinc-600 uppercase tracking-[0.18em] mb-5">{children}</p>
  );
}

/* ── Divider ───────────────────────────────────────────────────── */
function Divider() {
  return <div className="border-t border-zinc-800/60 my-20" />;
}

/* ── Main ──────────────────────────────────────────────────────── */
export default function OfertaClient() {
  const [showForm, setShowForm] = useState(false);
  const open = () => setShowForm(true);
  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen">
      {showForm && <BookingModal onClose={() => setShowForm(false)} />}

      {/* ── S1 HERO ─────────────────────────────────────────────── */}
      <section className="max-w-[760px] mx-auto px-5 md:px-10 pt-20 pb-20">

        {/* Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/6 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
          <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-[0.14em]">
            Para psicólogos com pelo menos 30 pacientes/mês
          </span>
        </div>

        <h1 className="text-[2.2rem] md:text-[3rem] font-bold tracking-tight leading-[1.08] text-zinc-50 mb-6">
          Construo-te o sistema online que te duplica os pacientes em 6 meses.
        </h1>

        <p className="text-lg text-zinc-400 leading-relaxed mb-10">
          Site, Google Ads e funil tratados.<br />
          <span className="text-zinc-200 font-medium">Tu só atendes.</span>
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
          <CTAButton onClick={open} label="Quero a agenda cheia sem depender da sorte" />
        </div>

        <div className="flex flex-col gap-3">
          <Vagas total={5} fechadas={1} />
          <p className="text-xs text-zinc-600">A partir de 297€/mês · Aceito 5 psicólogos este trimestre.</p>
        </div>
      </section>

      {/* ── S2 PARA QUEM É ──────────────────────────────────────── */}
      <section className="max-w-[900px] mx-auto px-5 md:px-10 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* É para ti */}
          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/4 p-6">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-6 h-6 rounded-full bg-emerald-400/15 border border-emerald-400/30 flex items-center justify-center flex-shrink-0">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
              </div>
              <p className="text-sm font-bold text-emerald-400">Isto é para ti se</p>
            </div>
            <ul className="flex flex-col gap-3.5">
              {[
                "És psicólogo em prática privada e atendes pelo menos 30 pacientes por mês",
                "Queres chegar a 60+ sem gastar mais 10h por semana em marketing",
                "Já percebeste que passa palavra não chega para crescer a sério",
                "Estás disposto a investir entre 297€ e 497€ por mês para construir um activo digital teu",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg className="flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                  <span className="text-sm text-zinc-300 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Não é para ti */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </div>
              <p className="text-sm font-bold text-zinc-500">Isto não é para ti se</p>
            </div>
            <ul className="flex flex-col gap-3.5">
              {[
                "Estás a começar e ainda não tens fluxo mínimo de pacientes",
                "Procuras \"viralizar no TikTok\" ou virar influencer",
                "Queres resultados em 30 dias sem investir nada",
                "Não estás disposto a aparecer (nem que seja pouco) nos teus próprios canais",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg className="flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#52525b" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
                  <span className="text-sm text-zinc-500 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      <Divider />

      {/* ── S3 DORES ────────────────────────────────────────────── */}
      <section className="max-w-[700px] mx-auto px-5 md:px-10 pb-20">
        <Label>Se és como a maioria dos psicólogos com quem falo</Label>

        <h2 className="text-[1.7rem] md:text-[2rem] font-bold leading-[1.15] text-zinc-50 mb-10">
          Isto vai soar-te familiar.
        </h2>

        <ul className="flex flex-col gap-5 mb-10">
          {[
            "Tens meses cheios e meses vazios, e nunca sabes ao certo porquê.",
            "Postas no Instagram quando te lembras, e isso quase nunca traz pacientes novos.",
            "O teu site, se existe, foi feito há cinco anos e nem tu gostas de o mostrar.",
            "Recebes mensagens no Direct, no email e no WhatsApp, e às vezes esqueces-te de responder.",
            "Vês colegas piores do que tu a aparecer em todo o lado, e não percebes o que estás a fazer mal.",
            "Já tentaste Google Ads sozinho. Gastaste 200€ em duas semanas, recebeste duas chamadas, e desististe.",
            "Já pensaste contratar uma agência. Pediste orçamento, eram 2.000€ por mês, e ninguém te garantiu nada.",
          ].map((dor) => (
            <li key={dor} className="flex items-start gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 flex-shrink-0 mt-2" />
              <p className="text-[15px] text-zinc-400 leading-relaxed">{dor}</p>
            </li>
          ))}
        </ul>

        <div className="border-l-2 border-zinc-700 pl-5 mb-10">
          <p className="text-base text-zinc-300 leading-relaxed italic">
            E por baixo de tudo isto, há uma coisa que te incomoda mais do que tudo:
          </p>
          <p className="text-base text-zinc-100 font-medium leading-relaxed mt-2">
            Sabes que és bom no que fazes. Mas o teu negócio depende da sorte. E tu querias previsibilidade.
          </p>
        </div>

        <CTAButton onClick={open} label="Estou farto disto. Quero o sistema." />
      </section>

      <Divider />

      {/* ── S4 VIRADA ───────────────────────────────────────────── */}
      <section className="max-w-[700px] mx-auto px-5 md:px-10 pb-20">
        <Label>Daqui a 6 meses</Label>

        <h2 className="text-[1.7rem] md:text-[2rem] font-bold leading-[1.15] text-zinc-50 mb-10">
          Imagina isto.
        </h2>

        <ul className="flex flex-col gap-5 mb-10">
          {[
            { text: "Abres a agenda da semana e está cheia. Não porque tiveste sorte. Porque tens um sistema.", accent: true },
            { text: "Os pacientes chegam-te pelo Google quando procuram \"psicólogo [tua cidade]\" ou pela tua especialidade.", accent: false },
            { text: "O teu site converte visitas em marcações sem tu fazeres nada.", accent: false },
            { text: "Os anúncios correm sozinhos e sabes exactamente quanto te custa cada paciente novo.", accent: false },
            { text: "O teu Instagram tem conteúdo a sair todas as semanas, mesmo nas semanas em que nem abriste a app.", accent: false },
          ].map(({ text, accent }) => (
            <li key={text} className="flex items-start gap-4">
              <div className="w-5 h-5 rounded-full bg-emerald-400/10 border border-emerald-400/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
              </div>
              <p className={`text-[15px] leading-relaxed ${accent ? "text-zinc-50 font-medium" : "text-zinc-400"}`}>{text}</p>
            </li>
          ))}
        </ul>

        <div className="border-l-2 border-emerald-400/40 pl-5 mb-10">
          <p className="text-base text-zinc-300 leading-relaxed">
            E quando alguém te pergunta <em>"como é que estás a crescer assim?"</em>, já não respondes <em>"sorte"</em>. Respondes:
          </p>
          <p className="text-base text-emerald-400 font-semibold mt-1">"Tenho um sistema."</p>
        </div>

        <CTAButton onClick={open} label="Quero isto para o meu consultório" />
      </section>

      <Divider />

      {/* ── S5 O QUE INCLUI ─────────────────────────────────────── */}
      <section className="max-w-[900px] mx-auto px-5 md:px-10 pb-20">
        <Label>O que inclui</Label>

        <h2 className="text-[1.7rem] md:text-[2rem] font-bold leading-[1.15] text-zinc-50 mb-10">
          Tudo o que precisas para parar<br className="hidden sm:block" /> de depender da sorte.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1.75">
                  <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
                </svg>
              ),
              title: "Site profissional optimizado para conversão",
              desc: "Construído de raiz, rápido, bonito, pensado para transformar visitas em marcações. Não é um template do Wix.",
            },
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1.75">
                  <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2"/>
                </svg>
              ),
              title: "Google Ads geridos do início ao fim",
              desc: "Campanhas, palavras-chave, anúncios, optimização semanal. Tu só vês os resultados.",
            },
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1.75">
                  <path d="M3 6h18M7 12h10M11 18h2"/>
                </svg>
              ),
              title: "Funil de captação completo",
              desc: "Da pesquisa no Google até à marcação. Tudo ligado, tudo medido.",
            },
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1.75">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              ),
              title: "Google Business Profile optimizado",
              desc: "Para apareceres no Maps quando alguém procura psicólogo na tua zona.",
            },
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1.75">
                  <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="#34d399"/>
                </svg>
              ),
              title: "Conteúdo Instagram editorial",
              desc: "Publicações pensadas para credibilidade, não para likes.",
            },
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1.75">
                  <path d="M18 20V10M12 20V4M6 20v-6"/>
                </svg>
              ),
              title: "Tracking e relatórios mensais",
              desc: "Vais saber exactamente de onde vêm os pacientes, quanto custou cada um, e o que funcionou.",
            },
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1.75">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                </svg>
              ),
              title: "Acompanhamento directo comigo",
              desc: "WhatsApp aberto. Sem intermediários, sem account managers, sem \"vou perguntar e digo-te.\"",
              wide: true,
            },
          ].map((item) => (
            <div
              key={item.title}
              className={`rounded-xl border border-zinc-800 bg-zinc-900/40 px-5 py-5 ${item.wide ? "sm:col-span-2" : ""}`}
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-400/8 border border-emerald-400/15 flex items-center justify-center mb-3">
                {item.icon}
              </div>
              <p className="text-sm font-bold text-zinc-100 mb-1.5">{item.title}</p>
              <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <CTAButton onClick={open} label="Quero parar de adivinhar de onde vêm os pacientes" />
        </div>
      </section>

      <Divider />

      {/* ── S6 TESTIMONIAL LÚCIA ────────────────────────────────── */}
      <section className="max-w-[760px] mx-auto px-5 md:px-10 pb-20">
        <Label>O que dizem os psicólogos que já confiaram em mim</Label>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 overflow-hidden">

          <div className="px-6 pt-6 pb-5 border-b border-zinc-800/60 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0 text-sm font-bold text-zinc-400">
              {LUCIA.initials}
            </div>
            <div>
              <p className="text-base font-bold text-zinc-100">{LUCIA.name}</p>
              <p className="text-sm text-zinc-500">{LUCIA.role}</p>
            </div>
          </div>

          <div className="px-6 py-6 flex flex-col gap-5">
            <blockquote className="text-xl md:text-2xl font-bold text-zinc-50 leading-snug border-l-2 border-emerald-400 pl-5 italic">
              "{LUCIA.quote}"
            </blockquote>

            <div className="flex flex-col gap-3 text-sm text-zinc-400 leading-relaxed">
              <p><span className="text-zinc-500 font-semibold">Antes -</span>{LUCIA.before}</p>
              <p><span className="text-zinc-500 font-semibold">O que mudou -</span>{LUCIA.change}</p>
              <p><span className="text-zinc-500 font-semibold">Hoje -</span>{LUCIA.today}</p>
            </div>

            <div className="flex gap-3 flex-wrap">
              <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 px-5 py-3 text-center">
                <p className="text-xl font-bold text-emerald-400">{LUCIA.metric}</p>
                <p className="text-[11px] text-zinc-500 mt-0.5">{LUCIA.metricLabel}</p>
              </div>
            </div>

            <button className="flex items-center gap-2.5 text-sm text-zinc-600 hover:text-zinc-400 transition-colors w-fit opacity-60 cursor-not-allowed">
              <div className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="#52525b"><path d="M5 3l14 9-14 9V3z"/></svg>
              </div>
              Ver vídeo de 1 minuto (brevemente)
            </button>
          </div>
        </div>

        <div className="mt-8">
          <CTAButton onClick={open} label="Quero ser o próximo caso" />
        </div>
      </section>

      <Divider />

      {/* ── S7 SOBRE MIM ────────────────────────────────────────── */}
      <section className="max-w-[760px] mx-auto px-5 md:px-10 pb-20">
        <Label>Porquê eu, e não uma agência?</Label>

        <div className="flex flex-col sm:flex-row gap-8 items-start">

          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900">
              <img src="/andre.png" alt="André Antunes" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-[1.5rem] font-bold text-zinc-50 leading-snug">
              Sou o André Antunes.
            </h2>
            <div className="flex flex-col gap-3 text-[15px] text-zinc-400 leading-relaxed">
              <p>Trabalho com profissionais de saúde em Portugal há vários anos.</p>
              <p>Não sou uma agência com 30 contas e um account manager que muda de três em três meses. Sou uma pessoa, com <span className="text-zinc-200 font-medium">cinco clientes ao mesmo tempo, no máximo</span>.</p>
              <p>Isso significa que tu falas comigo. Sempre. Quando tens uma ideia, quando tens uma dúvida, quando algo está a correr menos bem.</p>
              <p>A minha vantagem é simples: percebo de SEO, de anúncios, de copy e de design. E percebo do mercado português, não do americano.</p>
              <p className="text-zinc-300">Não prometo viralizar. Prometo construir um sistema que funciona, que é teu, e que vai estar a trabalhar para ti daqui a dois anos.</p>
            </div>
          </div>

        </div>
      </section>

      <Divider />

      {/* ── S8 COMO FUNCIONA ────────────────────────────────────── */}
      <section className="max-w-[760px] mx-auto px-5 md:px-10 pb-20">
        <Label>Como funciona</Label>

        <h2 className="text-[1.7rem] md:text-[2rem] font-bold leading-[1.15] text-zinc-50 mb-10">
          Três passos simples.
        </h2>

        <div className="flex flex-col gap-px">
          {[
            {
              n: "01",
              title: "Marcas uma call de 15 minutos",
              desc: "Falamos sobre o teu consultório, os teus números actuais, e o que queres alcançar. Sem compromisso.",
            },
            {
              n: "02",
              title: "Recebes uma proposta personalizada",
              desc: "Se fizer sentido para ambos, mando-te uma proposta concreta com preço, prazos e o que vou entregar.",
            },
            {
              n: "03",
              title: "Começamos",
              desc: "Em duas semanas tens site novo, anúncios a correr, e o sistema a trabalhar para ti.",
            },
          ].map((step, i) => (
            <div key={step.n} className={`flex gap-5 pb-8 ${i < 2 ? "border-l border-zinc-800 ml-5 pl-8 relative" : "ml-5 pl-8 relative"}`}>
              <div className="absolute -left-5 top-0 w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center flex-shrink-0">
                <span className="text-[11px] font-bold text-emerald-400">{step.n}</span>
              </div>
              <div className="pt-1">
                <p className="text-base font-bold text-zinc-100 mb-1.5">{step.title}</p>
                <p className="text-sm text-zinc-500 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <CTAButton onClick={open} label="Quero falar contigo nos próximos dias" />
        </div>
      </section>

      <Divider />

      {/* ── S9 FAQ ──────────────────────────────────────────────── */}
      <section className="max-w-[700px] mx-auto px-5 md:px-10 pb-20">
        <Label>Perguntas frequentes</Label>
        <FAQAccordion />
      </section>

      <Divider />

      {/* ── S10 CTA FINAL ───────────────────────────────────────── */}
      <section className="max-w-[700px] mx-auto px-5 md:px-10 pb-20 text-center">

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 px-6 py-10 flex flex-col items-center gap-6">

          <Vagas total={5} fechadas={1} />

          <h2 className="text-[1.7rem] md:text-[2.2rem] font-bold leading-[1.1] text-zinc-50">
            Aceito 5 psicólogos este trimestre.<br />
            <span className="text-zinc-500 font-normal text-[1.3rem]">Já fechei 1.</span>
          </h2>

          <p className="text-sm text-zinc-500 max-w-[420px] leading-relaxed">
            A call é gratuita, dura 15 minutos, e fica decidido se faz sentido avançarmos ou não. Sem pressão. Sem follow up insistente. Se for não, é não.
          </p>

          <CTAButton onClick={open} label="Quero uma das 5 vagas" />

          <div className="flex items-center gap-3 text-sm text-zinc-600">
            <div className="h-px w-12 bg-zinc-800" />
            ou
            <div className="h-px w-12 bg-zinc-800" />
          </div>

          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#34d399">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Se preferires, manda WhatsApp: 960 442 568
          </a>

        </div>
      </section>

      <Divider />

      {/* ── S11 MAIS TESTIMONIALS ───────────────────────────────── */}
      <section className="max-w-[900px] mx-auto px-5 md:px-10 pb-24">
        <Label>Ainda na dúvida?</Label>

        <h2 className="text-[1.5rem] font-bold text-zinc-50 mb-10">
          Vê o que dizem outros psicólogos.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {MORE_TESTIMONIALS.map((t) => (
            <div key={t.name} className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[11px] font-bold text-zinc-400 flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-300">{t.name}</p>
                  <p className="text-[11px] text-zinc-600">{t.role}</p>
                </div>
              </div>

              <blockquote className="text-sm font-semibold text-zinc-200 italic leading-snug border-l-2 border-zinc-700 pl-3">
                "{t.quote}"
              </blockquote>

              <div className="text-xs text-zinc-500 leading-relaxed flex flex-col gap-2">
                <p><span className="text-zinc-600 font-medium">Antes -</span>{t.before}</p>
                <p><span className="text-zinc-600 font-medium">O que mudou -</span>{t.change}</p>
                <p><span className="text-zinc-600 font-medium">Hoje -</span>{t.today}</p>
              </div>

              <div className="mt-auto pt-4 border-t border-zinc-800/50 flex items-center justify-between">
                <span className="text-[11px] text-zinc-600">{t.metricLabel}</span>
                <span className="text-sm font-bold text-emerald-400">{t.metric}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="mt-16 text-center flex flex-col items-center gap-4">
          <p className="text-base text-zinc-500">Pronto para parar de depender da sorte?</p>
          <CTAButton onClick={open} label="Quero a agenda cheia sem depender da sorte" />
          <Vagas total={5} fechadas={1} />
        </div>

      </section>

    </div>
  );
}
