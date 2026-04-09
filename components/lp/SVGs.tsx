export type SVGType = "google" | "growth" | "maps" | "patients";

export function GoogleRankSVG() {
  return (
    <svg viewBox="0 0 340 280" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Phone frame */}
      <rect x="90" y="10" width="160" height="260" rx="20" fill="#18181b" stroke="#27272a" strokeWidth="1.5"/>
      <rect x="95" y="16" width="150" height="248" rx="16" fill="#09090b"/>
      {/* Notch */}
      <rect x="145" y="18" width="50" height="8" rx="4" fill="#27272a"/>

      {/* Google bar */}
      <rect x="105" y="38" width="130" height="22" rx="11" fill="#27272a"/>
      <text x="122" y="53" fontSize="9" fill="#71717a" fontFamily="system-ui">
        psicólogo Lisboa
      </text>
      <circle cx="225" cy="49" r="5" fill="#34d399" opacity="0.6"/>

      {/* Maps pack header */}
      <text x="105" y="78" fontSize="7" fill="#52525b" fontFamily="system-ui">Resultados locais</text>

      {/* Result #1 — highlighted (André's client) */}
      <rect x="105" y="84" width="130" height="46" rx="8" fill="#052e16" stroke="#34d399" strokeWidth="1"/>
      <rect x="111" y="91" width="16" height="16" rx="3" fill="#34d399" opacity="0.15"/>
      <text x="130" y="101" fontSize="7.5" fontWeight="bold" fill="#34d399" fontFamily="system-ui">Dra. Mariana Costa</text>
      <text x="130" y="111" fontSize="6.5" fill="#4ade80" fontFamily="system-ui">Psicóloga Clínica · Lisboa</text>
      {/* Stars */}
      {[0,1,2,3,4].map(i => (
        <text key={i} x={130 + i * 8} y="121" fontSize="6" fill="#34d399">★</text>
      ))}
      <text x="172" y="121" fontSize="6" fill="#6b7280">4.9 (47)</text>
      {/* #1 badge */}
      <rect x="193" y="89" width="16" height="10" rx="3" fill="#34d399"/>
      <text x="198" y="97" fontSize="6" fontWeight="bold" fill="#052e16">#1</text>

      {/* Result #2 */}
      <rect x="105" y="134" width="130" height="38" rx="8" fill="#18181b" stroke="#3f3f46" strokeWidth="0.5"/>
      <rect x="111" y="141" width="14" height="14" rx="3" fill="#27272a"/>
      <text x="130" y="151" fontSize="7" fill="#71717a" fontFamily="system-ui">Dr. Paulo Mendes</text>
      <text x="130" y="160" fontSize="6" fill="#52525b" fontFamily="system-ui">Psicólogo · Lisboa</text>
      {[0,1,2,3].map(i => (
        <text key={i} x={130 + i * 7} y="168" fontSize="5.5" fill="#52525b">★</text>
      ))}
      <text x="160" y="168" fontSize="5.5" fill="#52525b">☆ 4.1 (12)</text>

      {/* Result #3 */}
      <rect x="105" y="176" width="130" height="38" rx="8" fill="#18181b" stroke="#3f3f46" strokeWidth="0.5"/>
      <rect x="111" y="183" width="14" height="14" rx="3" fill="#27272a"/>
      <text x="130" y="193" fontSize="7" fill="#71717a" fontFamily="system-ui">Psico Lisboa</text>
      <text x="130" y="202" fontSize="6" fill="#52525b" fontFamily="system-ui">Clínica · Lisboa</text>
      {[0,1,2].map(i => (
        <text key={i} x={130 + i * 7} y="210" fontSize="5.5" fill="#52525b">★</text>
      ))}
      <text x="152" y="210" fontSize="5.5" fill="#52525b">☆☆ 3.8 (6)</text>

      {/* Bottom bar */}
      <rect x="145" y="252" width="50" height="4" rx="2" fill="#27272a"/>

      {/* Floating badge left */}
      <rect x="0" y="80" width="82" height="32" rx="8" fill="#052e16" stroke="#34d399" strokeWidth="1"/>
      <text x="10" y="92" fontSize="8" fill="#34d399" fontFamily="system-ui">📍 1ª posição</text>
      <text x="10" y="104" fontSize="7" fill="#4ade80" fontFamily="system-ui">Google Maps</text>

      {/* Floating badge right */}
      <rect x="256" y="120" width="80" height="32" rx="8" fill="#18181b" stroke="#27272a" strokeWidth="1"/>
      <text x="264" y="132" fontSize="7.5" fill="#34d399" fontFamily="system-ui">+3 marcações</text>
      <text x="264" y="144" fontSize="6.5" fill="#71717a" fontFamily="system-ui">esta semana</text>
    </svg>
  );
}

