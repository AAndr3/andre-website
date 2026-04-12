"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const CALENDLY_URL = "https://calendly.com/andre-andreantunes/chamada-com-andre";
const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

type Phase = "form" | "calendly";

export default function ContactSection({ source = "homepage" }: { source?: string }) {
  const router = useRouter();
  const [phase,      setPhase]      = useState<Phase>("form");
  const [formData,   setFormData]   = useState({ name: "", phone: "", email: "" });
  const [submitting, setSubmitting] = useState(false);
  const [preload,    setPreload]    = useState(false);
  const calRef = useRef<HTMLDivElement>(null);

  // Start preloading Calendly as soon as section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setPreload(true); },
      { rootMargin: "200px" }
    );
    const el = document.getElementById("contacto");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const canSubmit = formData.name.trim() && formData.phone.trim() && formData.email.trim();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);

    // Save lead — fire & forget
    fetch("/api/lead", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ ...formData, source }),
    }).catch(() => {});

    // GA4 conversion event
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "lead_submitted", { event_category: "conversion", event_label: "contact_form" });
    }

    setTimeout(() => {
      setSubmitting(false);
      setPhase("calendly");
      setTimeout(() => calRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    }, 400);
  }

  const calendlyFull =
    `${CALENDLY_URL}?hide_event_type_details=1&hide_gdpr_banner=1` +
    `&name=${encodeURIComponent(formData.name)}` +
    `&email=${encodeURIComponent(formData.email)}`;

  return (
    <section id="contacto" className="py-20 max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20">

      {/* Preload Calendly in background */}
      {preload && phase === "form" && (
        <div style={{ position: "fixed", left: -9999, top: -9999, width: 800, height: 700, overflow: "hidden", pointerEvents: "none" }}>
          <iframe src={`${CALENDLY_URL}?hide_event_type_details=1&hide_gdpr_banner=1`} width="800" height="700" title="cal-preload" />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

        {/* Left — copy */}
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-[11px] font-semibold text-zinc-600 uppercase tracking-[0.15em] mb-3">Falar comigo</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-[1.1] text-zinc-50 mb-4">
              Conversa de 15 minutos.
              <br />
              <span className="text-zinc-500 font-normal">Gratuita. Sem compromisso.</span>
            </h2>
            <p className="text-base text-zinc-400 leading-relaxed">
              Diz-me a tua especialidade e cidade e eu digo-te exactamente o que precisas de fazer para aparecer no Google — e quantos pacientes podes ganhar por mês.
            </p>
          </div>

          {/* Trust points */}
          <div className="flex flex-col gap-3">
            {[
              "Análise do teu mercado local no Google",
              "Plano concreto para os primeiros 30 dias",
              "Sem pressão de venda — só informação útil",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center flex-shrink-0">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <span className="text-sm text-zinc-400">{item}</span>
              </div>
            ))}
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-3 pt-2">
            <div className="flex -space-x-2">
              {["ML", "RS", "AB"].map((initials) => (
                <div key={initials} className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-zinc-950 flex items-center justify-center text-[10px] font-bold text-zinc-400">
                  {initials}
                </div>
              ))}
            </div>
            <p className="text-xs text-zinc-500">
              <span className="text-zinc-300 font-medium">30+ profissionais</span> já conversaram comigo este ano
            </p>
          </div>
        </div>

        {/* Right — form or Calendly */}
        <div ref={calRef}>
          <AnimatePresence mode="wait">
            {phase === "form" ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease }}
                className="rounded-2xl border border-white/8 bg-zinc-900/60 overflow-hidden"
                style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 24px 64px rgba(0,0,0,0.3)" }}
              >
                <div className="p-6 md:p-8">
                  <p className="text-sm font-semibold text-zinc-200 mb-1">Deixa os teus dados</p>
                  <p className="text-xs text-zinc-600 mb-6">Respondo em menos de 24h para confirmar o horário.</p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-mono text-zinc-600 uppercase tracking-[0.12em]">Nome</label>
                      <input
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="João Silva"
                        value={formData.name}
                        onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-white/8 bg-zinc-900/80 text-zinc-100 text-sm placeholder:text-zinc-700 focus:outline-none focus:border-emerald-400/30 focus:ring-1 focus:ring-emerald-400/20 transition-all duration-150"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-mono text-zinc-600 uppercase tracking-[0.12em]">Telefone</label>
                      <input
                        type="tel"
                        required
                        autoComplete="tel"
                        placeholder="+351 912 345 678"
                        value={formData.phone}
                        onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-white/8 bg-zinc-900/80 text-zinc-100 text-sm placeholder:text-zinc-700 focus:outline-none focus:border-emerald-400/30 focus:ring-1 focus:ring-emerald-400/20 transition-all duration-150"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-mono text-zinc-600 uppercase tracking-[0.12em]">Email</label>
                      <input
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="joao@consultorio.pt"
                        value={formData.email}
                        onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-white/8 bg-zinc-900/80 text-zinc-100 text-sm placeholder:text-zinc-700 focus:outline-none focus:border-emerald-400/30 focus:ring-1 focus:ring-emerald-400/20 transition-all duration-150"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={!canSubmit || submitting}
                      className={`w-full mt-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                        canSubmit && !submitting
                          ? "bg-emerald-400 text-zinc-950 hover:bg-emerald-300 active:scale-[0.98]"
                          : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                      }`}
                    >
                      {submitting ? (
                        <>
                          <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity="0.2" />
                            <path d="M21 12a9 9 0 01-9-9" />
                          </svg>
                          A preparar...
                        </>
                      ) : (
                        <>
                          Escolher um horário
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                          </svg>
                        </>
                      )}
                    </button>

                    <p className="text-center text-[11px] text-zinc-700">
                      Sem spam. Só uma conversa de 15 minutos.
                    </p>
                  </form>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="calendly"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease }}
                className="rounded-2xl border border-white/8 overflow-hidden"
                style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.4)" }}
              >
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/8 bg-zinc-900/80">
                  <div className="flex items-center gap-2.5">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                    <span className="text-sm font-semibold text-zinc-200">Escolhe um horário</span>
                  </div>
                  <span className="text-xs text-zinc-600">Conversa gratuita · 15 min</span>
                </div>
                <iframe
                  src={calendlyFull}
                  width="100%"
                  height="700"
                  frameBorder="0"
                  title="Agendar conversa com André Antunes"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
