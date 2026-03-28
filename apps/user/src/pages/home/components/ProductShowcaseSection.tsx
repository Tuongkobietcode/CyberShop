import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { resolveAssetUrl } from "@/utils/assets";

const clarityQuotes = [
  {
    quote:
      "The storefront finally feels curated. Products read like hero objects instead of template cards.",
    name: "Minh Anh",
    role: "Customer / Mobile buyer",
  },
  {
    quote:
      "Checkout feels calmer and more premium now. The whole flow looks expensive without becoming loud.",
    name: "Bao Chau",
    role: "Customer / Audio category",
  },
  {
    quote:
      "The hierarchy is cleaner. You can scan phones, wearables, and laptops without losing visual focus.",
    name: "Quoc Viet",
    role: "Customer / Flagship shopper",
  },
  {
    quote:
      "The dark surfaces make the product imagery do the work. That is exactly what premium hardware needs.",
    name: "Admin review",
    role: "Internal storefront check",
  },
];

const backOutEase = [0.34, 1.56, 0.64, 1] as const;

const archiveRowLeftVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const archiveRowRightVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
};

const archiveCardFromLeftVariants = {
  hidden: {
    opacity: 0,
    x: -100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: backOutEase,
    },
  },
};

const archiveCardFromRightVariants = {
  hidden: {
    opacity: 0,
    x: 100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: backOutEase,
    },
  },
};

const archiveCards = [
  {
    title: "iPhone 17 Pro",
    copy: "All-out Pro performance with the strongest camera and finish in the lineup.",
    image: "/assets/images/iphone-17-pro.png",
    to: "/products?category=iphone",
    imageClassName:
      "mx-auto h-[296px] w-full max-w-[302px] object-contain transition duration-500 group-hover:scale-[1.04] sm:h-[324px] sm:max-w-[332px]",
  },
  {
    title: "iPhone 17",
    copy: "The everyday flagship surface, tuned for lighter use and a cleaner silhouette.",
    image: "/assets/images/iphone-17.png",
    to: "/products?category=iphone",
    imageClassName:
      "mx-auto h-[290px] w-full max-w-[294px] object-contain transition duration-500 group-hover:scale-[1.04] sm:h-[318px] sm:max-w-[324px]",
  },
  {
    title: "iPhone 17e",
    copy: "Value-packed iPhone hardware staged with the same visual priority as the top tier.",
    image: "/assets/images/iphone-17e.png",
    to: "/products?category=iphone",
    imageClassName:
      "mx-auto h-[284px] w-full max-w-[288px] object-contain transition duration-500 group-hover:scale-[1.04] sm:h-[310px] sm:max-w-[318px]",
  },
  {
    title: "iPhone 16",
    copy: "A calmer mainstream iPhone pick for people who want the latest shape without the Pro weight.",
    image: "/assets/images/iphone-16.png",
    to: "/products?category=iphone",
    imageClassName:
      "mx-auto h-[284px] w-full max-w-[288px] object-contain transition duration-500 group-hover:scale-[1.04] sm:h-[310px] sm:max-w-[318px]",
  },
  {
    title: "AirPods Max",
    copy: "Over-ear audio hardware with the strongest studio presence in the archive.",
    image: "/assets/images/airpods-max.png",
    to: "/products?category=airpods",
    imageClassName:
      "mx-auto h-[210px] w-full max-w-[250px] object-contain transition duration-500 group-hover:scale-[1.04] sm:h-[225px] sm:max-w-[270px]",
  },
  {
    title: "AirPods Pro 3",
    copy: "Compact in-ear audio that still reads like a hero object on a dark field.",
    image: "/assets/images/airpods-pro-3.png",
    to: "/products?category=airpods",
    imageClassName:
      "mx-auto h-[200px] w-full max-w-[220px] object-contain transition duration-500 group-hover:scale-[1.04] sm:h-[215px] sm:max-w-[235px]",
  },
  {
    title: "AirPods 4",
    copy: "The everyday audio option, staged with less clutter and more product focus.",
    image: "/assets/images/airpods-4.png",
    to: "/products?category=airpods",
    imageClassName:
      "mx-auto h-[190px] w-full max-w-[210px] object-contain transition duration-500 group-hover:scale-[1.04] sm:h-[205px] sm:max-w-[225px]",
  },
  {
    title: "Apple Watch Ultra 3",
    copy: "The bold watch choice, treated like a rugged precision instrument rather than an accessory.",
    image: "/assets/images/apple-watch-ultra-3.png",
    to: "/products?category=apple-watch",
    imageClassName:
      "mx-auto h-[220px] w-full max-w-[252px] object-contain transition duration-500 group-hover:scale-[1.04] sm:h-[234px] sm:max-w-[266px]",
  },
  {
    title: "Apple Watch Series 11",
    copy: "A more refined watch surface for everyday wear, tracking, and smaller gestures.",
    image: "/assets/images/apple-watch-series-11.png",
    to: "/products?category=apple-watch",
    imageClassName:
      "mx-auto h-[216px] w-full max-w-[248px] object-contain transition duration-500 group-hover:scale-[1.04] sm:h-[230px] sm:max-w-[260px]",
  },
  {
    title: "Apple Watch SE",
    copy: "The lighter watch option, framed as a clean entry point into the category.",
    image: "/assets/images/apple-watch-se.png",
    to: "/products?category=apple-watch",
    imageClassName:
      "mx-auto h-[212px] w-full max-w-[240px] object-contain transition duration-500 group-hover:scale-[1.04] sm:h-[226px] sm:max-w-[252px]",
  },
  {
    title: "MacBook Pro 14",
    copy: "Portable pro power, presented like a compact work surface instead of a laptop listing.",
    image: "/assets/images/macbook-pro-14-inch.png",
    to: "/products?category=mac",
    imageClassName:
      "mx-auto h-[198px] w-full max-w-[318px] object-contain transition duration-500 group-hover:scale-[1.04] sm:h-[214px] sm:max-w-[346px]",
  },
  {
    title: "MacBook Pro 16",
    copy: "The larger pro machine, staged for heavier sessions and deeper desk setups.",
    image: "/assets/images/macbook-pro-16-inch.png",
    to: "/products?category=mac",
    imageClassName:
      "mx-auto h-[200px] w-full max-w-[330px] object-contain transition duration-500 group-hover:scale-[1.04] sm:h-[216px] sm:max-w-[360px]",
  },
  {
    title: "MacBook Air 13",
    copy: "The everyday Mac notebook, kept light, fast, and visually clean.",
    image: "/assets/images/macbook-air-13-inch.png",
    to: "/products?category=mac",
    imageClassName:
      "mx-auto h-[194px] w-full max-w-[316px] object-contain transition duration-500 group-hover:scale-[1.04] sm:h-[210px] sm:max-w-[344px]",
  },
  {
    title: "MacBook Air 15",
    copy: "A larger Air surface for people who want room without moving into the Pro family.",
    image: "/assets/images/macbook-air-15-inch.png",
    to: "/products?category=mac",
    imageClassName:
      "mx-auto h-[196px] w-full max-w-[326px] object-contain transition duration-500 group-hover:scale-[1.04] sm:h-[212px] sm:max-w-[356px]",
  },
  {
    title: "iPad Pro 13",
    copy: "The most expansive iPad canvas, framed for studio notes and creative work.",
    image: "/assets/images/ipad-pro-13-inch.png",
    to: "/products?category=ipad",
    imageClassName:
      "mx-auto h-[278px] w-full max-w-[372px] object-contain transition duration-500 group-hover:scale-[1.04] sm:h-[304px] sm:max-w-[408px]",
  },
  {
    title: "iPad mini",
    copy: "Small-format tablet hardware that still deserves a premium presentation.",
    image: "/assets/images/ipad-mini.png",
    to: "/products?category=ipad",
    imageClassName:
      "mx-auto h-[268px] w-full max-w-[336px] object-contain transition duration-500 group-hover:scale-[1.04] sm:h-[292px] sm:max-w-[362px]",
  },
];

