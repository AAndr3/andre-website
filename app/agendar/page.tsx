import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AgendarClient from "./AgendarClient";

export const metadata: Metadata = {
  title: "Agendar conversa — André Antunes",
  description: "Agenda uma conversa de 15 minutos gratuita. Mostro-te exactamente o que podes fazer para aparecer no Google e ganhar mais pacientes.",
  robots: { index: false, follow: false },
};

export default function AgendarPage() {
  return (
    <>
      <Nav />
      <main className="min-h-[100dvh] pt-20 pb-24">
        <AgendarClient />
      </main>
      <Footer />
    </>
  );
}
