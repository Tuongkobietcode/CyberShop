import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="overflow-hidden bg-[#18121f] text-white">
      <div className="mx-auto grid max-w-[1720px] items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-10 lg:py-0 2xl:min-h-[720px] 2xl:px-16">
        <div className="relative z-10 py-6 sm:py-10 lg:py-16 2xl:py-24">
          <div className="max-w-xl 2xl:max-w-2xl">
            <p className="animate-fade-in-left text-xs font-medium tracking-[0.18em] text-white/55 sm:text-sm lg:text-base">
              Pro.Beyond.
            </p>

            <h1 className="mt-4 animate-fade-in-left whitespace-nowrap text-[3rem] font-light leading-[0.95] tracking-[-0.05em] sm:text-[4.6rem] lg:text-[6.3rem] 2xl:text-[8.2rem]">
              iPhone 14{" "}
              <span className="inline-block align-baseline font-semibold text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                Pro
              </span>
            </h1>

            <p className="mt-5 max-w-lg animate-fade-in-left text-sm leading-6 text-white/65 sm:text-base sm:leading-7 2xl:max-w-2xl 2xl:text-lg">
              Created to change everything for the better. A premium flagship
              experience shaped for speed, detail, and everyday style.
            </p>

            <div className="mt-8 animate-fade-in-left">
              <Link
                to="/products"
                className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition duration-300 hover:border-white/40 hover:bg-white/10 sm:px-7 2xl:px-8 2xl:py-4"
              >
                Shop Now
                <span className="inline-block h-px w-8 bg-white/70 transition duration-300 group-hover:w-10" />
              </Link>
            </div>
          </div>
        </div>

        <div className="relative flex min-h-[320px] items-end justify-center sm:min-h-[380px] lg:min-h-[560px] 2xl:min-h-[720px]">
          <div className="absolute left-1/2 top-10 h-52 w-52 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(107,56,255,0.55),_rgba(24,18,31,0)_68%)] blur-2xl sm:h-64 sm:w-64 2xl:top-20 2xl:h-80 2xl:w-80" />
          <img
            src="/images/Iphone14.png"
            alt="iPhone 14 Pro"
            className="relative z-10 animate-fade-in-right w-full max-w-[92px] object-contain drop-shadow-[0_55px_80px_rgba(0,0,0,0.65)] transition duration-500 hover:scale-[1.02] sm:max-w-[320px] lg:max-w-[420px] 2xl:max-w-[520px]"
          />
        </div>
      </div>
    </section>
  );
}
