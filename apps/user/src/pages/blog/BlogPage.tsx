import { ArrowRight, CalendarDays, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { resolveAssetUrl } from "@/utils/assets";
import { blogPosts } from "./data/posts";

export default function BlogPage() {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <div className="pb-24">
      <Breadcrumb items={[{ label: "Home", to: "/home" }, { label: "Blog" }]} />

      <div className="cy-shell space-y-12 pt-10">
        <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="cy-panel px-8 py-9">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--line-soft)] bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.22em] text-[var(--text-secondary)]">
              <Sparkles className="h-3.5 w-3.5 text-[var(--accent)]" />
              Editorial
            </div>
            <h1 className="mt-5 text-[3rem] font-semibold leading-[0.92] tracking-[-0.08em] text-[var(--text-primary)] sm:text-[4.8rem]">
              Notes on devices,
              <span className="block text-[var(--text-secondary)]">design, and shopping behavior.</span>
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--text-secondary)]">
              These posts are written to feel consistent with the store: clear, compact, and
              product-aware. Recent themes are influenced by broader industry movement around
              embedded AI, AI PCs, connected living, and more usable support experiences.
            </p>
            <div className="mt-8 inline-flex items-center gap-3 text-sm text-[var(--text-secondary)]">
              <CalendarDays className="h-4 w-4 text-[var(--accent)]" />
              Updated on March 11, 2026
            </div>
          </article>

          <article className="relative overflow-hidden rounded-[34px] border border-[var(--line-soft)] bg-[linear-gradient(180deg,#0b0f15,#090c12)] p-6 shadow-[0_26px_90px_rgba(0,0,0,0.28)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(143,185,255,0.16),transparent_24%),radial-gradient(circle_at_84%_78%,rgba(255,255,255,0.05),transparent_26%)]" />
            <img
              src={resolveAssetUrl(featured.image)}
              alt={featured.title}
              className="relative z-10 mx-auto h-[260px] object-contain"
            />
            <div className="relative z-10 mt-6 rounded-[28px] border border-white/10 bg-white/6 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-tertiary)]">{featured.category}</p>
              <h2 className="mt-3 text-[2rem] font-semibold leading-tight tracking-[-0.05em] text-[var(--text-primary)]">{featured.title}</h2>
              <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">{featured.excerpt}</p>
              <Link
                to={`/blog/${featured.slug}`}
                className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/35 hover:bg-white/8"
              >
                Read feature
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        </section>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {rest.map((post) => (
            <article
              key={post.title}
              className="group overflow-hidden rounded-[30px] border border-[var(--line-soft)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] shadow-[0_18px_60px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:border-[rgba(143,185,255,0.2)]"
            >
              <div className="relative overflow-hidden bg-[linear-gradient(180deg,#0f141c,#0b0f15)] p-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(143,185,255,0.1),transparent_30%)]" />
                <img
                  src={resolveAssetUrl(post.image)}
                  alt={post.title}
                  className="relative z-10 mx-auto h-[200px] object-contain transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="space-y-4 p-6">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-tertiary)]">{post.category}</p>
                  <p className="text-xs text-[var(--text-tertiary)]">{post.date}</p>
                </div>
                <h2 className="text-[1.55rem] font-semibold leading-tight tracking-[-0.04em] text-[var(--text-primary)]">{post.title}</h2>
                <p className="text-sm leading-7 text-[var(--text-secondary)]">{post.excerpt}</p>
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-3 rounded-full border border-[var(--line-soft)] px-5 py-3 text-sm font-semibold text-[var(--text-primary)] transition hover:border-[rgba(255,255,255,0.24)] hover:bg-white/[0.06]"
                >
                  Read more
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
