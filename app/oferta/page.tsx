import type { Metadata } from "next";
import OfertaClient from "./OfertaClient";

export const metadata: Metadata = {
  title: "Sistema Online para Psicólogos — André Antunes",
  description: "Construo o sistema online que duplica os teus pacientes em 6 meses. Site, Google Ads e funil. Tu só atendes.",
  robots: { index: false, follow: false },
};

export default function OfertaPage() {
  return (
    <main className="min-h-[100dvh]">
      <OfertaClient />
    </main>
  );
}
