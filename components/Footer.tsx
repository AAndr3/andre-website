import Link from "next/link";
import { posts } from "@/content/blog/posts";
import { pages } from "@/content/lp/pages";

const featuredLPs = pages.slice(0, 4);

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-zinc-950">
      <div className="max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20 py-8 md:py-16">

        {/* Mobile: Brand + CTA side by side */}
        <div className="flex items-start justify-between gap-6 mb-6 md:hidden">
          <div className="flex flex-col gap-2">
            <Link href="/" className="text-sm font-semibold text-zinc-100 tracking-tight hover:text-zinc-300 transition-colors">
              André Antunes
            </Link>
            <p className="text-xs text-zinc-600 leading-relaxed max-w-[22ch]">
              Growth partner para médicos e psicólogos em Portugal.
            </p>
            <div className="flex gap-0.5 mt-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="10" height="10" viewBox="0 0 12 12" fill="#34d399" opacity="0.7">
                  <path d="M6 1l1.5 3 3.3.5-2.4 2.3.6 3.2L6 8.5 3 10l.6-3.2L1.2 4.5l3.3-.5z" />
                </svg>
              ))}
              <span className="text-[11px] text-zinc-600 ml-1">4.9 · 30+</span>
            </div>
          </div>
          <a
            href="/contacto"
            className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-xs font-semibold text-emerald-400 hover:bg-emerald-400/15 transition-colors duration-150"
          >
            Falar comigo
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Desktop: full 4-column grid */}
        <div className="hidden md:grid md:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="text-sm font-semibold text-zinc-100 tracking-tight hover:text-zinc-300 transition-colors">
              André Antunes
            </Link>
            <p className="text-xs text-zinc-600 leading-relaxed max-w-[22ch]">
              Growth partner para médicos e psicólogos independentes em Portugal.
            </p>
            <div className="flex gap-0.5 mt-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="11" height="11" viewBox="0 0 12 12" fill="#34d399" opacity="0.7">
                  <path d="M6 1l1.5 3 3.3.5-2.4 2.3.6 3.2L6 8.5 3 10l.6-3.2L1.2 4.5l3.3-.5z" />
                </svg>
              ))}
              <span className="text-[11px] text-zinc-600 ml-1.5">4.9 · 30+ clientes</span>
            </div>
          </div>

          {/* Serviços */}
          <div className="flex flex-col gap-4">
            <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.15em]">Serviços</p>
            <div className="flex flex-col gap-2.5">
              {featuredLPs.map((p) => (
                <Link
                  key={p.slug}
                  href={`/${p.slug}`}
                  className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors duration-150 leading-snug"
                >
                  {p.keyword.charAt(0).toUpperCase() + p.keyword.slice(1)}
                </Link>
              ))}
            </div>
          </div>

          {/* Blog */}
          <div className="flex flex-col gap-4">
            <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.15em]">Blog</p>
            <div className="flex flex-col gap-2.5">
              {posts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors duration-150 leading-snug"
                >
                  {p.title.length > 48 ? p.title.slice(0, 48) + "…" : p.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Contacto */}
          <div className="flex flex-col gap-4">
            <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.15em]">Contacto</p>
            <div className="flex flex-col gap-3">
              <a
                href="/contacto"
                className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors duration-150"
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                Marca uma conversa
              </a>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#52525b" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                  <span className="text-[11px] text-zinc-600">Entrega em 10 dias</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#52525b" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                  <span className="text-[11px] text-zinc-600">Garantia 60 dias</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#52525b" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                  <span className="text-[11px] text-zinc-600">Máx. 4 clientes/mês</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-5 md:pt-8 border-t border-white/5">
          <span className="text-xs text-zinc-700">© {new Date().getFullYear()} André Antunes · andreantunes.co</span>
          <div className="flex items-center gap-5">
            <Link href="/blog" className="text-[11px] text-zinc-700 hover:text-zinc-500 transition-colors">Blog</Link>
            <Link href="/calculadora" className="text-[11px] text-zinc-700 hover:text-zinc-500 transition-colors">Calculadora</Link>
            <Link href="/site-para-medicos-portugal" className="text-[11px] text-zinc-700 hover:text-zinc-500 transition-colors">Site para médicos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
