"use client";

import { useRef, MouseEvent, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function SpotlightCard({ children, className = "" }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--x", "-9999px");
    card.style.setProperty("--y", "-9999px");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        {
          "--x": "-9999px",
          "--y": "-9999px",
          background:
            "radial-gradient(circle 180px at var(--x) var(--y), rgba(52,211,153,0.08), transparent 70%)",
        } as React.CSSProperties
      }
      className={`relative rounded-2xl p-[1px] ${className}`}
    >
      {/* Spotlight border layer */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(circle 120px at var(--x) var(--y), rgba(52,211,153,0.25), transparent 70%)",
        }}
      />
      {children}
    </div>
  );
}
