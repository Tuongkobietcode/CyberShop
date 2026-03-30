import { Link } from "react-router-dom";
import { resolveAssetUrl } from "@/utils/assets";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-8 pt-4 text-[var(--text-primary)] sm:pb-10 sm:pt-8 lg:min-h-[calc(100vh-5.5rem)] lg:pt-[100px]">
      <div className="mx-auto max-w-[1600px] px-3 sm:px-4 lg:px-8 2xl:px-10">
        <div className="relative grid gap-10 lg:min-h-[calc(100vh-7rem)] lg:grid-cols-[0.9fr_1.1fr] lg:grid-rows-[auto_1fr] lg:gap-x-10 lg:gap-y-5">
          <div className="hidden lg:flex lg:items-start">
            <div className="inline-flex items-center rounded-full border border-black/8 bg-white/82 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.24em] text-[var(--text-secondary)] shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
              Studio archive
            </div>
          </div>

          <div className="hidden lg:flex lg:justify-end lg:items-start lg:pr-[6%]">
            <div className="inline-flex items-center rounded-full border border-black/8 bg-white/82 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.24em] text-[var(--text-secondary)] shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
              New arrival
            </div>
          </div>

          <div className="relative z-10 flex min-h-full flex-col justify-start pb-4 pt-8 animate-fade-in-left lg:row-start-2 lg:pt-0 lg:pb-10">
            <div className="max-w-[620px]">
              <div className="inline-flex items-center rounded-full border border-black/8 bg-white/82 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.24em] text-[var(--text-secondary)] shadow-[0_10px_30px_rgba(15,23,42,0.06)] lg:hidden">
                Studio archive
              </div>

              <h1 className="mt-50 max-w-[8ch] text-[3.8rem] font-semibold leading-[0.88] tracking-[-0.1em] text-[#1d1d1f] sm:text-[5rem] lg:text-[6.2rem] 2xl:text-[7.3rem]">
                Flagship
                <span className="block font-light text-[rgba(29,29,31,0.56)]">hardware.</span>
              </h1>

              <p className="mt-6 max-w-[42ch] text-[15px] leading-7 text-[var(--text-secondary)] sm:text-base sm:leading-8">
                CyberShop, reimagined through the logic of the Apple Store: quieter cards, clearer
                hierarchy, and stronger product framing for the devices people open first.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/products/iphone-17-pro" className="cy-btn-primary !text-white">
                  <span className="text-white">View collection</span>
                </Link>
                <Link to="/products" className="cy-btn-secondary">
                  Shop flagships
                </Link>
              </div>
            </div>
          </div>

          <div className="relative flex min-h-[420px] flex-col animate-fade-in-right pt-8 sm:min-h-[520px] lg:row-start-2 lg:min-h-full lg:justify-start lg:pt-0">
            <div className="flex justify-end pr-[6%] lg:hidden">
              <div className="inline-flex items-center rounded-full border border-black/8 bg-white/82 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.24em] text-[var(--text-secondary)] shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
                New arrival
              </div>
            </div>

            <div className="relative mt-5 min-h-[420px] flex-1 sm:min-h-[520px] lg:min-h-[560px]">
              <div className="pointer-events-none absolute left-1/2 top-[10%] h-[62%] w-[72%] -translate-x-1/2 rounded-[92px] bg-[radial-gradient(circle_at_center,rgba(147,197,253,0.2),rgba(191,219,254,0.1)_38%,rgba(191,219,254,0)_72%)]" />
              <div className="absolute inset-x-[4%] bottom-0 top-0 rounded-[56px] border border-[#d6e7f5] bg-[#eef7ff] shadow-[-24px_-20px_60px_rgba(173,205,232,0.12),24px_-20px_60px_rgba(173,205,232,0.12)]" />
              <img
                src={resolveAssetUrl("/assets/images/iphone-17-pro.png")}
                alt="iPhone 17 Pro hero"
                className="absolute bottom-[-100px] left-1/2 z-[1] w-[1500px] max-w-none -translate-x-1/2 object-contain drop-shadow-[0_35px_70px_rgba(15,23,42,0.18)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