function ArchiveCard({
  title,
  copy,
  image,
  to,
  imageClassName,
}: {
  title: string;
  copy: string;
  image: string;
  to: string;
  imageClassName: string;
}) {
  return (
    <Link
      to={to}
      className="group relative flex h-[438px] flex-col overflow-hidden rounded-[28px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(16,20,28,0.96),rgba(9,12,18,0.94))] p-5 shadow-[0_20px_58px_rgba(2,6,16,0.32),inset_0_1px_0_rgba(255,255,255,0.04)] transition duration-500 hover:-translate-y-[3px] hover:border-white/[0.14] hover:shadow-[0_28px_72px_rgba(2,6,16,0.42),inset_0_1px_0_rgba(255,255,255,0.06)] sm:h-[468px] sm:p-6"
    >
      <div className="relative flex h-full flex-1 flex-col">
        <div className="flex min-h-[102px] flex-col px-1 sm:min-h-[112px]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8fb9ff]">
            New
          </p>
          <h3 className="mt-4 max-w-[11.5ch] text-[1.34rem] font-semibold leading-[1.02] tracking-[-0.05em] text-white sm:text-[1.52rem]">
            {title}
          </h3>
          <p className="mt-3 max-w-[29ch] text-[14px] leading-6 text-white/64 line-clamp-3">
            {copy}
          </p>
        </div>

        <div className="mt-auto flex h-[286px] items-end justify-center overflow-hidden px-2 pt-0 sm:h-[320px] sm:pt-0">
          <img
            src={resolveAssetUrl(image)}
            alt={title}
            className={`${imageClassName} !w-auto drop-shadow-[0_20px_34px_rgba(0,0,0,0.22)]`}
          />
        </div>
      </div>
    </Link>
  );
}

