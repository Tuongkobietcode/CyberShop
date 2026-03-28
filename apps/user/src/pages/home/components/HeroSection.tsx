import { Link } from "react-router-dom";
import { resolveAssetUrl } from "@/utils/assets";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-8 pt-2 text-white sm:pb-12 sm:pt-4">
      <div className="mx-auto max-w-[1600px] px-3 sm:px-4 lg:px-8 2xl:px-10">
        <div className="relative grid gap-8 lg:min-h-[calc(100dvh-6.5rem)] lg:grid-cols-[0.74fr_1.26fr] lg:items-center">
          <div className="relative z-10 flex min-h-full flex-col justify-center pb-4 pt-8 lg:pb-10 lg:pt-12 animate-fade-in-left">
            <div className="max-w-[560px]">
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.24em] text-white/54 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                Studio archive
              </div>

              <h1 className="mt-6 max-w-[8ch] text-[3.9rem] font-semibold leading-[0.88] tracking-[-0.1em] text-white sm:text-[5.2rem] lg:text-[6.9rem] 2xl:text-[8.2rem]">
                Flagship
                <span className="block font-light text-white/78">hardware.</span>
              </h1>

              <p className="mt-6 max-w-[42ch] text-[15px] leading-7 text-white/62 sm:text-base sm:leading-8">
                CyberShop reimagined as a dark product gallery. Fewer blocks,
                stronger imagery, and a calmer rhythm built around premium
                devices, not commodity cards.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/products/iphone-17-pro-max"
                  className="cy-btn-primary"
                >
                  View collection
                </Link>
                <Link to="/products" className="cy-btn-secondary">
                  Shop flagships
                </Link>
              </div>
            </div>
          </div>

          <div className="relative min-h-[560px] animate-fade-in-right sm:min-h-[700px] lg:min-h-[860px]">
            <div className="absolute right-[2%] top-6 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-white/48 backdrop-blur-sm">
              New arrival
            </div>

            <div className="pointer-events-none absolute right-[3%] top-[16%] h-[78%] w-[92%] rounded-[44px] bg-[radial-gradient(circle_at_center,rgba(255,137,55,0.18),rgba(255,137,55,0)_60%)] blur-3xl" />
            <img
              src={resolveAssetUrl("/assets/images/product-hero.png")}
              alt="iPhone 17 hero"
              className="absolute bottom-[20%] right-[-10%] w-[1000px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
