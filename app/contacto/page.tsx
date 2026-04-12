import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Falar comigo — André Antunes",
  description: "Conversa de 15 minutos gratuita. Diz-me a tua especialidade e cidade e mostro-te exactamente o que precisas de fazer para aparecer no Google.",
  robots: { index: false, follow: false },
};

export default function ContactoPage() {
  return (
    <>
      <Nav />
      <main className="min-h-[100dvh] pt-24">
        <ContactSection source="contacto" />
      </main>
      <Footer />
    </>
  );
}
