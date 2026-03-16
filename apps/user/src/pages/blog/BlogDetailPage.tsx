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
    <div className="bg-[#fafafa] pb-20">
      <Breadcrumb
        items={[
          { label: "Home", to: "/home" },
          { label: "Blog", to: "/blog" },
          { label: post.title },
        ]}
      />

      <div className="mx-auto max-w-[1200px] space-y-12 px-4 pt-10 sm:px-6 lg:px-8">
        <article className="overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-sm">
          <div className="grid gap-8 p-8 lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
            <div className="flex flex-col justify-center">
              <Link
                to="/blog"
                className="inline-flex w-fit items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">{post.category}</p>
              <h1 className="mt-4 text-[2.7rem] font-light leading-none tracking-[-0.06em] text-slate-950 sm:text-[3.8rem]">
                <span className="font-semibold">{post.title}</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">{post.excerpt}</p>
              <div className="mt-7 inline-flex items-center gap-3 text-sm text-slate-500">
                <CalendarDays className="h-4 w-4" />
                {post.date} · {post.readTime}
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#f8fafc,#eef2f7)] p-8">
              <img
                src={resolveAssetUrl(post.image)}
                alt={post.title}
                className="mx-auto h-[320px] object-contain"
              />
            </div>
          </div>
        </article>

        <section className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="rounded-[30px] bg-slate-950 p-8 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">Editorial note</p>
            <p className="mt-5 text-sm leading-7 text-white/70">
              These posts are not news reports. They are short editorial reads about how device
              trends affect product selection, storefront experience, and customer expectations.
            </p>
          </aside>

          <article className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="space-y-10">
              {post.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-[2rem] font-semibold tracking-[-0.05em] text-slate-950">{section.heading}</h2>
                  <div className="mt-4 space-y-4">
                    {section.body.map((paragraph) => (
                      <p key={paragraph} className="text-base leading-8 text-slate-600">
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
          <h2 className="text-[2rem] font-semibold tracking-[-0.04em] text-slate-950">More from the journal</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {relatedPosts.map((item) => (
              <article key={item.slug} className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
                <div className="bg-[linear-gradient(180deg,#f8fafc,#eef2f7)] p-6">
                  <img src={resolveAssetUrl(item.image)} alt={item.title} className="mx-auto h-[180px] object-contain" />
                </div>
                <div className="space-y-4 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">{item.category}</p>
                  <h3 className="text-xl font-semibold leading-tight tracking-[-0.04em] text-slate-950">{item.title}</h3>
                  <p className="text-sm leading-7 text-slate-600">{item.excerpt}</p>
                  <Link
                    to={`/blog/${item.slug}`}
                    className="inline-flex items-center gap-3 rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-900 hover:bg-slate-900 hover:text-white"
                  >
                    Read Article
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
