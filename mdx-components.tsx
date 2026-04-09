import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";
import React from "react";

// ─── Custom blog components available in all MDX files ───────────────────────

type CalloutType = "info" | "tip" | "warning" | "success";

const calloutConfig: Record<CalloutType, { icon: string; border: string; bg: string; label: string; labelColor: string }> = {
  info:    { icon: "ℹ️",  border: "border-blue-400/20",    bg: "bg-blue-400/5",    label: "Sabia que",    labelColor: "text-blue-400" },
  tip:     { icon: "💡",  border: "border-emerald-400/20", bg: "bg-emerald-400/5", label: "Dica",         labelColor: "text-emerald-400" },
  warning: { icon: "⚠️", border: "border-amber-400/20",   bg: "bg-amber-400/5",   label: "Atenção",      labelColor: "text-amber-400" },
  success: { icon: "✅",  border: "border-emerald-400/25", bg: "bg-emerald-400/8", label: "Resultado",    labelColor: "text-emerald-400" },
};

export function Callout({ type = "info", children }: { type?: CalloutType; children: React.ReactNode }) {
  const c = calloutConfig[type];
  return (
    <div className={`my-6 rounded-xl border ${c.border} ${c.bg} p-5`}>
      <div className={`flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-widest ${c.labelColor}`}>
        <span>{c.icon}</span>
        <span>{c.label}</span>
      </div>
      <div className="text-sm text-zinc-300 leading-relaxed [&>p]:mb-0">{children}</div>
    </div>
  );
}

export function Stat({ value, label, sub }: { value: string; label: string; sub?: string }) {
  return (
    <div className="flex flex-col gap-1 p-5 rounded-xl border border-white/6 bg-zinc-900/50 text-center">
      <p className="text-3xl font-bold text-zinc-50 font-mono tracking-tight">{value}</p>
      <p className="text-sm font-semibold text-zinc-300">{label}</p>
      {sub && <p className="text-xs text-zinc-500">{sub}</p>}
    </div>
  );
}

export function StatsRow({ children }: { children: React.ReactNode }) {
  return <div className="my-6 grid grid-cols-2 md:grid-cols-3 gap-3">{children}</div>;
}

export function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 my-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-400/15 border border-emerald-400/30 flex items-center justify-center text-xs font-bold text-emerald-400 font-mono">
        {n}
      </div>
      <div className="flex-1">
        <p className="font-semibold text-zinc-100 mb-1">{title}</p>
        <div className="text-sm text-zinc-400 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

export function KeyQuote({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-8 relative pl-6 border-l-2 border-emerald-400/40">
      <div className="absolute -left-[3px] top-0 w-1.5 h-1.5 rounded-full bg-emerald-400" />
      <p className="text-lg font-medium text-zinc-200 italic leading-relaxed">{children}</p>
    </div>
  );
}

export function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 py-2 border-b border-white/4 last:border-0">
      <span className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-emerald-400/15 border border-emerald-400/30 flex items-center justify-center">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </span>
      <span className="text-sm text-zinc-300 leading-relaxed">{children}</span>
    </li>
  );
}

export function Checklist({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="my-6 rounded-xl border border-white/6 bg-zinc-900/40 p-5">
      {title && <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">{title}</p>}
      <ul className="flex flex-col">{children}</ul>
    </div>
  );
}

export function CTA() {
  return (
    <div className="my-10 p-8 rounded-2xl border border-emerald-400/15 bg-emerald-400/4 text-center">
      <p className="text-xs font-semibold text-emerald-400/70 uppercase tracking-widest mb-3">Pronto para crescer?</p>
      <h3 className="text-xl font-bold text-zinc-50 mb-2 tracking-tight">Queres que eu trate disto por ti?</h3>
      <p className="text-sm text-zinc-400 leading-relaxed mb-5">
        Construo a tua presença online em 10 dias — site profissional, SEO configurado, Google Maps activo. Com garantia de 60 dias ou devolução total.
      </p>
      <a
        href="/contacto"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-400 text-zinc-950 font-semibold text-sm hover:bg-emerald-300 transition-colors duration-200"
      >
        Marca uma conversa de 15 min
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  );
}

// ─── MDX component mapping (typography + custom) ─────────────────────────────

const components: MDXComponents = {
  // Headings
  h1: ({ children }) => (
    <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight text-zinc-50 mt-2 mb-6">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-100 mt-12 mb-4 pb-3 border-b border-white/6">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-base md:text-lg font-semibold text-zinc-200 mt-8 mb-3">{children}</h3>
  ),
  // Paragraphs + inline
  p: ({ children }) => (
    <p className="text-base text-zinc-400 leading-relaxed mb-5">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-zinc-200">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-zinc-300">{children}</em>
  ),
  a: ({ children, href }) => (
    <a href={href} className="text-emerald-400 underline underline-offset-2 decoration-emerald-400/40 hover:decoration-emerald-400 transition-all duration-150" target={href?.startsWith("http") ? "_blank" : undefined} rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}>
      {children}
    </a>
  ),
  // Lists
  ul: ({ children }) => (
    <ul className="my-4 flex flex-col gap-2 pl-0 list-none">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 flex flex-col gap-2 pl-0 list-none counter-reset-[item]">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="flex items-start gap-3 text-sm text-zinc-400 leading-relaxed">
      <span className="flex-shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-emerald-400/60" />
      <span>{children}</span>
    </li>
  ),
  // Blockquote
  blockquote: ({ children }) => (
    <blockquote className="my-6 pl-5 border-l-2 border-emerald-400/30 text-zinc-300 italic text-base leading-relaxed">{children}</blockquote>
  ),
  // Code
  code: ({ children }) => (
    <code className="px-1.5 py-0.5 rounded bg-zinc-800 text-emerald-400 text-[0.85em] font-mono">{children}</code>
  ),
  pre: ({ children }) => (
    <pre className="my-6 p-5 rounded-xl bg-zinc-900 border border-white/6 overflow-x-auto text-sm font-mono text-zinc-300 leading-relaxed">{children}</pre>
  ),
  // HR
  hr: () => (
    <div className="my-10">
      <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
    </div>
  ),
  // Table
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-white/6">
      <table className="w-full min-w-[480px] border-collapse text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-zinc-900/80">{children}</thead>
  ),
  tbody: ({ children }) => (
    <tbody>{children}</tbody>
  ),
  tr: ({ children }) => (
    <tr className="border-b border-white/5 last:border-0 hover:bg-white/[0.015] transition-colors">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="px-4 py-3 text-left text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">{children}</th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 text-zinc-400">{children}</td>
  ),
  // Image
  img: (props) => (
    <div className="my-6 rounded-xl overflow-hidden border border-white/6">
      <Image
        sizes="(max-width: 768px) 100vw, 720px"
        style={{ width: "100%", height: "auto" }}
        {...(props as ImageProps)}
        alt={props.alt ?? ""}
      />
    </div>
  ),
  // Custom components
  Callout,
  Stat,
  StatsRow,
  Step,
  KeyQuote,
  CheckItem,
  Checklist,
  CTA,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
