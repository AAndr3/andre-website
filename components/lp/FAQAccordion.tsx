"use client";

import { useState } from "react";

type FAQ = { q: string; a: string };

export default function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex flex-col divide-y divide-white/5">
      {faqs.map((faq, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-start justify-between gap-4 py-5 text-left group"
            aria-expanded={open === i}
          >
            <span className="text-sm font-semibold text-zinc-200 group-hover:text-zinc-50 transition-colors leading-snug">
              {faq.q}
            </span>
            <span
              className="flex-shrink-0 w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-zinc-500 transition-all duration-200"
              style={{ transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </span>
          </button>
          {open === i && (
            <p className="pb-5 text-sm text-zinc-400 leading-relaxed">{faq.a}</p>
          )}
        </div>
      ))}
    </div>
  );
}