export function GrowthChartSVG() {
  const points = [
    [20, 200], [60, 195], [100, 185], [140, 175], [180, 155],
    [220, 130], [260, 100], [300, 65], [320, 50],
  ];
  const polyline = points.map(p => p.join(",")).join(" ");
  const areaPath = `M20,200 ${points.map(p => `L${p[0]},${p[1]}`).join(" ")} L320,220 L20,220 Z`;

  return (
    <svg viewBox="0 0 340 240" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Grid lines */}
      {[60,110,160,210].map(y => (
        <line key={y} x1="20" y1={y} x2="320" y2={y} stroke="#27272a" strokeWidth="0.5" strokeDasharray="4 4"/>
      ))}

      {/* Area fill */}
      <path d={areaPath} fill="url(#growthGrad)" opacity="0.3"/>
      <defs>
        <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="#34d399" stopOpacity="0"/>
        </linearGradient>
      </defs>

      {/* Line */}
      <polyline points={polyline} stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>

      {/* Dots */}
      {points.filter((_, i) => i % 2 === 0).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill="#34d399" stroke="#09090b" strokeWidth="2"/>
      ))}

      {/* End dot (highlighted) */}
      <circle cx="320" cy="50" r="6" fill="#34d399" stroke="#09090b" strokeWidth="2"/>
      <circle cx="320" cy="50" r="12" fill="#34d399" opacity="0.15"/>

      {/* Labels Y */}
      {["0", "5", "15", "30+"].map((l, i) => (
        <text key={i} x="8" y={210 - i * 50} fontSize="8" fill="#52525b" textAnchor="middle">{l}</text>
      ))}
      <text x="14" y="100" fontSize="7" fill="#52525b" transform="rotate(-90 14 130)">pacientes/mês</text>

      {/* Labels X */}
      {["Jan", "Mar", "Mai", "Jul"].map((l, i) => (
        <text key={i} x={60 + i * 80} y="228" fontSize="8" fill="#52525b" textAnchor="middle">{l}</text>
      ))}

      {/* Annotation */}
      <rect x="200" y="20" width="110" height="36" rx="8" fill="#18181b" stroke="#34d399" strokeWidth="1"/>
      <text x="211" y="34" fontSize="8" fill="#34d399" fontFamily="system-ui">+347% pacientes</text>
      <text x="211" y="46" fontSize="7" fill="#71717a" fontFamily="system-ui">após 6 meses online</text>
      <line x1="320" y1="50" x2="280" y2="38" stroke="#34d399" strokeWidth="0.75" strokeDasharray="3 2"/>

      {/* Month 0 annotation */}
      <rect x="22" y="175" width="70" height="26" rx="6" fill="#18181b" stroke="#3f3f46" strokeWidth="0.5"/>
      <text x="30" y="186" fontSize="7" fill="#71717a">Site lançado</text>
      <text x="30" y="196" fontSize="7" fill="#52525b">Mês 0</text>
    </svg>
  );
}

