// 

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;
type FeaturedItem = {
  title: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  imageSrc: string;
  imageAlt: string;
};

function cx(...cls: Array<string | undefined | false>) {
  return cls.filter(Boolean).join(" ");
}

function renderTitle(title: string) {
  if (title === "Macbook Air") {
    return (
      <>
        <span className="font-light">Macbook</span>{" "}
        <span className="font-semibold">Air</span>
      </>
    );
  }
  if (title === "Apple AirPods Max") {
    return (
      <>
        <span className="font-light">Apple AirPods</span>{" "}
        <span className="font-semibold">Max</span>
      </>
    );
  }
  if (title === "Apple Vision Pro") {
    return (
      <>
        <span className="font-light">Apple Vision</span>{" "}
        <span className="font-semibold">Pro</span>
      </>
    );
  }
  return title;
}

/** Motion variants */
const sectionV = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const cardV = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: EASE },
  },
};

const imgV = {
  hidden: { opacity: 0, scale: 0.98, x: 0 },
  show: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

export default function FeaturedCategorySection() {
  return (
    <section className="w-full bg-white">
      <motion.div
        className="mx-auto w-full max-w-[1400px] px-4 py-8 lg:px-6"
        variants={sectionV}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {/* LEFT COLUMN */}
          <div className="grid gap-4">
            {/* PS5 */}
            <FeatureCard
              motionProps={{ variants: cardV }}
              item={{
                title: "PlayStation 5",
                description:
                  "Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience.",
                imageSrc: "/images/PlayStation.png",
                imageAlt: "Playstation 5",
              }}
              variant="light"
              size="lg"
              imageSide="left"
              imageBoxClassName="pl-4"
              imageClassName="w-[92%] h-[92%] object-contain object-left drop-shadow-sm"
              parallaxDir="left"
            />

            {/* SMALL CARDS */}
            <div className="grid gap-4 sm:grid-cols-2">
              <FeatureCard
                motionProps={{ variants: cardV }}
                item={{
                  title: "Apple AirPods Max",
                  description: "Computational audio. Listen, it’s powerful.",
                  imageSrc: "/images/Wireless.png",
                  imageAlt: "AirPods Max",
                }}
                variant="soft"
                size="sm"
                imageSide="left"
                imageBoxClassName="pl-3"
                imageClassName="w-[88%] h-[88%] object-contain object-left"
                parallaxDir="left"
              />

              <FeatureCard
                motionProps={{ variants: cardV }}
                item={{
                  title: "Apple Vision Pro",
                  description: "An immersive way to experience entertainment.",
                  imageSrc: "/images/VisionPro.png",
                  imageAlt: "Vision Pro",
                }}
                variant="dark"
                size="sm"
                imageSide="left"
                imageBoxClassName="pl-3"
                imageClassName="w-[88%] h-[88%] object-contain object-left"
                parallaxDir="left"
              />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <FeatureCard
            motionProps={{ variants: cardV }}
            item={{
              title: "Macbook Air",
              description:
                "The new 15-inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display.",
              ctaLabel: "Shop Now",
              ctaHref: "/products",
              imageSrc: "/images/MacBookAir.png",
              imageAlt: "Macbook Air",
            }}
            variant="soft"
            size="xl"
            imageSide="right"
            showCta
            imageBoxClassName="pr-2"
            imageClassName="w-[96%] h-[96%] object-contain object-right drop-shadow-sm"
            parallaxDir="right"
          />
        </div>
      </motion.div>
    </section>
  );
}

function FeatureCard({
  item,
  className,
  showCta = false,
  variant = "light",
  size = "lg",
  imageSide = "left",
  imageClassName,
  imageBoxClassName,
  // motion
  motionProps,
  parallaxDir = "left",
}: {
  item: FeaturedItem;
  className?: string;
  showCta?: boolean;

  variant?: "light" | "soft" | "dark";
  size?: "sm" | "lg" | "xl";
  imageSide?: "left" | "right";

  imageClassName?: string;
  imageBoxClassName?: string;

  motionProps?: React.ComponentProps<typeof motion.div>;
  parallaxDir?: "left" | "right";
}) {
  const showButton = showCta && item.ctaLabel && item.ctaHref;

  const variantCls =
    variant === "dark"
      ? "bg-neutral-900 text-white"
      : variant === "soft"
      ? "bg-neutral-100 text-neutral-900"
      : "bg-white text-neutral-900";

  const sizeCls =
    size === "sm"
      ? "h-[260px] p-6"
      : size === "xl"
      ? "h-[560px] p-10"
      : "h-[520px] p-10";

  const layoutCls =
    imageSide === "left"
      ? "grid-cols-[48%_52%]"
      : "grid-cols-[52%_48%]";

  const descColor = variant === "dark" ? "text-neutral-200/80" : "text-neutral-600";

  const parallaxX = parallaxDir === "left" ? -10 : 10;

  return (
    <motion.div
      {...motionProps}
      className={cx(
        "group relative overflow-hidden rounded-sm",
        "transition-transform duration-300 hover:-translate-y-0.5",
        variantCls,
        sizeCls,
        className
      )}
      whileHover={{ scale: 1.005 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
    >
      <div className={cx("grid h-full w-full", layoutCls)}>
        {/* IMAGE */}
        <div
          className={cx(
            "relative flex h-full items-center justify-center",
            imageSide === "right" && "order-2",
            imageBoxClassName
          )}
        >
          <motion.img
            src={item.imageSrc}
            alt={item.imageAlt}
            loading="lazy"
            variants={imgV}
            className={cx(
              "pointer-events-none select-none",
              imageClassName || "h-[90%] w-[90%] object-contain"
            )}
            // parallax nhẹ khi hover + “settle” khi bỏ hover
            whileHover={{ x: parallaxX, scale: 1.03 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        {/* CONTENT */}
        <div
          className={cx(
            "relative flex h-full flex-col justify-center",
            "px-6 sm:px-8",
            imageSide === "right" && "order-1"
          )}
        >
          <motion.h3
            className={cx(
              "text-left leading-tight tracking-tight font-semibold",
              size === "sm" ? "text-3xl" : size === "xl" ? "text-6xl" : "text-5xl"
            )}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {renderTitle(item.title)}
          </motion.h3>

          {item.description && (
            <motion.p
              className={cx(
                "mt-4 max-w-[36ch] text-left text-sm sm:text-base leading-relaxed",
                descColor
              )}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              {item.description}
            </motion.p>
          )}

          {showButton && (
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to={item.ctaHref!}
                className={cx(
                  "inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-semibold",
                  "border border-black/60 bg-white text-neutral-900",
                  "transition hover:bg-neutral-50 active:scale-[0.99]"
                )}
              >
                {item.ctaLabel}
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
