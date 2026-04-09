import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/content/blog/posts";

const BASE_URL = "https://andreantunes.co";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      authors: ["André Antunes"],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

const categoryColors: Record<string, { badge: string; dot: string; glow: string; border: string; text: string }> = {
  emerald: {
    badge: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
    dot: "bg-emerald-400",
    glow: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.12)",
    text: "#34d399",
  },
  blue: {
    badge: "bg-blue-400/10 text-blue-400 border-blue-400/20",
    dot: "bg-blue-400",
    glow: "rgba(96,165,250,0.08)",
    border: "rgba(96,165,250,0.12)",
    text: "#60a5fa",
  },
  purple: {
    badge: "bg-purple-400/10 text-purple-400 border-purple-400/20",
    dot: "bg-purple-400",
    glow: "rgba(167,139,250,0.08)",
    border: "rgba(167,139,250,0.12)",
    text: "#a78bfa",
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-PT", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const { default: Post } = await import(`@/content/blog/${slug}.mdx`);
  const colors = categoryColors[post.categoryColor];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${BASE_URL}/blog/${post.slug}/#article`,
    headline: post.title,
    description: post.description,
    image: `${BASE_URL}${post.image}`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: "André Antunes",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: "André Antunes",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${post.slug}`,
    },
    inLanguage: "pt-PT",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${BASE_URL}/blog/${post.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main className="min-h-[100dvh] pt-32 pb-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20">
          <div className="max-w-[720px] mx-auto">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-8 text-xs text-zinc-600">
              <Link href="/blog" className="hover:text-zinc-400 transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-zinc-500">{post.category}</span>
            </div>

            {/* Visual banner */}
            <div
              className="relative rounded-2xl overflow-hidden mb-10"
              style={{
                background: `linear-gradient(135deg, ${colors.glow} 0%, rgba(9,9,11,0.8) 100%)`,
                border: `1px solid ${colors.border}`,
                height: 180,
              }}
            >
              {/* Grid pattern */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              {/* Glow blob */}
              <div
                style={{
                  position: "absolute",
                  top: -40,
                  left: -40,
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  background: colors.glow,
                  filter: "blur(60px)",
                }}
              />
              {/* Category label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <span
                  className="text-[11px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: colors.text }}
                >
                  {post.category}
                </span>
                <p className="text-base md:text-lg font-bold text-zinc-100 text-center px-8 leading-snug max-w-[520px]">
                  {post.title}
                </p>
                <span className="text-[11px] text-zinc-600 font-mono">{post.readTime} de leitura</span>
              </div>
            </div>

            {/* Header */}
            <div className="flex flex-col gap-5 mb-10 pb-10 border-b border-white/6">
              <span className={`self-start inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${colors?.badge}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${colors?.dot}`} />
                {post.category}
              </span>
              <h1 className="text-2xl md:text-4xl font-bold tracking-tight leading-tight text-zinc-50">
                {post.title}
              </h1>
              <p className="text-base text-zinc-500 leading-relaxed">{post.description}</p>

              {/* Meta row */}
              <div className="flex items-center gap-6 pt-2">
                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-[11px] font-bold text-emerald-400">
                    AA
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-zinc-300">André Antunes</p>
                    <p className="text-[11px] text-zinc-600">Growth Partner</p>
                  </div>
                </div>
                <div className="h-4 w-px bg-white/8" />
                <div className="flex items-center gap-3 text-xs text-zinc-600">
                  <span>{formatDate(post.publishedAt)}</span>
                  <span>·</span>
                  <span>{post.readTime} de leitura</span>
                </div>
              </div>
            </div>

            {/* MDX Content */}
            <article className="prose-blog">
              <Post />
            </article>

            {/* CTA block */}
            <div className="mt-16 p-8 rounded-2xl border border-emerald-400/15 bg-emerald-400/4">
              <p className="text-xs font-semibold text-emerald-400/70 uppercase tracking-widest mb-3">Pronto para crescer?</p>
              <h3 className="text-xl font-bold text-zinc-50 mb-2 tracking-tight">
                Queres que eu trate disto por ti?
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-5">
                Construo a tua presença online em 10 dias — site profissional, SEO configurado, Google Maps activo. Com garantia de 60 dias ou devolução total.
              </p>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-400 text-zinc-950 font-semibold text-sm hover:bg-emerald-300 transition-colors duration-200"
              >
                Marca uma conversa de 15 min
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Back link */}
            <div className="mt-10 pt-8 border-t border-white/5">
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Voltar ao blog
              </Link>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
