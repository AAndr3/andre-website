"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Replace with your Calendly link ────────────────────────────────────────
const CALENDLY_URL = "https://calendly.com/andre-andreantunes/chamada-com-andre";
// ────────────────────────────────────────────────────────────────────────────

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const SPECIALTIES = [
  // ── Mais procurados ─────────────────────────────────────────────────────────
  { id: "dentista",          label: "Médico Dentista",      base: 24, kws: ["médico dentista {c}",     "dentista {c}",               "consulta dentária {c}"]      },
  { id: "psicologo",         label: "Psicólogo",            base: 22, kws: ["psicólogo {c}",           "psicólogo em {c}",           "consulta psicologia {c}"]    },
  { id: "fisioterapeuta",    label: "Fisioterapeuta",       base: 20, kws: ["fisioterapeuta {c}",       "fisioterapia {c}",           "clínica fisioterapia {c}"]   },
  { id: "medico-familia",    label: "Médico de Família",    base: 18, kws: ["médico de família {c}",   "clínico geral {c}",          "médico geral {c}"]           },
  { id: "medico-estetico",   label: "Médico Estético",      base: 17, kws: ["médico estético {c}",     "medicina estética {c}",      "clínica estética {c}"]       },
  { id: "veterinario",       label: "Veterinário",          base: 16, kws: ["veterinário {c}",         "clínica veterinária {c}",    "consulta veterinária {c}"]   },
  { id: "pediatra",          label: "Pediatra",             base: 16, kws: ["pediatra {c}",            "pediatria {c}",              "médico crianças {c}"]        },
  // ── Especialidades médicas ───────────────────────────────────────────────────
  { id: "dermatologista",    label: "Dermatologista",       base: 14, kws: ["dermatologista {c}",      "dermatologia {c}",           "consulta pele {c}"]          },
  { id: "ginecologista",     label: "Ginecologista",        base: 14, kws: ["ginecologista {c}",       "ginecologia {c}",            "consulta ginecologia {c}"]   },
  { id: "psiquiatra",        label: "Psiquiatra",           base: 14, kws: ["psiquiatra {c}",          "psiquiatria {c}",            "consulta psiquiatria {c}"]   },
  { id: "terapeuta-fala",    label: "Terapeuta da Fala",    base: 13, kws: ["terapeuta da fala {c}",   "terapia da fala {c}",        "logopedia {c}"]              },
  { id: "nutricionista",     label: "Nutricionista",        base: 13, kws: ["nutricionista {c}",       "nutrição {c}",               "consulta nutrição {c}"]      },
  { id: "osteopata",         label: "Osteopata",            base: 13, kws: ["osteopata {c}",           "osteopatia {c}",             "clínica osteopatia {c}"]     },
  { id: "ortopedista",       label: "Ortopedista",          base: 13, kws: ["ortopedista {c}",         "ortopedia {c}",              "consulta ortopedia {c}"]     },
  { id: "neurologista",      label: "Neurologista",         base: 12, kws: ["neurologista {c}",        "neurologia {c}",             "consulta neurologia {c}"]    },
  { id: "cardiologista",     label: "Cardiologista",        base: 12, kws: ["cardiologista {c}",       "cardiologia {c}",            "consulta cardiologia {c}"]   },
  { id: "oftalmologista",    label: "Oftalmologista",       base: 11, kws: ["oftalmologista {c}",      "oftalmologia {c}",           "consulta olhos {c}"]         },
  { id: "urologista",        label: "Urologista",           base: 11, kws: ["urologista {c}",          "urologia {c}",               "consulta urologia {c}"]      },
  { id: "gastro",            label: "Gastrenterologista",   base: 11, kws: ["gastrenterologista {c}",  "gastrenterologia {c}",       "consulta digestiva {c}"]     },
  { id: "endocrinologista",  label: "Endocrinologista",     base: 10, kws: ["endocrinologista {c}",    "endocrinologia {c}",         "consulta hormonal {c}"]      },
  { id: "orl",               label: "ORL",                  base: 10, kws: ["otorrinolaringologista {c}", "orl {c}",                 "consulta orl {c}"]           },
  { id: "reumatologista",    label: "Reumatologista",       base: 9,  kws: ["reumatologista {c}",      "reumatologia {c}",           "consulta articulações {c}"]  },
];

