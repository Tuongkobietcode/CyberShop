import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { resolveAssetUrl } from "@/utils/assets";

const setupSteps = [
  {
    id: "01",
    title: "Flagship phone core",
    copy:
      "Start with a hero device that carries the visual weight of the setup and anchors the entire collection.",
    to: "/products?category=iphone",
  },
  {
    id: "02",
    title: "Wearables and audio",
    copy:
      "Layer in watch and audio products as supporting pieces so the homepage feels like a kit, not a catalog dump.",
    to: "/products?category=airpods",
  },
  {
    id: "03",
    title: "Portable performance",
    copy:
      "Close with a Mac surface to give the composition depth and make the archive feel complete.",
    to: "/products?category=mac",
  },
];

const backOutEase = [0.34, 1.56, 0.64, 1] as const;

const leftVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: backOutEase },
  },
};

const rightContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 1,
      staggerChildren: 0.5,
    },
  },
};

const rightItemVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: backOutEase },
  },
};

export default function BrowseCategorySection() {
  return (
    <motion.section
      className="relative py-14 sm:py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_52%,rgba(143,185,255,0.1),transparent_20%),radial-gradient(circle_at_68%_34%,rgba(255,255,255,0.04),transparent_18%)]" />
      <div className="mx-auto max-w-[1600px] px-3 sm:px-4 lg:px-8 2xl:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_minmax(620px,0.96fr)] lg:items-center lg:justify-between">
          <motion.div className="relative min-h-[420px] sm:min-h-[520px]" variants={leftVariants}>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_38%,rgba(143,185,255,0.1),transparent_28%),linear-gradient(90deg,rgba(4,7,11,0.92)_0%,rgba(4,7,11,0.72)_34%,rgba(4,7,11,0.18)_72%,rgba(4,7,11,0)_100%)]" />
            <div className="absolute bottom-0 left-0 z-20 max-w-[340px] sm:max-w-[430px]">
              <p className="cy-kicker">The architecture of a setup</p>
              <h2 className="mt-4 text-[2.6rem] font-semibold leading-[0.94] tracking-[-0.07em] text-white sm:text-[3.8rem]">
                Build around
                <span className="block font-light text-white/74">
                  one strong object.
                </span>
              </h2>
              <p className="mt-5 max-w-[34ch] text-[15px] leading-7 text-white/58 sm:text-base">
                Premium electronics do not need louder layouts. They need a
                clearer hierarchy, stronger staging, and room for materials to
                read correctly against the dark.
              </p>
            </div>

            <img
              src={resolveAssetUrl("/assets/images/product-group.png")}
              alt="Product group composition"
              className="pointer-events-none absolute left-[6%] top-[-50%] z-0 w-[1000px] object-contain opacity-[0.42] blur-[1.8px] drop-shadow-[0_40px_110px_rgba(0,0,0,0.42)] saturate-[0.96] "
            />
          </motion.div>

          <motion.div
            className="relative ml-auto grid w-full max-w-[400px] gap-6 xl:max-w-[400px]"
            variants={rightContainerVariants}
          >
            {setupSteps.map((item) => (
              <motion.div
                key={item.id}
                variants={rightItemVariants}
                className={[
                  "grid gap-5 px-2 py-2 transition-transform sm:grid-cols-[58px_minmax(0,1fr)] sm:px-6 sm:py-7",
                  item.id === "01" || item.id === "03"
                    ? "lg:-translate-x-[50px]"
                    : "",
                ].join(" ")}
              >
                <div className="relative">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[11px] font-semibold uppercase tracking-[0.18em] text-white/52">
                    {item.id}
                  </span>
                </div>

                <div>
                  <h3 className="text-[1.4rem] font-semibold tracking-[-0.04em] text-white sm:text-[1.7rem]">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-[36ch] text-[15px] leading-7 text-white/56">
                    {item.copy}
                  </p>
                  <Link
                    to={item.to}
                    className="mt-5 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/54 transition hover:text-white"
                  >
                    Open category
                    <span className="h-px w-7 bg-current" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
