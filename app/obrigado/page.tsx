import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Obrigado — André Antunes",
  robots: { index: false, follow: false },
};

export default function ObrigadoPage() {
  return (
    <main className="min-h-[100dvh] bg-zinc-950">
      <Nav />
      {/* GA4 conversion event fired client-side */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            if(typeof gtag !== 'undefined'){
              gtag('event','lead_submitted',{event_category:'conversion',event_label:'contact_form'});
            }
          `,
        }}
      />
      <div className="flex flex-col items-center justify-center min-h-[80dvh] px-4 text-center">
        <div className="flex flex-col items-center gap-6 max-w-[480px]">
          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>

          <div className="flex flex-col gap-3">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-50">
              Recebi a tua mensagem.
            </h1>
            <p className="text-base text-zinc-400 leading-relaxed">
              Entro em contacto em menos de 24h para confirmar o horário da conversa. Enquanto isso, escolhe um horário directamente no calendário.
            </p>
          </div>

          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-400 text-zinc-950 font-semibold text-sm hover:bg-emerald-300 transition-colors duration-200"
          >
            Escolher horário agora
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>

          <Link href="/" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
            Voltar ao início
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
