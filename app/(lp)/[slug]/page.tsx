import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LandingTemplate from "@/components/lp/LandingTemplate";
import { pages } from "@/content/lp/pages";

export const dynamicParams = false;

export function generateStaticParams() {
  return pages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = pages.find((p) => p.slug === slug);
  if (!page) return {};

  const BASE = "https://andreantunes.co";
  return {
    title: page.meta.title,
    description: page.meta.description,
    keywords: [page.keyword, "André Antunes", "site médico portugal", "SEO médicos portugal"],
    alternates: { canonical: `${BASE}/${slug}` },
    openGraph: {
      type: "website",
      locale: "pt_PT",
      url: `${BASE}/${slug}`,
      title: page.meta.title,
      description: page.meta.description,
    },
    robots: { index: true, follow: true },
  };
}

const BASE = "https://andreantunes.co";

export default async function LPPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = pages.find((p) => p.slug === slug);
  if (!page) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: page.meta.title,
        provider: {
          "@type": "Person",
          name: "André Antunes",
          url: BASE,
          jobTitle: "Growth Partner — Presença Online para Profissionais de Saúde",
        },
        description: page.meta.description,
        url: `${BASE}/${slug}`,
        areaServed: { "@type": "Country", name: "Portugal" },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "30",
          bestRating: "5",
        },
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: BASE },
          { "@type": "ListItem", position: 2, name: page.meta.title, item: `${BASE}/${slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <LandingTemplate page={page} />
      <Footer />
    </>
  );
}
