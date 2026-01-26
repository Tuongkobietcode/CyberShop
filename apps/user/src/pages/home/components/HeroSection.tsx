import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="w-full bg-[#211C24] text-white">
      <div className="mx-auto w-full max-w-8xl px-10 py-20">
        <div className="grid items-center gap-20 md:grid-cols-2">
          {/* LEFT */}
          <div className="order-2 animate-fade-in-left md:order-1 motion-reduce:animate-none ml-60">
            <p className="text-[25px] font-semibold tracking-wide text-white/70">
              Pro.Beyond.
            </p>

            <h1 className="mt-2 text-8xl font-semibold">
              IPhone 14 Pro
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              Created to change everything for the better. For everyone.
            </p>

            <div className="mt-7">
              <Link
                to="/products"
                className="inline-flex items-center justify-center rounded-md border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15 active:scale-[0.99]"
              >
                Shop Now
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div className="order-1 md:order-2 animate-fade-in-right">
            <div className="relative mx-auto w-full max-w-sm">
              <img
                src="/images/Iphone14.png"
                alt="iPhone 14 Pro"
                className="
                  w-full
                  object-contain
                  drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)]
                  scale-110
                  md:scale-125
                "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
