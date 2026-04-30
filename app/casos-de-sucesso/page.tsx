import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CasosClient from "./CasosClient";

export const metadata: Metadata = {
  title: "Casos de Sucesso — André Antunes",
  description: "Resultados reais de profissionais de saúde que passaram de invisíveis no Google para agenda cheia.",
};

export default function CasosPage() {
  return (
    <>
      <Nav />
      <main className="min-h-[100dvh] pt-28 pb-24">
        <CasosClient />
      </main>
      <Footer />
    </>
  );
}