const CITIES = [
  // ── Grande Lisboa ────────────────────────────────────────────────────────────
  { id: "lisboa",    label: "Lisboa",             multiplier: 2.5  },
  { id: "cascais",   label: "Cascais",            multiplier: 0.95 },
  { id: "almada",    label: "Almada",             multiplier: 0.8  },
  { id: "setubal",   label: "Setúbal",            multiplier: 0.7  },
  // ── Grande Porto ─────────────────────────────────────────────────────────────
  { id: "porto",     label: "Porto",              multiplier: 1.6  },
  { id: "gaia",      label: "Vila Nova de Gaia",  multiplier: 1.2  },
  { id: "matosinhos",label: "Matosinhos",         multiplier: 0.8  },
  { id: "braga",     label: "Braga",              multiplier: 1.0  },
  { id: "guimaraes", label: "Guimarães",          multiplier: 0.65 },
  { id: "barcelos",  label: "Barcelos",           multiplier: 0.45 },
  // ── Centro ───────────────────────────────────────────────────────────────────
  { id: "coimbra",   label: "Coimbra",            multiplier: 0.9  },
  { id: "aveiro",    label: "Aveiro",             multiplier: 0.7  },
  { id: "leiria",    label: "Leiria",             multiplier: 0.55 },
  { id: "castelo-branco", label: "Castelo Branco",multiplier: 0.4  },
  // ── Norte interior ───────────────────────────────────────────────────────────
  { id: "vila-real", label: "Vila Real",          multiplier: 0.4  },
  { id: "braganca",  label: "Bragança",           multiplier: 0.35 },
  { id: "viana",     label: "Viana do Castelo",   multiplier: 0.5  },
  // ── Alentejo / Algarve ───────────────────────────────────────────────────────
  { id: "evora",     label: "Évora",              multiplier: 0.5  },
  { id: "faro",      label: "Faro",               multiplier: 0.6  },
  { id: "portimao",  label: "Portimão",           multiplier: 0.55 },
  // ── Outros ───────────────────────────────────────────────────────────────────
  { id: "funchal",   label: "Funchal",            multiplier: 0.6  },
  { id: "viseu",     label: "Viseu",              multiplier: 0.5  },
  { id: "santarem",  label: "Santarém",           multiplier: 0.5  },
];

const FORM_FIELDS = [
  { key: "name",  type: "text",  question: "Qual é o teu nome?",         placeholder: "João Silva",           hint: "Nome e apelido" },
  { key: "phone", type: "tel",   question: "E o teu número de telefone?", placeholder: "+351 912 345 678",     hint: "Para poder contactar-te" },
  { key: "email", type: "email", question: "Por último, o teu email.",    placeholder: "joao@consultorio.pt",  hint: "Onde te envio os detalhes" },
] as const;

type Phase        = "idle" | "calculating" | "result";
type CapturePhase = "hidden" | "form" | "calendly";

function fmt(n: number) { return n.toLocaleString("pt-PT"); }
function roundTo10(n: number) { return Math.round(n / 10) * 10; }
function getKeywordVolumes(totalSearches: number) {
  const k1 = roundTo10(totalSearches * 0.54);
  const k2 = roundTo10(totalSearches * 0.27);
  const k3 = Math.max(totalSearches - k1 - k2, 10);
  return [k1, k2, k3];
}
function resolveKw(pattern: string, city: string) {
  return pattern.replace("{c}", city.toLowerCase());
}

