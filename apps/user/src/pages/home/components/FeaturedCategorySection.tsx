import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { resolveAssetUrl } from "@/utils/assets";
import { formatCurrencyVnd } from "@/utils/format";

type CarouselItem = {
  title: string;
  subtitle: string;
  price?: number;
  copy?: string;
  image: string;
  to: string;
  imageClassName: string;
  imageWrapClassName?: string;
};

const curatedItems: CarouselItem[] = [
  {
    title: "Liquid Silver",
    subtitle: "iPhone 17 Pro Max",
    copy: "The sharpest flagship surface in the opening edit, tuned for camera-first attention.",
    price: 38990000,
    image: "/assets/images/iphone-17-promax.png",
    to: "/products/iphone-17-pro-max",
    imageClassName:
      "mx-auto h-[220px] w-full max-w-[220px] object-contain sm:h-[250px] sm:max-w-[240px]",
    imageWrapClassName: "min-h-[240px] sm:min-h-[270px]",
  },
  {
    title: "Studio audio",
    subtitle: "AirPods Pro 3",
    copy: "Compact audio hardware framed with the same visual priority as a hero device.",
    price: 6490000,
    image: "/assets/images/airpods-pro-3.png",
    to: "/products/airpods-pro-3",
    imageClassName:
      "mx-auto h-[210px] w-full max-w-[220px] object-contain sm:h-[245px] sm:max-w-[250px]",
    imageWrapClassName: "min-h-[240px] sm:min-h-[270px]",
  },
  {
    title: "Portable performance",
    subtitle: "MacBook Pro 14-inch",
    copy: "Portable pro hardware treated like a compact desk surface instead of another listing tile.",
    price: 46990000,
    image: "/assets/images/macbook-pro-14-inch.png",
    to: "/products/macbook-pro-14-inch",
    imageClassName:
      "mx-auto h-[190px] w-full max-w-[300px] object-contain sm:h-[225px] sm:max-w-[360px]",
    imageWrapClassName: "min-h-[240px] sm:min-h-[270px]",
  },
];