export function GoogleMapsSVG() {
  return (
    <svg viewBox="0 0 340 260" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Map background */}
      <rect x="10" y="10" width="320" height="180" rx="12" fill="#18181b" stroke="#27272a" strokeWidth="1"/>

      {/* Map grid roads */}
      <line x1="10" y1="70" x2="330" y2="70" stroke="#27272a" strokeWidth="1"/>
      <line x1="10" y1="130" x2="330" y2="130" stroke="#27272a" strokeWidth="1"/>
      <line x1="80" y1="10" x2="80" y2="190" stroke="#27272a" strokeWidth="1"/>
      <line x1="170" y1="10" x2="170" y2="190" stroke="#27272a" strokeWidth="1"/>
      <line x1="260" y1="10" x2="260" y2="190" stroke="#27272a" strokeWidth="1"/>

      {/* Road highlights */}
      <line x1="10" y1="100" x2="330" y2="100" stroke="#3f3f46" strokeWidth="3"/>
      <line x1="125" y1="10" x2="125" y2="190" stroke="#3f3f46" strokeWidth="3"/>

      {/* Map pin #1 — highlighted */}
      <ellipse cx="125" cy="75" rx="10" ry="4" fill="#34d399" opacity="0.2"/>
      <path d="M125 30 C113 30 104 39 104 50 C104 65 125 80 125 80 C125 80 146 65 146 50 C146 39 137 30 125 30Z" fill="#34d399"/>
      <circle cx="125" cy="50" r="8" fill="#052e16"/>
      <text x="121" y="54" fontSize="9" fontWeight="bold" fill="#34d399">1</text>

      {/* Map pin #2 */}
      <ellipse cx="230" cy="95" rx="8" ry="3" fill="#52525b" opacity="0.3"/>
      <path d="M230 60 C221 60 214 67 214 76 C214 87 230 100 230 100 C230 100 246 87 246 76 C246 67 239 60 230 60Z" fill="#52525b"/>
      <circle cx="230" cy="76" r="6" fill="#27272a"/>
      <text x="227" y="79" fontSize="8" fill="#71717a">2</text>

      {/* Map pin #3 */}
      <ellipse cx="60" cy="145" rx="7" ry="3" fill="#52525b" opacity="0.3"/>
      <path d="M60 112 C52 112 46 118 46 126 C46 136 60 148 60 148 C60 148 74 136 74 126 C74 118 68 112 60 112Z" fill="#52525b"/>
      <circle cx="60" cy="126" r="6" fill="#27272a"/>
      <text x="57" y="129" fontSize="8" fill="#71717a">3</text>

      {/* Results panel */}
      <rect x="10" y="195" width="320" height="55" rx="10" fill="#18181b" stroke="#27272a" strokeWidth="1"/>

      {/* Result 1 */}
      <rect x="18" y="202" width="90" height="40" rx="6" fill="#052e16" stroke="#34d399" strokeWidth="0.75"/>
      <text x="24" y="215" fontSize="7" fontWeight="bold" fill="#34d399" fontFamily="system-ui">Dra. M. Costa</text>
      <text x="24" y="225" fontSize="6" fill="#4ade80">★★★★★ 4.9</text>
      <text x="24" y="234" fontSize="5.5" fill="#6b7280">Psicóloga · Lisboa</text>

      {/* Result 2 */}
      <rect x="116" y="202" width="85" height="40" rx="6" fill="#1c1c1f" stroke="#3f3f46" strokeWidth="0.5"/>
      <text x="122" y="215" fontSize="7" fill="#71717a" fontFamily="system-ui">Paulo Mendes</text>
      <text x="122" y="225" fontSize="6" fill="#52525b">★★★★☆ 4.1</text>
      <text x="122" y="234" fontSize="5.5" fill="#52525b">Psicólogo · Lisboa</text>

      {/* Result 3 */}
      <rect x="209" y="202" width="85" height="40" rx="6" fill="#1c1c1f" stroke="#3f3f46" strokeWidth="0.5"/>
      <text x="215" y="215" fontSize="7" fill="#71717a" fontFamily="system-ui">Psico Lisboa</text>
      <text x="215" y="225" fontSize="6" fill="#52525b">★★★☆☆ 3.8</text>
      <text x="215" y="234" fontSize="5.5" fill="#52525b">Clínica · Lisboa</text>

      {/* Floating badge */}
      <rect x="154" y="18" width="90" height="26" rx="7" fill="#052e16" stroke="#34d399" strokeWidth="1"/>
      <text x="163" y="30" fontSize="7.5" fill="#34d399">📍 Top #1 Maps</text>
      <text x="163" y="40" fontSize="6.5" fill="#4ade80">3x mais chamadas</text>
    </svg>
  );
}

