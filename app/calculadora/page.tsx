import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Calculadora from "@/components/Calculadora";

export const metadata: Metadata = {
  title: "Calculadora de Pacientes — Estima o teu potencial no Google",
  description:
    "Descobre quantos pacientes potenciais pesquisam pela tua especialidade na tua cidade todos os meses. Gratuito, sem registo.",
  alternates: {
    canonical: "https://andreantunes.co/calculadora",
  },
  openGraph: {
    title: "Calculadora de Pacientes — Quanto potencial tens no Google?",
    description:
      "Selecciona a tua especialidade e cidade e descobre quantos pacientes potenciais podes atingir com o teu site.",
    type: "website",
  },
};

export default function CalculadoraPage() {
  return (
    <>
      <Nav />
      <main className="min-h-[100dvh] pt-28 pb-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20">

          {/* Hero */}
          <div className="max-w-[680px] mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/6 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-[0.12em]">Ferramenta gratuita</span>
            </div>
            <h1 className="text-3xl md:text-[2.6rem] font-bold tracking-tight leading-[1.1] text-zinc-50 mb-4">
              Quantos pacientes podes{" "}
              <br className="hidden sm:block" />
              <span className="text-zinc-400 font-normal">ganhar com presença online?</span>
            </h1>
            <p className="text-base text-zinc-500 leading-relaxed max-w-[46ch] mx-auto">
              Selecciona a tua especialidade e cidade. A calculadora estima quantos pacientes pesquisam por ti no Google todos os meses.
            </p>
          </div>

          {/* Calculator */}
          <Calculadora />

          {/* Footnote */}
          <p className="text-center text-[11px] text-zinc-700 mt-8 max-w-[480px] mx-auto leading-relaxed">
            Estimativas baseadas em dados médios de pesquisa Google para Portugal. Variam com sazonalidade, concorrência local e especialidade exacta.
          </p>

        </div>
      </main>
      <Footer />
    </>
  );
}
