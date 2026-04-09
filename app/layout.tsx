import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://andreantunes.co";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "André Antunes — Mais pacientes. Em 10 dias. Com garantia.",
    template: "%s | André Antunes",
  },
  description:
    "Construo a presença online de médicos e psicólogos independentes. Site profissional em 10 dias, SEO configurado, Google Maps activo. Garantia de aparecer no Google em 60 dias ou devolução total.",
  keywords: [
    "site para médicos",
    "site para psicólogos",
    "presença online profissionais de saúde",
    "SEO médicos portugal",
    "SEO médicos Lisboa",
    "SEO médicos Porto",
    "SEO psicólogos Lisboa",
    "site psicólogo Lisboa",
    "site médico Porto",
    "site médico Braga",
    "site médico Coimbra",
    "google maps consultório",
    "marketing médico portugal",
    "site consultório médico",
    "como ter mais pacientes",
    "growth partner saúde",
    "André Antunes",
  ],
  authors: [{ name: "André Antunes", url: BASE_URL }],
  creator: "André Antunes",
  publisher: "André Antunes",
  verification: {
    google: "IG-xcJuVYCk4a8hJl6sG5-AvSwHQKnXPo3hWso1UtZA",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: BASE_URL,
    siteName: "André Antunes",
    title: "André Antunes — Mais pacientes. Em 10 dias. Com garantia.",
    description:
      "Construo a presença online de médicos e psicólogos. Site profissional em 10 dias, SEO + Google Maps incluídos. Garantia de 60 dias ou devolução total.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "André Antunes — Growth Partner para profissionais de saúde",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "André Antunes — Mais pacientes. Em 10 dias.",
    description:
      "Site profissional para médicos e psicólogos. SEO + Google Maps. Garantia 60 dias.",
    images: ["/opengraph-image"],
    creator: "@andreantunes",
  },
  alternates: {
    canonical: BASE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: "André Antunes",
      url: BASE_URL,
      jobTitle: "Growth Partner — Presença Online para Profissionais de Saúde",
      description:
        "Especialista em presença online para médicos e psicólogos independentes. Cria sites profissionais com SEO e Google Maps em 10 dias, com garantia de aparecer no Google em 60 dias.",
      image: `${BASE_URL}/andre.png`,
      sameAs: ["https://andreantunes.co"],
      knowsAbout: [
        "SEO local",
        "Google Business Profile",
        "Marketing digital para saúde",
        "Web design para consultórios",
      ],
    },
    {
      "@type": "Service",
      "@id": `${BASE_URL}/#service`,
      name: "Site Profissional para Médicos e Psicólogos",
      provider: { "@id": `${BASE_URL}/#person` },
      serviceType: "Web Design e SEO para profissionais de saúde",
      description:
        "Site profissional com copy escrito à medida, SEO configurado e Google Maps activo. Entrega em 10 dias com garantia de aparecer no Google em 60 dias.",
      areaServed: [
        { "@type": "City", name: "Lisboa" },
        { "@type": "City", name: "Porto" },
        { "@type": "City", name: "Braga" },
        { "@type": "City", name: "Coimbra" },
        { "@type": "City", name: "Setúbal" },
        { "@type": "City", name: "Faro" },
        { "@type": "Country", name: "Portugal" },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "30",
        bestRating: "5",
        worstRating: "1",
      },
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        validFrom: "2024-01-01",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "André Antunes",
      description:
        "Growth partner para médicos e psicólogos independentes com consultório próprio.",
      publisher: { "@id": `${BASE_URL}/#person` },
      inLanguage: "pt-PT",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Quanto tempo demora a aparecer no Google?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A garantia é de 60 dias. Na maioria dos casos acontece mais cedo — entre 2 a 4 semanas após o lançamento do site. Depende da competitividade da especialidade e localização.",
          },
        },
        {
          "@type": "Question",
          name: "O que está incluído no serviço?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Copy do site escrito à medida, SEO técnico configurado, Google Maps activo e optimizado, entrega em 10 dias e suporte após o lançamento.",
          },
        },
        {
          "@type": "Question",
          name: "E se não aparecer no Google em 60 dias?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Devolvo 100% do valor pago, sem condições e sem discussão. O risco é inteiramente meu.",
          },
        },
        {
          "@type": "Question",
          name: "Preciso de saber tecnologia ou marketing?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Não. Trato de tudo — do copy ao SEO, do design à configuração do Google Maps. Tu só tens de aprovar o resultado final.",
          },
        },
        {
          "@type": "Question",
          name: "Trabalhas com qualquer especialidade médica?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Trabalho com médicos e psicólogos independentes com consultório próprio — qualquer especialidade. Já ajudei clínicos gerais, psicólogos clínicos, pediatras, dermatologistas e outros.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {/* This wrapper is the single source of truth for overflow containment on iOS */}
        <div style={{ overflowX: "hidden", width: "100%", position: "relative" }}>
          {children}
        </div>
      </body>
    </html>
  );
}
