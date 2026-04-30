"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CASES = [
  {
    id: "lucia",
    name: "Dra. Lúcia Silva",
    specialty: "Psicóloga Clínica",
    city: "Mafra",
    leftSrc: "/cases/lucia-wix.jpg",
    rightSrc: "/cases/lucia-novo.jpg",
    leftLabel: "Antes",
    rightLabel: "Depois",
    metrics: [
      { label: "Keyword",          value: '"psicóloga mafra"' },
      { label: "Posição no Google", value: "1.ª"              },
      { label: "Tempo",            value: "3 semanas"         },
    ],
    quote: "Nunca pensei que fosse tão rápido aparecer no Google.",
  },
];

/* ── Slider ──────────────────────────────────────────────────── */
function BeforeAfterSlider({
  leftSrc,
  rightSrc,
  leftLabel,
  rightLabel,
}: {
  leftSrc: string;
  rightSrc: string;
  leftLabel: string;
  rightLabel: string;
}) {
  const [pos, setPos]         = useState(50);
  const [isDragging, setDrag] = useState(false);
  const containerRef          = useRef<HTMLDivElement>(null);
  const dragging              = useRef(false);

  /* Hint animation on mount */
  useEffect(() => {
    let frame: number;
    const start    = performance.now();
    const duration = 800;
    const timeout  = setTimeout(() => {
      function animate(now: number) {
        const t = Math.min((now - start) / duration, 1);
        setPos(50 - 20 * Math.sin(Math.PI * t));
        if (t < 1) frame = requestAnimationFrame(animate);
        else setPos(50);
      }
      frame = requestAnimationFrame(animate);
    }, 500);
    return () => { clearTimeout(timeout); cancelAnimationFrame(frame); };
  }, []);

  const calcPos = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    setPos(Math.max(1, Math.min(99, ((clientX - left) / width) * 100)));
  }, []);

  /* Mouse */
  useEffect(() => {
    const move = (e: MouseEvent) => { if (dragging.current) calcPos(e.clientX); };
    const up   = () => { dragging.current = false; setDrag(false); };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up); };
  }, [calcPos]);

  /* Touch — non-passive so we can prevent scroll while dragging */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function onTouchMove(e: TouchEvent) {
      if (!dragging.current) return;
      e.preventDefault(); // block page scroll only while dragging
      calcPos(e.touches[0].clientX);
    }
    function onTouchEnd() { dragging.current = false; setDrag(false); }

    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd);
    return () => {
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [calcPos]);

  function startDrag(clientX: number) {
    dragging.current = true;
    setDrag(true);
    calcPos(clientX);
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-2xl select-none touch-pan-y"
      style={{ aspectRatio: "16/10", cursor: "col-resize" }}
      onMouseDown={(e) => startDrag(e.clientX)}
      onTouchStart={(e) => { startDrag(e.touches[0].clientX); }}
    >
      {/* RIGHT — DEPOIS (underneath) */}
      <img
        src={rightSrc}
        alt={rightLabel}
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
      />

      {/* LEFT — ANTES (clipped on top) */}
      <img
        src={leftSrc}
        alt={leftLabel}
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />

      {/* Divider */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white pointer-events-none"
        style={{
          left: `${pos}%`,
          transform: "translateX(-50%)",
          boxShadow: "0 0 10px rgba(0,0,0,0.3)",
        }}
      />

      {/* Handle */}
      <div
        className="absolute top-1/2 z-10 flex items-center justify-center"
        style={{
          left: `${pos}%`,
          transform: "translate(-50%, -50%)",
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "white",
          boxShadow: isDragging
            ? "0 0 0 5px rgba(255,255,255,0.25), 0 8px 24px rgba(0,0,0,0.4)"
            : "0 2px 16px rgba(0,0,0,0.3)",
          transition: "box-shadow 0.15s ease",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round">
          <path d="M8 5l-5 7 5 7M16 5l5 7-5 7" />
        </svg>
      </div>

      {/* Labels */}
      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full pointer-events-none"
        style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}>
        <span className="text-[11px] font-bold text-white uppercase tracking-wider">{leftLabel}</span>
      </div>
      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full pointer-events-none"
        style={{ background: "rgba(5,150,105,0.88)", backdropFilter: "blur(6px)" }}>
        <span className="text-[11px] font-bold text-white uppercase tracking-wider">{rightLabel}</span>
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────── */
export default function CasosClient() {
  return (
    <div className="max-w-[860px] mx-auto px-5 md:px-10">

      {/* Header */}
      <div className="mb-14">
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">
          Resultados reais
        </p>
        <h1 className="text-[2rem] md:text-[2.6rem] font-bold tracking-tight leading-[1.1] text-zinc-50 mb-4">
          De invisíveis no Google<br className="hidden sm:block" /> para agenda cheia.
        </h1>
        <p className="text-[15px] text-zinc-400 leading-relaxed max-w-[480px]">
          Arrasta para comparar o site antigo com o novo — e os resultados que vieram a seguir.
        </p>
      </div>

      {/* Cases */}
      <div className="flex flex-col gap-20">
        {CASES.map((c) => (
          <div key={c.id}>

            {/* Slider */}
            <BeforeAfterSlider
              leftSrc={c.leftSrc}
              rightSrc={c.rightSrc}
              leftLabel={c.leftLabel}
              rightLabel={c.rightLabel}
            />

            {/* Info row */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mt-6">

              <div>
                <p className="text-base font-bold text-zinc-100">{c.name}</p>
                <p className="text-sm text-zinc-500">{c.specialty} · {c.city}</p>
                {c.quote && (
                  <p className="text-sm text-zinc-500 italic mt-2.5 max-w-[360px] leading-relaxed">
                    "{c.quote}"
                  </p>
                )}
              </div>

              {/* Metrics */}
              <div className="flex gap-3 flex-shrink-0">
                {c.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="flex flex-col items-center text-center border border-zinc-800 rounded-xl px-4 py-3 bg-zinc-900/40"
                    style={{ minWidth: 80 }}
                  >
                    <p className="text-[1.1rem] font-bold text-emerald-600 leading-tight">{m.value}</p>
                    <p className="text-[11px] text-zinc-500 mt-1 leading-snug">{m.label}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-20 pt-12 border-t border-zinc-800 text-center">
        <p className="text-sm text-zinc-500 mb-4">Queres o mesmo para o teu consultório?</p>
        <a
          href="/agendar"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 transition-colors text-white font-bold text-sm shadow-sm shadow-emerald-600/20"
        >
          Fala comigo — 15 min gratuitos
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>

    </div>
  );
}
