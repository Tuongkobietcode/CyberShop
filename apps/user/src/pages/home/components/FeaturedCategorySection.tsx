import { Link } from "react-router-dom";

type FeaturedItem = {
  title: string;
  subtitle?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  imageSrc: string; 
  imageAlt: string;
};

export default function FeaturedCategorySection() {
  return (
    <section className="w-full h-175 bg-white">
      <div className="w-full h-full max-w-8xl ">
        <div className="grid h-full grid-cols-2">
          {/* LEFT COLUMN */}
          <div className="grid">
            {/* PS5 */}
            <FeatureCard
              item={{
                title: "Playstation 5",
                description:
                  "Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience.",
                imageSrc: "/images/PlayStation.png",
                imageAlt: "Playstation 5",
              }}
              className="bg-white text-black min-h-100"
              imageClassName="left-0 top-0 h-full w-[45%] object-cover"
              contentClassName="ml-auto max-w-[58%] flex flex-col justify-center text-center"
            />

            {/* SMALL CARDS */}
            <div className="grid grid-cols-2">
              <FeatureCard
                item={{
                  title: "Apple AirPods Max",
                  description: "Computational audio. Listen, it’s powerful.",
                  imageSrc: "/images/Wireless.png",
                  imageAlt: "AirPods Max",
                }}
                className="bg-neutral-100 min-h-85"
                imageClassName="left-0 top-1/2 h-full w-[20%] -translate-y-1/2 object-contain"
                contentClassName="ml-auto max-w-[52%] text-right"
              />

              <FeatureCard
                item={{
                  title: "Apple Vision Pro",
                  description: "An immersive way to experience entertainment.",
                  imageSrc: "/images/VisionPro.png",
                  imageAlt: "Vision Pro",
                }}
                className="bg-black text-white min-h-85"
                imageClassName="left-0 top-1/2 h-full w-[40%] -translate-y-1/2 object-contain"
                contentClassName="ml-auto max-w-[52%] text-right"
              />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <FeatureCard
            item={{
              title: "Macbook Air",
              description:
                "The new 15-inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display.",
              ctaLabel: "Shop Now",
              ctaHref: "/products",
              imageSrc: "/images/MacBookAir.png",
              imageAlt: "Macbook Air",
            }}
            className="bg-neutral-100 min-h-100"
            imageClassName="right-0 top-1/2 h-[90%] w-[35%] -translate-y-1/2 object-contain"
            contentClassName="max-w-[52%]"
            showCta
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  item,
  className = "",
  imageClassName = "",
  contentClassName = "",
  showCta = false,
}: {
  item: FeaturedItem;
  className?: string;
  imageClassName?: string;
  contentClassName?: string;
  showCta?: boolean;
}) {
  return (
    <div
      className={[
        "relative overflow-hidden sm:p-8",
        className,
      ].join(" ")}
    >
      {/* Image */}
      <img
        src={item.imageSrc}
        alt={item.imageAlt}
        className={[
          "pointer-events-none absolute select-none",
          imageClassName,
        ].join(" ")}
        loading="lazy"
      />

      {/* Content */}
      <div className={["relative", contentClassName].join(" ")}>
        <h3 className="text-9xl font-semibold leading-tight sm:text-3xl">
          {item.title === "Macbook Air" ? (
            <>
              <span className="font-light">Macbook</span>{" "}
              <span className="font-semibold">Air</span>
            </>
          ) : (
            item.title
          )}
        </h3>

        {item.description && (
          <p className="mt-2 text-base leading-relaxed text-neutral-600">
            {item.description}
          </p>
        )}

        {showCta && item.ctaLabel && item.ctaHref && (
          <div className="mt-5">
            <Link
              to={item.ctaHref}
              className="inline-flex items-center justify-center rounded-md border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50 active:scale-[0.99]"
            >
              {item.ctaLabel}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