export function PatientsSVG() {
  return (
    <svg viewBox="0 0 340 240" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Flow: Search → Site → Booking */}

      {/* Step 1: Search */}
      <rect x="10" y="80" width="80" height="80" rx="12" fill="#18181b" stroke="#27272a" strokeWidth="1"/>
      <text x="26" y="108" fontSize="18">🔍</text>
      <text x="26" y="126" fontSize="8" fill="#71717a" fontFamily="system-ui">Paciente</text>
      <text x="26" y="137" fontSize="8" fill="#71717a" fontFamily="system-ui">pesquisa no</text>
      <text x="26" y="148" fontSize="8" fill="#34d399" fontFamily="system-ui">Google</text>

      {/* Arrow 1 */}
      <path d="M92 120 L118 120" stroke="#34d399" strokeWidth="1.5" strokeDasharray="3 2"/>
      <path d="M114 115 L122 120 L114 125" fill="none" stroke="#34d399" strokeWidth="1.5"/>

      {/* Step 2: Site */}
      <rect x="120" y="80" width="100" height="80" rx="12" fill="#052e16" stroke="#34d399" strokeWidth="1"/>
      {/* Mini browser */}
      <rect x="130" y="90" width="80" height="60" rx="6" fill="#09090b" stroke="#34d399" strokeWidth="0.5"/>
      <rect x="130" y="90" width="80" height="14" rx="6" fill="#34d399" opacity="0.15"/>
      <circle cx="137" cy="97" r="2.5" fill="#34d399" opacity="0.6"/>
      <circle cx="144" cy="97" r="2.5" fill="#34d399" opacity="0.3"/>
      <circle cx="151" cy="97" r="2.5" fill="#34d399" opacity="0.15"/>
      {/* Content lines */}
      <rect x="136" y="110" width="50" height="4" rx="2" fill="#34d399" opacity="0.5"/>
      <rect x="136" y="118" width="38" height="3" rx="1.5" fill="#52525b"/>
      <rect x="136" y="124" width="44" height="3" rx="1.5" fill="#52525b"/>
      {/* CTA button */}
      <rect x="136" y="131" width="32" height="11" rx="5" fill="#34d399"/>
      <text x="141" y="139.5" fontSize="5.5" fill="#052e16" fontWeight="bold">Marcar</text>
      <text x="116" y="170" fontSize="7" fill="#34d399" textAnchor="middle">O teu site</text>

      {/* Arrow 2 */}
      <path d="M222 120 L248 120" stroke="#34d399" strokeWidth="1.5" strokeDasharray="3 2"/>
      <path d="M244 115 L252 120 L244 125" fill="none" stroke="#34d399" strokeWidth="1.5"/>

      {/* Step 3: Booking */}
      <rect x="250" y="80" width="80" height="80" rx="12" fill="#18181b" stroke="#27272a" strokeWidth="1"/>
      <text x="266" y="108" fontSize="18">📅</text>
      <text x="266" y="126" fontSize="8" fill="#71717a" fontFamily="system-ui">Consulta</text>
      <text x="266" y="137" fontSize="8" fill="#71717a" fontFamily="system-ui">marcada</text>
      <text x="266" y="148" fontSize="8" fill="#34d399" fontFamily="system-ui">directamente</text>

      {/* Stats below */}
      <rect x="10" y="178" width="100" height="36" rx="8" fill="#18181b" stroke="#27272a" strokeWidth="0.75"/>
      <text x="60" y="193" fontSize="14" fontWeight="bold" fill="#34d399" textAnchor="middle">77%</text>
      <text x="60" y="206" fontSize="7" fill="#71717a" textAnchor="middle">pesquisam online primeiro</text>

      <rect x="120" y="178" width="100" height="36" rx="8" fill="#052e16" stroke="#34d399" strokeWidth="0.75"/>
      <text x="170" y="193" fontSize="14" fontWeight="bold" fill="#34d399" textAnchor="middle">10 dias</text>
      <text x="170" y="206" fontSize="7" fill="#4ade80" textAnchor="middle">do briefing ao live</text>

      <rect x="230" y="178" width="100" height="36" rx="8" fill="#18181b" stroke="#27272a" strokeWidth="0.75"/>
      <text x="280" y="193" fontSize="14" fontWeight="bold" fill="#34d399" textAnchor="middle">60 dias</text>
      <text x="280" y="206" fontSize="7" fill="#71717a" textAnchor="middle">garantia de resultado</text>

      {/* People icons flowing */}
      {[0,1,2].map(i => (
        <g key={i}>
          <circle cx={38 + i * 14} cy={54 + (i % 2) * 8} r="7" fill={i === 0 ? "#3b82f6" : i === 1 ? "#8b5cf6" : "#ec4899"} opacity="0.3"/>
          <circle cx={38 + i * 14} cy={50 + (i % 2) * 8} r="4" fill={i === 0 ? "#3b82f6" : i === 1 ? "#8b5cf6" : "#ec4899"} opacity="0.5"/>
        </g>
      ))}
      <path d="M80 57 L118 95" stroke="#27272a" strokeWidth="0.75" strokeDasharray="2 2"/>
    </svg>
  );
}

export function LPIllustration({ type }: { type: SVGType }) {
  switch (type) {
    case "google":   return <GoogleRankSVG />;
    case "growth":   return <GrowthChartSVG />;
    case "maps":     return <GoogleMapsSVG />;
    case "patients": return <PatientsSVG />;
  }
}
