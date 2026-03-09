import { Link } from "react-router-dom";

type PromoCard = {
  title: string;
  copy: string;
  image: string;
  imageClassName: string;
  theme: "light" | "dark";
  action?: boolean;
};

const promos: PromoCard[] = [
  {
    title: "Playstation 5",
    copy:
      "Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience.",
    image: "/images/PlayStation.png",
    imageClassName:
      "left-[calc(-24%+100px)] bottom-[-4%] w-[78%] max-w-[460px] sm:left-[calc(-18%+100px)] sm:w-[58%] lg:w-[62%] 2xl:max-w-[540px]",
    theme: "light",
  },
  {
    title: "Apple AirPods Max",
    copy: "Computational audio. Listen, it is powerful.",
    image: "/images/Wireless.png",
    imageClassName:
      "left-[-10%] bottom-[2%] w-[48%] max-w-[150px] sm:left-[-6%] sm:w-[40%] 2xl:max-w-[180px]",
    theme: "light",
  },
  {
    title: "Apple Vision Pro",
    copy: "An immersive way to experience entertainment.",
    image: "/images/VisionPro.png",
    imageClassName:
      "left-[-8%] bottom-[2%] w-[54%] max-w-[170px] sm:left-[-4%] sm:w-[44%] 2xl:max-w-[190px]",
    theme: "dark",
  },
  {
    title: "Macbook Air",
    copy:
      "The new 15-inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display.",
    image: "/images/MacBookAir.png",
    imageClassName:
      "right-0 bottom-[2%] w-[54%] max-w-[320px] sm:right-0 sm:w-[46%] 2xl:max-w-[390px]",
    theme: "light",
    action: true,
  },
];

function Promo({ item, large = false }: { item: PromoCard; large?: boolean }) {
  const isDark = item.theme === "dark";
  const isPlaystation = item.title === "Playstation 5";
  const isAirpods = item.title === "Apple AirPods Max";
  const isVisionPro = item.title === "Apple Vision Pro";
  const isMacbook = item.title === "Macbook Air";

  return (
    <article
      className={[
        "group relative overflow-hidden transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,23,42,0.12)]",
        isDark ? "bg-[#2a2a2a] text-white" : "bg-white text-slate-900",
        large
          ? "min-h-[340px] p-6 sm:min-h-[380px] sm:p-8 lg:min-h-[420px] lg:p-10 2xl:min-h-[500px] 2xl:p-12"
          : "min-h-[220px] p-5 sm:min-h-[210px] sm:p-6 2xl:min-h-[260px]",
      ].join(" ")}
    >
      <div
        className={[
          "absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100",
          isDark
            ? "bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent_40%)]"
            : "bg-[radial-gradient(circle_at_80%_10%,rgba(15,23,42,0.06),transparent_40%)]",
        ].join(" ")}
      />

      <img
        src={item.image}
        alt={item.title}
        className={[
          "pointer-events-none absolute object-contain drop-shadow-[0_20px_40px_rgba(15,23,42,0.18)] transition duration-500 group-hover:scale-105",
          item.imageClassName,
        ].join(" ")}
      />

      <div
        className={[
          "relative z-10",
          isPlaystation
            ? "ml-auto mt-[100px] max-w-[52%] sm:max-w-[48%] lg:max-w-[44%]"
            : isMacbook
              ? "mt-[100px] max-w-[56%] sm:max-w-[52%] lg:mt-[180px] lg:max-w-[48%]"
              : isAirpods
                ? "ml-auto mt-[22px] max-w-[58%] sm:mt-[28px] sm:max-w-[55%]"
                : isVisionPro
                  ? "ml-auto mt-[26px] max-w-[56%] sm:mt-[30px] sm:max-w-[53%]"
            : large
              ? "max-w-[58%] sm:max-w-[52%] lg:max-w-[48%]"
              : "ml-auto max-w-[62%] sm:max-w-[58%]",
        ].join(" ")}
      >
        <h2
          className={[
            "leading-none tracking-[-0.04em]",
            large
              ? "text-[2.5rem] font-light sm:text-5xl lg:text-6xl 2xl:text-7xl"
              : "text-[1.75rem] font-light sm:text-[2rem] 2xl:text-[2.4rem]",
          ].join(" ")}
        >
          {item.title.split(" ").slice(0, -1).join(" ")}{" "}
          <span className="font-semibold">{item.title.split(" ").slice(-1)}</span>
        </h2>

        <p
          className={[
            "mt-4 text-xs leading-5 sm:text-sm sm:leading-6 2xl:text-base",
            isDark ? "text-white/70" : "text-slate-500",
          ].join(" ")}
        >
          {item.copy}
        </p>

        {item.action ? (
          <Link
            to="/products"
            className="mt-7 inline-flex items-center gap-3 rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-900 hover:bg-slate-900 hover:text-white sm:px-6 2xl:px-7"
          >
            Shop Now
            <span className="h-px w-7 bg-current" />
          </Link>
        ) : null}
      </div>
    </article>
  );
}

export default function FeaturedCategorySection() {
  return (
    <section className="bg-[#f6f6f6]">
      <div className="grid gap-0 px-0 lg:grid-cols-[1.04fr_0.96fr]">
        <div className="grid gap-0">
          <Promo item={promos[0]} large />
          <div className="grid gap-0 sm:grid-cols-2">
            <Promo item={promos[1]} />
            <Promo item={promos[2]} />
          </div>
        </div>

        <Promo item={promos[3]} large />
      </div>
    </section>
  );
}
