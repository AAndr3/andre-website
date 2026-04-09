const items = [
  "Copy escrito à medida",
  "SEO configurado",
  "Google Maps activo",
  "Entrega em 10 dias",
  "30+ profissionais cresceram",
  "Garantia 60 dias",
  "Sem anúncios pagos",
  "Tráfego orgânico",
  "Suporte pós-lançamento",
];

function ItemSet() {
  return (
    /* flex-shrink-0 keeps each set as one non-wrapping block */
    <div className="flex flex-shrink-0 items-center" aria-hidden>
      {items.map((label, i) => (
        <span
          key={i}
          className="inline-flex flex-shrink-0 items-center gap-2 text-sm text-zinc-500 px-5 whitespace-nowrap"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          {label}
          <span className="ml-5 w-1 h-1 rounded-full bg-zinc-700 inline-block flex-shrink-0" />
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="relative py-5 border-y border-white/5 overflow-hidden">
      {/* Fade edges */}
      <div
        className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #09090b, transparent)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #09090b, transparent)" }}
      />

      {/*
        Two identical sets side by side (no width: max-content).
        Animation moves -50% = exactly one set's width → seamless loop.
        will-change: transform enables GPU compositing on iOS.
      */}
      <div
        className="flex"
        style={{
          animation: "marquee 30s linear infinite",
          willChange: "transform",
        }}
      >
        <ItemSet />
        <ItemSet />
      </div>
    </div>
  );
}