export default function FeaturedCategorySection() {
  const carouselItems = useMemo<CarouselItem[]>(() => curatedItems.slice(0, 9), []);
  const loopItems = useMemo(() => [...carouselItems, ...carouselItems], [carouselItems]);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const firstCardRef = useRef<HTMLAnchorElement | null>(null);
  const offsetRef = useRef(0);
  const loopWidthRef = useRef(0);
  const stepRef = useRef(0);
  const frameRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const applyTransform = useCallback((value: number) => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    track.style.transform = `translate3d(-${value}px, 0, 0)`;
  }, []);

  const measureTrack = useCallback(() => {
    const firstCard = firstCardRef.current;
    const track = trackRef.current;
    if (!firstCard || !track || carouselItems.length === 0) {
      stepRef.current = 0;
      loopWidthRef.current = 0;
      return;
    }

    const cardWidth = firstCard.getBoundingClientRect().width;
    const gapValue = Number.parseFloat(window.getComputedStyle(track).gap || "0");
    const step = cardWidth + gapValue;

    stepRef.current = step;
    loopWidthRef.current = step * carouselItems.length;
    offsetRef.current = offsetRef.current % loopWidthRef.current;
    applyTransform(offsetRef.current);
  }, [applyTransform, carouselItems.length]);

  const nudgeCarousel = useCallback(
    (direction: 1 | -1) => {
      if (!loopWidthRef.current || !stepRef.current) {
        return;
      }

      offsetRef.current =
        (offsetRef.current + direction * stepRef.current + loopWidthRef.current) %
        loopWidthRef.current;
      applyTransform(offsetRef.current);
    },
    [applyTransform]
  );

  useEffect(() => {
    measureTrack();

    const handleResize = () => measureTrack();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [measureTrack]);

  useEffect(() => {
    const speed = 28;

    const tick = (time: number) => {
      if (previousTimeRef.current === null) {
        previousTimeRef.current = time;
      }

      const delta = time - previousTimeRef.current;
      previousTimeRef.current = time;

      if (!isHovered && loopWidthRef.current > 0) {
        offsetRef.current = (offsetRef.current + speed * (delta / 1000)) % loopWidthRef.current;
        applyTransform(offsetRef.current);
      }

      frameRef.current = window.requestAnimationFrame(tick);
    };

    frameRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      previousTimeRef.current = null;
    };
  }, [applyTransform, isHovered]);

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-[1600px] px-3 sm:px-4 lg:px-8 2xl:px-10">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[720px]">
            <p className="cy-kicker">Curated flagships</p>
            <h2 className="mt-3 max-w-[13ch] text-[2.2rem] font-semibold leading-[0.96] tracking-[-0.06em] text-white sm:text-[3rem]">
              A tighter edit of the products worth opening first.
            </h2>
            <p className="mt-4 max-w-[48ch] text-[15px] leading-7 text-white/58 sm:text-base">
              Less storefront clutter, more product framing. Think of these as
              the opening compositions of the catalog rather than another
              product strip.
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/52 transition hover:text-white"
          >
            View complete archive
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-base">
              {"->"}
            </span>
          </Link>
        </div>

        <div
          className="group relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <button
            type="button"
            aria-label="Previous featured products"
            onClick={() => nudgeCarousel(-1)}
            className={[
              "absolute left-3 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/14 bg-white/[0.08] text-white/80 shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-xl transition duration-300",
              isHovered
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0",
            ].join(" ")}
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <button
            type="button"
            aria-label="Next featured products"
            onClick={() => nudgeCarousel(1)}
            className={[
              "absolute right-3 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/14 bg-white/[0.08] text-white/80 shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-xl transition duration-300",
              isHovered
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0",
            ].join(" ")}
          >
            <ArrowRight className="h-4 w-4" />
          </button>

          <div className="overflow-hidden">
            <div ref={trackRef} className="flex gap-5 will-change-transform">
              {loopItems.map((item, index) => (
                <Link
                  key={`${item.title}-${index}`}
                  ref={index === 0 ? firstCardRef : null}
                  to={item.to}
                  className="group/card relative w-[min(72vw,300px)] shrink-0 overflow-hidden rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,rgba(14,18,24,0.98),rgba(9,12,17,0.94))] p-5 shadow-[0_26px_90px_rgba(0,0,0,0.28)] transition duration-500 hover:-translate-y-[3px] hover:border-white/16 hover:shadow-[0_36px_110px_rgba(0,0,0,0.36)] sm:p-6"
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(143,185,255,0.14),transparent_42%)] opacity-0 transition duration-500 group-hover/card:opacity-100" />

                  <div
                    className={[
                      "relative flex items-center justify-center overflow-hidden",
                      item.imageWrapClassName ?? "",
                    ].join(" ")}
                  >
                    <img
                      src={resolveAssetUrl(item.image)}
                      alt={item.subtitle}
                      className={[
                        item.imageClassName,
                        "transition duration-500 group-hover/card:scale-[1.03]",
                      ].join(" ")}
                    />
                  </div>

                  <div className="relative mt-6 space-y-3">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-white/32">
                      {item.title}
                    </p>
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <h3 className="text-[1.2rem] font-semibold leading-[1.02] tracking-[-0.05em] text-white sm:text-[1.38rem]">
                          {item.subtitle}
                        </h3>
                        {typeof item.price === "number" ? (
                          <p className="mt-2 text-[12px] uppercase tracking-[0.18em] text-white/42 sm:text-[13px]">
                            {formatCurrencyVnd(item.price)}
                          </p>
                        ) : item.copy ? (
                          <p className="mt-2 max-w-[24ch] text-[13px] leading-6 text-white/54 line-clamp-2">
                            {item.copy}
                          </p>
                        ) : null}
                      </div>
                      <span className="text-sm font-medium text-white/46 transition group-hover/card:text-white/76">
                        Open
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
