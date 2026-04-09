import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/content/blog/posts";

export const metadata: Metadata = {
  title: "Blog — Mais pacientes para o teu consultório",
  description: "Guias práticos sobre SEO, Google Maps e presença digital para médicos e psicólogos independentes em Portugal.",
};

const categoryColors: Record<string, { badge: string; dot: string }> = {
  emerald: { badge: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20", dot: "bg-emerald-400" },
  blue:    { badge: "bg-blue-400/10 text-blue-400 border-blue-400/20",          dot: "bg-blue-400" },
  purple:  { badge: "bg-purple-400/10 text-purple-400 border-purple-400/20",    dot: "bg-purple-400" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-PT", { day: "numeric", month: "long", year: "numeric" });
}

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <main className="min-h-[100dvh] pt-32 pb-24">
      <div className="max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20">

        {/* Header */}
        <div className="flex flex-col gap-3 mb-14">
          <p className="text-[11px] font-semibold text-zinc-600 uppercase tracking-[0.15em]">Blog</p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight text-zinc-50">
            Guias para crescer online
            <br />
            <span className="text-zinc-500 font-normal">sem perderes tempo com o que não importa.</span>
          </h1>
        </div>

        {/* Featured post */}
        <Link href={`/blog/${featured.slug}`} className="group block mb-6">
          <article className="rounded-2xl border border-white/6 bg-zinc-900/40 hover:border-white/10 hover:bg-zinc-900/60 transition-all duration-300 overflow-hidden">
            {/* Visual banner */}
            <div
              className="relative w-full"
              style={{
                height: 160,
                background: `linear-gradient(135deg, ${featured.categoryColor === "emerald" ? "rgba(52,211,153,0.08)" : featured.categoryColor === "blue" ? "rgba(96,165,250,0.08)" : "rgba(167,139,250,0.08)"} 0%, rgba(9,9,11,0.9) 100%)`,
                borderBottom: `1px solid ${featured.categoryColor === "emerald" ? "rgba(52,211,153,0.1)" : featured.categoryColor === "blue" ? "rgba(96,165,250,0.1)" : "rgba(167,139,250,0.1)"}`,
              }}
            >
              <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-[11px] font-semibold uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${categoryColors[featured.categoryColor]?.badge}`}>
                  {featured.category}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 p-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${categoryColors[featured.categoryColor]?.badge}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${categoryColors[featured.categoryColor]?.dot}`} />
                  {featured.category}
                </span>
                <span className="text-[11px] text-zinc-600">Mais recente</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-100 group-hover:text-zinc-50 transition-colors leading-snug">
                {featured.title}
              </h2>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-[60ch]">{featured.description}</p>
              <div className="flex items-center gap-4 pt-2">
                <span className="text-xs text-zinc-600">{formatDate(featured.publishedAt)}</span>
                <span className="text-xs text-zinc-700">·</span>
                <span className="text-xs text-zinc-600">{featured.readTime} de leitura</span>
              </div>
            </div>
            <div className="hidden lg:flex items-center">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/6 text-sm text-zinc-400 group-hover:text-zinc-200 group-hover:border-white/12 transition-all duration-200">
                Ler artigo
                <svg className="transition-transform duration-200 group-hover:translate-x-1" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            </div>
          </article>
        </Link>

        {/* Rest of posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rest.map((post) => {
            const colors = categoryColors[post.categoryColor];
            return (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <article className="h-full flex flex-col rounded-2xl border border-white/6 bg-zinc-900/40 hover:border-white/10 hover:bg-zinc-900/60 transition-all duration-300 overflow-hidden">
                  {/* Color strip */}
                  <div
                    style={{
                      height: 4,
                      background: post.categoryColor === "emerald"
                        ? "linear-gradient(90deg, rgba(52,211,153,0.6), rgba(52,211,153,0.1))"
                        : post.categoryColor === "blue"
                        ? "linear-gradient(90deg, rgba(96,165,250,0.6), rgba(96,165,250,0.1))"
                        : "linear-gradient(90deg, rgba(167,139,250,0.6), rgba(167,139,250,0.1))",
                    }}
                  />
                  <div className="flex flex-col gap-4 p-7 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${colors?.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${colors?.dot}`} />
                      {post.category}
                    </span>
                  </div>
                  <h2 className="text-base font-bold tracking-tight text-zinc-200 group-hover:text-zinc-50 transition-colors leading-snug flex-1">
                    {post.title}
                  </h2>
                  <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2">{post.description}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-white/4">
                    <span className="text-xs text-zinc-600">{formatDate(post.publishedAt)}</span>
                    <span className="text-xs text-zinc-600">{post.readTime}</span>
                  </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

      </div>
    </main>
  );
}