function useCountUp(target: number, active: boolean, duration = 1600) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) { setCount(0); return; }
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      setCount(Math.round(eased * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, active, duration]);
  return count;
}

export default function Calculadora() {
  const [specialty,    setSpecialty]    = useState<string | null>(null);
  const [city,         setCity]         = useState<string | null>(null);
  const [phase,        setPhase]        = useState<Phase>("idle");
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [capture,      setCapture]      = useState<CapturePhase>("hidden");
  const [formStep,     setFormStep]     = useState(0);
  const [formData,     setFormData]     = useState({ name: "", phone: "", email: "" });
  const [direction,    setDirection]    = useState(1); // 1 = forward, -1 = backward
  const [preloadCal,   setPreloadCal]   = useState(false);

  // Start loading Calendly in background as soon as form appears
  useEffect(() => {
    if (capture === "form") {
      const t = setTimeout(() => setPreloadCal(true), 400);
      return () => clearTimeout(t);
    }
  }, [capture]);

  const terminalRef = useRef<HTMLDivElement>(null);
  const formRef     = useRef<HTMLDivElement>(null);
  const calRef      = useRef<HTMLDivElement>(null);
  const inputRef    = useRef<HTMLInputElement>(null);

  const sel     = SPECIALTIES.find((s) => s.id === specialty);
  const cit     = CITIES.find((c) => c.id === city);
  const canCalc = !!sel && !!cit && phase === "idle";

  const patients = sel && cit ? Math.round(sel.base * cit.multiplier) : 0;
  const searches = Math.round(patients / 0.024);
  const clicks   = Math.round(patients / 0.08);
  const [k1, k2, k3] = getKeywordVolumes(searches);

  const countedPatients = useCountUp(patients, phase === "result");

  const terminalLines = sel && cit ? [
    {
      cmd: `identificar keywords — ${sel.label.toLowerCase()} em ${cit.label.toLowerCase()}`,
      outputs: [
        `"${resolveKw(sel.kws[0], cit.label)}"  —  ${fmt(k1)} pesquisas/mês`,
        `"${resolveKw(sel.kws[1], cit.label)}"  —  ${fmt(k2)} pesquisas/mês`,
        `"${resolveKw(sel.kws[2], cit.label)}"  —  ${fmt(k3)} pesquisas/mês`,
      ],
    },
    {
      cmd: "calcular taxa de clique — posição #1 no Google",
      outputs: [`28% de CTR  →  ${fmt(clicks)} visitas/mês ao teu site`],
    },
    {
      cmd: "estimar conversão em marcações de consulta",
      outputs: [`8% de conversão  →  ${fmt(patients)} novos pacientes/mês`],
    },
  ] : [];

  function handleCalculate() {
    if (!canCalc) return;
    setPhase("calculating");
    setVisibleSteps(0);
    setCapture("hidden");
    const t1 = setTimeout(() => setVisibleSteps(1), 500);
    const t2 = setTimeout(() => setVisibleSteps(2), 1300);
    const t3 = setTimeout(() => setVisibleSteps(3), 2000);
    const t4 = setTimeout(() => {
      setPhase("result");
      setTimeout(() => terminalRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 80);
    }, 2600);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }

  function handleReset() {
    setPhase("idle");
    setVisibleSteps(0);
    setCapture("hidden");
    setFormStep(0);
    setSpecialty(null);
    setCity(null);
    setFormData({ name: "", phone: "", email: "" });
  }

  function handleShowForm() {
    setCapture("form");
    setFormStep(0);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => inputRef.current?.focus(), 400);
    }, 80);
  }

  const currentField = FORM_FIELDS[formStep];
  const currentValue = currentField ? formData[currentField.key] : "";
  const canAdvance   = currentValue.trim().length > 0;

  function advanceStep() {
    if (!canAdvance) return;
    setDirection(1);
    if (formStep < FORM_FIELDS.length - 1) {
      setFormStep((s) => s + 1);
      setTimeout(() => inputRef.current?.focus(), 200);
    } else {
      // last step — save lead first (fire & forget), then show Calendly
      const payload = {
        name:      formData.name,
        phone:     formData.phone,
        email:     formData.email,
        specialty: sel?.label ?? "",
        city:      cit?.label ?? "",
        patients,
      };
      fetch("/api/lead", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      }).catch(() => {}); // silent fail — never block the UX

      // GA4 conversion event
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "lead_submitted", { event_category: "conversion", event_label: "calculadora" });
      }

      setCapture("calendly");
      setTimeout(() => calRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      advanceStep();
    }
  }

  function handleFieldChange(value: string) {
    setFormData((p) => ({ ...p, [currentField.key]: value }));
  }

  const calendlyFull =
    `${CALENDLY_URL}?hide_event_type_details=1&hide_gdpr_banner=1` +
    `&name=${encodeURIComponent(formData.name)}` +
    `&email=${encodeURIComponent(formData.email)}`;

  const slideVariants = {
    enter:  (d: number) => ({ opacity: 0, y: d > 0 ? 24 : -24 }),
    center: { opacity: 1, y: 0 },
    exit:   (d: number) => ({ opacity: 0, y: d > 0 ? -24 : 24 }),
  };

  return (
    <div className="max-w-[680px] mx-auto flex flex-col gap-4">

      {/* ── Input card ──────────────────────────────────────────────────── */}
      <div
        className="rounded-2xl border border-white/8 bg-zinc-900/60 overflow-hidden"
        style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 24px 64px rgba(0,0,0,0.4)" }}
      >
        <div className="flex items-center gap-3 px-6 py-4 border-b border-white/6 bg-zinc-900/40">
          <div className="flex gap-1.5">
            {[0,1,2].map((i) => <div key={i} className="w-2.5 h-2.5 rounded-full bg-zinc-700" />)}
          </div>
          <span className="text-[11px] font-mono text-zinc-600 tracking-wider">calculadora · dados de pesquisa Portugal 2026</span>
        </div>

        <div className="p-6 md:p-8 flex flex-col gap-8">
          {/* Specialty */}
          <div className="flex flex-col gap-3">
            <label className="text-[11px] font-mono text-zinc-500 uppercase tracking-[0.15em]">
              <span className="text-emerald-400/50">$</span> especialidade
            </label>
            <div className="flex flex-wrap gap-2">
              {SPECIALTIES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => { if (phase === "idle") setSpecialty(s.id === specialty ? null : s.id); }}
                  disabled={phase !== "idle"}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-150 ${
                    specialty === s.id
                      ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-400"
                      : "border-white/6 bg-zinc-900/40 text-zinc-500 hover:border-white/12 hover:text-zinc-300 disabled:cursor-not-allowed disabled:opacity-50"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* City */}
          <div className="flex flex-col gap-3">
            <label className="text-[11px] font-mono text-zinc-500 uppercase tracking-[0.15em]">
              <span className="text-emerald-400/50">$</span> cidade
            </label>
            <div className="flex flex-wrap gap-2">
              {CITIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => { if (phase === "idle") setCity(c.id === city ? null : c.id); }}
                  disabled={phase !== "idle"}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-150 ${
                    city === c.id
                      ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-400"
                      : "border-white/6 bg-zinc-900/40 text-zinc-500 hover:border-white/12 hover:text-zinc-300 disabled:cursor-not-allowed disabled:opacity-50"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Button */}
          <button
            onClick={handleCalculate}
            disabled={!canCalc}
            className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
              canCalc
                ? "bg-emerald-400 text-zinc-950 hover:bg-emerald-300 active:scale-[0.98]"
                : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
            }`}
          >
            {phase === "calculating" ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity="0.2" />
                  <path d="M21 12a9 9 0 01-9-9" />
                </svg>
                A calcular...
              </span>
            ) : canCalc ? (
              "Calcular potencial →"
            ) : (
              "Selecciona especialidade e cidade"
            )}
          </button>
        </div>
      </div>

      {/* ── Terminal output ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {(phase === "calculating" || phase === "result") && sel && cit && (
          <motion.div
            ref={terminalRef}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease }}
            className="rounded-2xl border border-white/8 bg-[#0a0a0c] overflow-hidden font-mono"
            style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03), 0 24px 64px rgba(0,0,0,0.5)" }}
          >
            <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/5 bg-zinc-900/50">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
              </div>
              <span className="text-[11px] text-zinc-600 tracking-wider">análise · output</span>
            </div>

            <div className="p-5 md:p-6 flex flex-col gap-2 text-[13px]">
              {terminalLines.map((step, i) => (
                <AnimatePresence key={i}>
                  {visibleSteps > i && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, ease }}
                      className="flex flex-col gap-1 mb-1"
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-emerald-400/40 mt-px select-none flex-shrink-0">›</span>
                        <span className="text-zinc-500 leading-snug">{step.cmd}</span>
                      </div>
                      {step.outputs.map((out, j) => (
                        <div key={j} className="flex items-start gap-2 pl-4">
                          <span className="text-emerald-400/60 mt-px select-none flex-shrink-0">✓</span>
                          <span className="text-zinc-400 leading-snug">{out}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              ))}

              <AnimatePresence>
                {phase === "result" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.15, ease }}
                    className="font-sans"
                  >
                    <div className="mt-3 mb-4 border-t border-white/6" />

                    {/* Big number */}
                    <div className="flex flex-col gap-2 mb-6">
                      <span className="text-[11px] font-mono text-zinc-600 uppercase tracking-[0.15em]">resultado</span>
                      <div className="flex items-baseline gap-3">
                        <span
                          className="font-bold tracking-tight text-emerald-400 tabular-nums"
                          style={{ fontSize: "clamp(3rem,10vw,4.5rem)", lineHeight: 1, fontFamily: "var(--font-geist-mono)" }}
                        >
                          {fmt(countedPatients)}
                        </span>
                        <span className="text-zinc-500 text-base leading-snug">
                          pacientes novos<br />por mês
                        </span>
                      </div>
                      <p className="text-xs text-zinc-600 font-mono mt-1">
                        se aparecesses no Google amanhã como{" "}
                        <span className="text-zinc-400">{sel.label.toLowerCase()}</span>{" "}
                        em <span className="text-zinc-400">{cit.label}</span>
                      </p>
                    </div>

                    {/* Funnel bars */}
                    <div className="flex flex-col gap-3 mb-6">
                      {[
                        { label: "Pesquisas/mês no Google", value: fmt(searches), pct: 1,                   color: "bg-zinc-600"   },
                        { label: "Visitas ao teu site",     value: fmt(clicks),   pct: clicks / searches,   color: "bg-zinc-400"   },
                        { label: "Novos pacientes",         value: fmt(patients), pct: patients / searches, color: "bg-emerald-400" },
                      ].map((row, i) => (
                        <motion.div
                          key={row.label}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.35, delay: i * 0.1, ease }}
                          className="flex flex-col gap-1.5"
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-mono text-zinc-600">{row.label}</span>
                            <span className="text-xs font-mono text-zinc-300 tabular-nums">{row.value}</span>
                          </div>
                          <div className="h-[3px] w-full bg-zinc-800 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.max(row.pct * 100, 2)}%` }}
                              transition={{ duration: 1, delay: 0.25 + i * 0.1, ease }}
                              className={`h-full rounded-full ${row.color}`}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* CTAs */}
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.45, ease }}
                      className="flex flex-col sm:flex-row gap-3"
                    >
                      {capture === "hidden" && (
                        <button
                          onClick={handleShowForm}
                          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-400 text-zinc-950 font-semibold text-sm hover:bg-emerald-300 transition-colors duration-200 active:scale-[0.97]"
                        >
                          Quero atingir este número
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </button>
                      )}
                      <button
                        onClick={handleReset}
                        className="px-5 py-3 rounded-xl border border-white/8 text-zinc-500 text-sm hover:text-zinc-300 hover:border-white/12 transition-all duration-150"
                      >
                        Nova simulação
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Typeform lead capture ────────────────────────────────────────── */}
      <AnimatePresence>
        {capture === "form" && (
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease }}
            className="rounded-2xl border border-white/8 bg-zinc-950 overflow-hidden"
            style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 24px 64px rgba(0,0,0,0.5)" }}
          >
            {/* Progress bar */}
            <div className="h-[2px] bg-zinc-800">
              <motion.div
                className="h-full bg-emerald-400"
                animate={{ width: `${((formStep + 1) / FORM_FIELDS.length) * 100}%` }}
                transition={{ duration: 0.4, ease }}
              />
            </div>

            {/* Step counter */}
            <div className="flex items-center justify-between px-8 pt-6 pb-0">
              <span className="text-[11px] font-mono text-zinc-600 tracking-wider">
                {String(formStep + 1).padStart(2, "0")} / {String(FORM_FIELDS.length).padStart(2, "0")}
              </span>
              <span className="text-[11px] font-mono text-zinc-700">
                {fmt(patients)} pacientes potenciais · {sel?.label} · {cit?.label}
              </span>
            </div>

            {/* Animated question + input */}
            <div className="px-8 pt-8 pb-10" style={{ minHeight: 220 }}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={formStep}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease }}
                  className="flex flex-col gap-8"
                >
                  {/* Question */}
                  <p className="text-2xl md:text-3xl font-semibold text-zinc-100 leading-snug tracking-tight">
                    {currentField.question}
                  </p>

                  {/* Input — bottom border only */}
                  <div className="flex flex-col gap-3">
                    <input
                      ref={inputRef}
                      type={currentField.type}
                      autoComplete={currentField.key === "name" ? "name" : currentField.key === "email" ? "email" : "tel"}
                      placeholder={currentField.placeholder}
                      value={currentValue}
                      onChange={(e) => handleFieldChange(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="w-full bg-transparent text-xl md:text-2xl text-zinc-100 placeholder:text-zinc-700 border-b-2 border-zinc-700 focus:border-emerald-400 pb-3 outline-none transition-colors duration-200"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-zinc-600">{currentField.hint}</span>
                      <span className="text-[11px] text-zinc-700 font-mono">Enter ↵</span>
                    </div>
                  </div>

                  {/* Next button */}
                  <button
                    onClick={advanceStep}
                    disabled={!canAdvance}
                    className={`self-start flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                      canAdvance
                        ? "bg-emerald-400 text-zinc-950 hover:bg-emerald-300 active:scale-[0.97]"
                        : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                    }`}
                  >
                    {formStep < FORM_FIELDS.length - 1 ? (
                      <>
                        Próximo
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </>
                    ) : (
                      <>
                        Ver quando podemos falar
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />
                        </svg>
                      </>
                    )}
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="px-8 pb-5 border-t border-white/5 pt-4">
              <p className="text-[11px] text-zinc-700">
                Sem spam. Só uma conversa de 15 minutos, gratuita.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Calendly preload (hidden, starts loading while form is filled) ── */}
      {preloadCal && capture === "form" && (
        <div style={{ position: "fixed", left: -9999, top: -9999, width: 800, height: 700, overflow: "hidden", pointerEvents: "none" }}>
          <iframe
            src={`${CALENDLY_URL}?hide_event_type_details=1&hide_gdpr_banner=1`}
            width="800"
            height="700"
            title="calendly-preload"
          />
        </div>
      )}

      {/* ── Calendly embed ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {capture === "calendly" && (
          <motion.div
            ref={calRef}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease }}
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
  );
}
