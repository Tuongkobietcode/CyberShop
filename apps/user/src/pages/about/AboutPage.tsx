import { ArrowRight, Cpu, Layers3, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { resolveAssetUrl } from "@/utils/assets";

const principles = [
  {
    icon: Sparkles,
    title: "Curated, not crowded",
    copy:
      "We focus on fewer devices with stronger stories, cleaner presentation, and a storefront that feels considered instead of noisy.",
  },
  {
    icon: Cpu,
    title: "Hardware with context",
    copy:
      "Specs matter, but so does clarity. We present performance, design, and use cases together so products make sense faster.",
  },
  {
    icon: ShieldCheck,
    title: "Trust in every detail",
    copy:
      "From checkout steps to support channels, the experience is designed to feel direct, reliable, and easy to navigate.",
  },
];

const milestones = [
  { year: "2023", title: "Cyber starts as a compact catalog concept", copy: "A minimal storefront built around flagship phones, audio, and personal devices." },
  { year: "2024", title: "The catalog expands into a full device mix", copy: "Laptops, cameras, gaming, and wearables were added with a stronger editorial layer." },
  { year: "2025", title: "The experience becomes more connected", copy: "Category discovery, detail pages, and checkout were rebuilt to feel more premium and more fluid." },
];

const stats = [
  { label: "Curated categories", value: "6" },
  { label: "Launch-ready products", value: "9+" },
  { label: "Checkout steps", value: "3" },
  { label: "Design principle", value: "Clarity first" },
];

export default function AboutPage() {
  return (
    <div className="bg-[#fafafa] pb-20">
      <Breadcrumb items={[{ label: "Home", to: "/home" }, { label: "About" }]} />

      <div className="mx-auto max-w-[1200px] space-y-14 px-4 pt-10 sm:px-6 lg:px-8">
        <section className="grid gap-8 overflow-hidden rounded-[34px] bg-[linear-gradient(135deg,#ffffff,#f2f4f7)] p-8 shadow-[0_24px_70px_rgba(15,23,42,0.06)] lg:grid-cols-[1.05fr_0.95fr] lg:p-12">
          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">About Cyber</p>
            <h1 className="mt-4 text-[2.8rem] font-light leading-none tracking-[-0.06em] text-slate-950 sm:text-[4rem]">
              A calmer way to shop for{" "}
              <span className="font-semibold">modern devices</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
              Cyber is a concept storefront for premium everyday technology. The goal is simple:
              present hardware in a cleaner, more intentional way so people can move from discovery
              to decision without fighting the interface.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-3 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Explore Catalog
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-900 hover:bg-slate-900 hover:text-white"
              >
                Talk to Us
              </Link>
            </div>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-[28px] bg-[#101114]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.28),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(56,189,248,0.18),transparent_26%)]" />
            <img
              src={resolveAssetUrl("/assets/images/macbook-air-main.png")}
              alt="MacBook Air"
              className="absolute right-[-2%] top-[10%] w-[58%] max-w-[330px] object-contain drop-shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
            />
            <img
              src={resolveAssetUrl("/assets/images/iphone-14-front.png")}
              alt="iPhone"
              className="absolute left-[6%] bottom-[-2%] w-[34%] max-w-[220px] rotate-[-8deg] object-contain drop-shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
            />
            <div className="absolute left-6 top-6 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/70 backdrop-blur">
              Device editorial
            </div>
            <div className="absolute bottom-6 left-6 right-6 rounded-[24px] border border-white/10 bg-white/6 p-5 backdrop-blur">
              <p className="text-sm font-medium text-white">The interface should frame the product, not compete with it.</p>
              <p className="mt-2 text-sm leading-6 text-white/60">
                Spacious layouts, focused hierarchy, and just enough motion to feel alive.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <article key={item.label} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">{item.label}</p>
              <p className="mt-3 text-[2.4rem] font-semibold tracking-[-0.05em] text-slate-950">{item.value}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-5 lg:grid-cols-3">
          {principles.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="group rounded-[30px] border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.08)]"
              >
                <div className="inline-flex rounded-2xl bg-slate-950 p-3 text-white transition group-hover:scale-105">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-6 text-2xl font-semibold tracking-[-0.04em] text-slate-950">{item.title}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">{item.copy}</p>
              </article>
            );
          })}
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[30px] bg-slate-950 p-8 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/50">Why it feels different</p>
            <h2 className="mt-4 text-[2.4rem] font-light leading-none tracking-[-0.05em]">
              The product remains the hero.
            </h2>
            <p className="mt-5 text-sm leading-7 text-white/70">
              The visual language stays disciplined: soft neutrals, deep black anchors, large
              radii, deliberate whitespace, and short interaction loops. It is closer to an
              editorial retail experience than a marketplace dashboard.
            </p>
            <div className="mt-8 grid gap-4">
              {["Clean browsing hierarchy", "Focused product pages", "Fast support paths"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
                  <Layers3 className="h-4 w-4 text-white/60" />
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Milestones</p>
            <div className="mt-6 space-y-6">
              {milestones.map((item) => (
                <div key={item.year} className="grid gap-3 border-b border-slate-100 pb-6 last:border-b-0 last:pb-0 md:grid-cols-[92px_1fr]">
                  <p className="text-lg font-semibold tracking-[-0.03em] text-slate-950">{item.year}</p>
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.03em] text-slate-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{item.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}
