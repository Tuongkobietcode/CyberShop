import { ArrowRight, CalendarDays, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { resolveAssetUrl } from "@/utils/assets";
import { blogPosts } from "./data/posts";

export default function BlogPage() {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <div className="bg-[#fafafa] pb-20">
      <Breadcrumb items={[{ label: "Home", to: "/home" }, { label: "Blog" }]} />

      <div className="mx-auto max-w-[1200px] space-y-14 px-4 pt-10 sm:px-6 lg:px-8">
        <section className="grid gap-8 overflow-hidden rounded-[34px] bg-slate-950 p-8 text-white shadow-[0_24px_70px_rgba(15,23,42,0.18)] lg:grid-cols-[1.05fr_0.95fr] lg:p-10">
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/65">
              <Sparkles className="h-3.5 w-3.5" />
              Editorial
            </div>
            <h1 className="mt-5 text-[2.8rem] font-light leading-none tracking-[-0.06em] sm:text-[4rem]">
              Notes on devices,
              <span className="font-semibold"> design, and shopping behavior</span>
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/70">
              These posts are written to feel consistent with the store: clear, compact, and
              product-aware. Recent themes are influenced by broader industry movement around
              embedded AI, AI PCs, connected living, and more usable support experiences.
            </p>
            <div className="mt-8 inline-flex items-center gap-3 text-sm text-white/70">
              <CalendarDays className="h-4 w-4" />
              Updated on March 11, 2026
            </div>
          </div>

          <article className="rounded-[30px] border border-white/10 bg-white/6 p-6 backdrop-blur">
            <img
              src={resolveAssetUrl(featured.image)}
              alt={featured.title}
              className="mx-auto h-[260px] object-contain"
            />
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-white/50">{featured.category}</p>
            <h2 className="mt-3 text-[2rem] font-semibold leading-tight tracking-[-0.05em] text-white">{featured.title}</h2>
            <p className="mt-4 text-sm leading-7 text-white/70">{featured.excerpt}</p>
            <Link
              to={`/blog/${featured.slug}`}
              className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/35 hover:bg-white/8"
            >
              Read Feature
              <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        </section>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {rest.map((post) => (
            <article
              key={post.title}
              className="group overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.08)]"
            >
              <div className="relative overflow-hidden bg-[linear-gradient(180deg,#f8fafc,#eef2f7)] p-8">
                <img
                  src={resolveAssetUrl(post.image)}
                  alt={post.title}
                  className="mx-auto h-[200px] object-contain transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="space-y-4 p-6">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">{post.category}</p>
                  <p className="text-xs text-slate-400">{post.date}</p>
                </div>
                <h2 className="text-[1.55rem] font-semibold leading-tight tracking-[-0.04em] text-slate-950">{post.title}</h2>
                <p className="text-sm leading-7 text-slate-600">{post.excerpt}</p>
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-3 rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-900 hover:bg-slate-900 hover:text-white"
                >
                  Read More
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
