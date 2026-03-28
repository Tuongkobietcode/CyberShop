import { ArrowLeft, CalendarDays } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { resolveAssetUrl } from "@/utils/assets";
import { blogPosts, getBlogPostBySlug } from "./data/posts";

export default function BlogDetailPage() {
  const { slug = "" } = useParams();
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <div className="pb-24">
      <Breadcrumb
        items={[
          { label: "Home", to: "/home" },
          { label: "Blog", to: "/blog" },
          { label: post.title },
        ]}
      />

      <div className="cy-shell space-y-12 pt-10">
        <article className="overflow-hidden rounded-[36px] border border-[var(--line-soft)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
          <div className="grid gap-8 p-8 lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
            <div className="flex flex-col justify-center">
              <Link
                to="/blog"
                className="inline-flex w-fit items-center gap-2 text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to blog
              </Link>
              <p className="mt-6 text-xs uppercase tracking-[0.22em] text-[var(--text-tertiary)]">{post.category}</p>
              <h1 className="mt-4 text-[2.8rem] font-semibold leading-[0.94] tracking-[-0.07em] text-[var(--text-primary)] sm:text-[4.2rem]">
                {post.title}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-[var(--text-secondary)]">{post.excerpt}</p>
              <div className="mt-7 inline-flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                <CalendarDays className="h-4 w-4 text-[var(--accent)]" />
                {post.date} · {post.readTime}
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[30px] bg-[linear-gradient(180deg,#0f141c,#0b0f15)] p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(143,185,255,0.12),transparent_30%)]" />
              <img src={resolveAssetUrl(post.image)} alt={post.title} className="relative z-10 mx-auto h-[320px] object-contain" />
            </div>
          </div>
        </article>

        <section className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="rounded-[30px] border border-[var(--line-soft)] bg-[linear-gradient(180deg,#0d1118,#080b10)] p-8 text-[var(--text-primary)]">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-tertiary)]">Editorial note</p>
            <p className="mt-5 text-sm leading-7 text-[var(--text-secondary)]">
              These posts are not news reports. They are short editorial reads about how device
              trends affect product selection, storefront experience, and customer expectations.
            </p>
          </aside>

          <article className="cy-panel p-8">
            <div className="space-y-10">
              {post.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-[2rem] font-semibold tracking-[-0.05em] text-[var(--text-primary)]">{section.heading}</h2>
                  <div className="mt-4 space-y-4">
                    {section.body.map((paragraph) => (
                      <p key={paragraph} className="text-base leading-8 text-[var(--text-secondary)]">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </article>
        </section>

        <section className="space-y-6">
          <h2 className="text-[2rem] font-semibold tracking-[-0.04em] text-[var(--text-primary)]">More from the journal</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {relatedPosts.map((item) => (
              <article
                key={item.slug}
                className="overflow-hidden rounded-[28px] border border-[var(--line-soft)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] shadow-[0_18px_60px_rgba(0,0,0,0.16)]"
              >
                <div className="bg-[linear-gradient(180deg,#0f141c,#0b0f15)] p-6">
                  <img src={resolveAssetUrl(item.image)} alt={item.title} className="mx-auto h-[180px] object-contain" />
                </div>
                <div className="space-y-4 p-6">
                  <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-tertiary)]">{item.category}</p>
                  <h3 className="text-xl font-semibold leading-tight tracking-[-0.04em] text-[var(--text-primary)]">{item.title}</h3>
                  <p className="text-sm leading-7 text-[var(--text-secondary)]">{item.excerpt}</p>
                  <Link
                    to={`/blog/${item.slug}`}
                    className="inline-flex items-center gap-3 rounded-full border border-[var(--line-soft)] px-5 py-3 text-sm font-semibold text-[var(--text-primary)] transition hover:border-[rgba(255,255,255,0.24)] hover:bg-white/[0.06]"
                  >
                    Read article
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