function TestimonialCard({
  quote,
  name,
  role,
}: {
  quote: string;
  name: string;
  role: string;
}) {
  return (
    <article className="rounded-[28px] p-5">
      <div className="flex gap-1 text-[11px] tracking-[0.18em] text-white/36">
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index}>*</span>
        ))}
      </div>
      <p className="mt-4 text-sm leading-7 text-white/76">{quote}</p>
      <div className="mt-6">
        <p className="text-sm font-medium text-white">{name}</p>
        <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/34">
          {role}
        </p>
      </div>
    </article>
  );
}

export default function ProductShowcaseSection() {
  const rows = [
    archiveCards.slice(0, 4),
    archiveCards.slice(4, 8),
    archiveCards.slice(8, 12),
  ].filter((row) => row.length > 0);

  return (
    <>
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-[1600px] px-3 sm:px-4 lg:px-8 2xl:px-10">
          <motion.div
            className="mb-10 max-w-[720px]"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: backOutEase }}
          >
            <p className="cy-kicker">The archive</p>
            <h2 className="mt-3 max-w-[16ch] text-[2.15rem] font-semibold leading-[0.96] tracking-[-0.06em] text-white sm:text-[2.7rem]">
              Explore the catalog
              <br />
              as a set of product worlds, not just a list of items.
            </h2>
          </motion.div>

          <div className="space-y-5">
            {rows.map((row, rowIndex) => {
              const rowFromLeft = rowIndex % 2 === 0;
              return (
                <motion.div
                  key={`archive-row-${rowIndex}`}
                  variants={rowFromLeft ? archiveRowLeftVariants : archiveRowRightVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className="grid gap-5 md:grid-cols-2 xl:grid-cols-4"
                >
                  {row.map((card) => (
                    <motion.div
                      key={card.title}
                      variants={rowFromLeft ? archiveCardFromLeftVariants : archiveCardFromRightVariants}
                    >
                      <ArchiveCard {...card} />
                    </motion.div>
                  ))}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="cy-shell">
          <div className="px-2 py-6 sm:px-4 lg:px-8 lg:py-10">
            <div className="text-center">
              <p className="text-[2.2rem] italic tracking-[-0.05em] text-white/92 sm:text-[3rem]">
                Clarity.
              </p>
            </div>

            <div className="mx-auto mt-12 grid max-w-[1100px] gap-5 md:grid-cols-2 xl:grid-cols-[0.9fr_1.05fr_0.9fr]">
              <div className="md:translate-y-6">
                <TestimonialCard {...clarityQuotes[0]} />
              </div>
              <div className="space-y-5">
                <TestimonialCard {...clarityQuotes[1]} />
                <TestimonialCard {...clarityQuotes[2]} />
              </div>
              <div className="md:translate-y-10">
                <TestimonialCard {...clarityQuotes[3]} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12 pt-4 sm:pb-16">
        <div className="cy-shell">
          <div className="relative overflow-hidden rounded-[42px] border border-white/8 bg-[linear-gradient(180deg,rgba(9,12,17,0.98),rgba(7,9,13,0.95))] px-6 py-14 text-center shadow-[0_32px_110px_rgba(0,0,0,0.32)] sm:px-8 lg:px-12 lg:py-20">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_24%),radial-gradient(circle_at_bottom,rgba(143,185,255,0.12),transparent_30%)]" />
            <img
              src={resolveAssetUrl("/assets/images/apple-vision-pro.png")}
              alt="Apple Vision Pro background composition"
              className="pointer-events-none absolute bottom-[-16%] left-[-3%] hidden w-[260px] rotate-[-12deg] object-contain opacity-[0.18] blur-[0.4px] md:block lg:w-[320px]"
            />
            <img
              src={resolveAssetUrl("/assets/images/airpods-max.png")}
              alt="AirPods Max background composition"
              className="pointer-events-none absolute bottom-[-10%] right-[-2%] hidden w-[260px] rotate-[12deg] object-contain opacity-[0.18] blur-[0.4px] md:block lg:w-[320px]"
            />

            <div className="relative mx-auto max-w-[760px]">
              <p className="cy-kicker">Join the drop list</p>
              <h2 className="mx-auto mt-4 max-w-[11ch] text-[2.5rem] font-semibold leading-[0.96] tracking-[-0.07em] text-white sm:text-[3.8rem]">
                Never a generic storefront.
              </h2>
              <p className="mx-auto mt-5 max-w-[40ch] text-[15px] leading-7 text-white/58 sm:text-base">
                Browse launch alerts, restock notes, and the cleaner side of
                premium electronics retail without the usual visual noise.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link to="/sign-up" className="cy-btn-primary">
                  Join the archive
                </Link>
                <Link to="/products" className="cy-btn-secondary">
                  Browse catalog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
