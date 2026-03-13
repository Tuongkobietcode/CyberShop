import { Link, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/features/auth/auth.context";
import { getCatalogProducts } from "@/features/catalog/catalog.service";
import type { CatalogProduct } from "@/features/catalog/catalog.types";
import { useCart } from "@/features/cart/cart.context";
import { resolveAssetUrl } from "@/utils/assets";

type Product = {
  product: CatalogProduct;
  title: string;
  price: string;
};

type PromoBlock = {
  title: string;
  copy: string;
  image: string;
  dark?: boolean;
};

const promos: PromoBlock[] = [
  {
    title: "Popular Products",
    copy: "Minimal hardware and lifestyle picks arranged to feel premium, tactile, and ready to sell.",
    image: "/assets/images/profile-group-1.png",
  },
  {
    title: "Ipad Pro",
    copy: "Packed canvas, lightweight form, and a visual language built for modern workflows.",
    image: "/assets/images/ipad-10-9-wifi.png",
  },
  {
    title: "Samsung Galaxy",
    copy: "A cinematic fold with luxurious surfaces and compact product storytelling.",
    image: "/assets/images/galaxy-z-fold-5.png",
    dark: true,
  },
  {
    title: "Macbook Pro",
    copy: "Industrial materials and focused hierarchy to make premium hardware feel effortless.",
    image: "/assets/images/macbook-air-main.png",
    dark: true,
  },
];

function ProductGrid({
  title,
  products,
}: {
  title: string;
  products: Product[];
}) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { isInWishlist, toggleWishlist } = useCart();

  return (
    <section className="py-14">
      <div className="mx-auto max-w-[1720px] px-4 sm:px-6 lg:px-10 2xl:px-16">
        <div className="mb-8 flex flex-wrap items-center gap-4 sm:gap-6">
          <h2 className="border-b border-black pb-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-900 sm:text-sm">
            {title}
          </h2>
          <button
            type="button"
            className="text-sm text-slate-400 transition hover:text-slate-800"
          >
            Bestseller
          </button>
          <button
            type="button"
            className="text-sm text-slate-400 transition hover:text-slate-800"
          >
            Featured Products
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:gap-5">
          {products.map((product) => (
            <article
              key={product.title}
              className="group relative overflow-hidden rounded-[20px] bg-white px-4 py-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(15,23,42,0.08)] sm:px-5 sm:py-6"
            >
              <button
                type="button"
                onClick={() => {
                  if (!isAuthenticated) {
                    navigate(
                      `/sign-in?redirect=${encodeURIComponent(`/products/${product.product.slug}`)}`,
                    );
                    return;
                  }
                  toggleWishlist(product.product);
                }}
                className={[
                  "absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/92 shadow-sm transition focus:outline-none",
                  isInWishlist(product.product.id, product.product.slug)
                    ? "text-rose-500"
                    : "text-slate-300 hover:text-slate-400",
                ].join(" ")}
              >
                <Heart
                  className={[
                    "h-4 w-4",
                    isInWishlist(product.product.id, product.product.slug)
                      ? "text-rose-500"
                      : "text-slate-300",
                  ].join(" ")}
                  fill={
                    isInWishlist(product.product.id, product.product.slug)
                      ? "currentColor"
                      : "none"
                  }
                />
              </button>

              <Link to={`/products/${product.product.slug}`} className="block">
                <div className="flex h-40 items-center justify-center sm:h-48 2xl:h-52">
                  <img
                    src={resolveAssetUrl(product.product.image)}
                    alt={product.title}
                    className="max-h-full object-contain transition duration-300 group-hover:scale-105"
                  />
                </div>

                <h3 className="mt-5 min-h-[3rem] text-center text-xs font-medium leading-5 text-slate-900 sm:text-sm">
                  {product.title}
                </h3>
                <p className="mt-3 text-center text-2xl font-semibold tracking-tight text-slate-950">
                  {product.price}
                </p>
              </Link>

              <Link
                to={`/products/${product.product.slug}`}
                className="mt-5 block rounded-xl bg-black px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Buy Now
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function formatMoney(value: number) {
  return `$${value.toLocaleString("en-US")}`;
}

function mapProducts(products: CatalogProduct[]): Product[] {
  return products.map((product) => ({
    product,
    title: product.name,
    price: formatMoney(product.price),
  }));
}

function PromoStrip() {
  return (
    <section className="py-12">
      <div className="mx-auto grid max-w-[1720px] gap-0 px-4 sm:px-6 lg:grid-cols-2 lg:px-10 xl:grid-cols-4 2xl:px-16">
        {promos.map((item, index) => (
          <article
            key={item.title}
            className={[
              "group relative overflow-hidden p-6 transition duration-500 hover:-translate-y-1 sm:p-7 2xl:p-8",
              item.dark
                ? "bg-[#2c2c2c] text-white"
                : index === 1
                  ? "bg-[#f2f2f2]"
                  : "bg-white",
            ].join(" ")}
          >
            <img
              src={resolveAssetUrl(item.image)}
              alt={item.title}
              className="mx-auto h-36 object-contain transition duration-500 group-hover:scale-105 sm:h-44 2xl:h-48"
            />
            <h3 className="mt-4 text-[1.8rem] font-light leading-none tracking-[-0.04em] sm:text-[2rem] 2xl:text-[2.3rem]">
              {item.title.split(" ")[0]}{" "}
              <span className="font-semibold">
                {item.title.split(" ").slice(1).join(" ")}
              </span>
            </h3>
            <p
              className={[
                "mt-4 text-sm leading-6",
                item.dark ? "text-white/70" : "text-slate-500",
              ].join(" ")}
            >
              {item.copy}
            </p>
            <Link
              to="/products"
              className={[
                "mt-7 inline-flex items-center gap-3 rounded-full border px-6 py-3 text-sm font-semibold transition",
                item.dark
                  ? "border-white/20 text-white hover:border-white/40 hover:bg-white/10"
                  : "border-slate-300 text-slate-900 hover:border-slate-900 hover:bg-slate-900 hover:text-white",
              ].join(" ")}
            >
              Shop Now
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function BigBanner() {
  return (
    <section className="pb-16 pt-4">
      <div className="mx-auto overflow-hidden bg-[#19161d] px-4 sm:px-6 lg:px-10 2xl:px-16">
        <div className="relative mx-auto flex min-h-[320px] max-w-[1720px] items-center justify-center overflow-hidden px-4 py-12 text-center text-white sm:min-h-[360px] sm:px-6 2xl:min-h-[420px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_45%)]" />
          <img
            src={resolveAssetUrl("/assets/images/iphone-14-pro-angle-2.png")}
            alt="Summer devices left"
            className="absolute left-[-2%] top-[8%] hidden w-[220px] rotate-[-18deg] object-contain opacity-95 md:block 2xl:w-[300px]"
          />
          <img
            src={resolveAssetUrl("/assets/images/apple-watch.png")}
            alt="Watch"
            className="absolute bottom-[-2%] right-[6%] hidden w-[180px] rotate-[18deg] object-contain md:block 2xl:w-[240px]"
          />
          <img
            src={resolveAssetUrl("/assets/images/iphone-14-front.png")}
            alt="Phone"
            className="absolute right-[-4%] top-[4%] hidden w-[180px] rotate-[24deg] object-contain opacity-90 lg:block 2xl:w-[240px]"
          />

          <div className="relative z-10 max-w-2xl">
            <p className="text-[2.8rem] font-light tracking-[-0.05em] sm:text-6xl 2xl:text-7xl">
              Big Summer <span className="font-semibold text-white">Sale</span>
            </p>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/65 sm:text-base sm:leading-7 2xl:max-w-2xl">
              Commodo fames vitae vitae leo mauris in. Eu consequat. Faster
              layouts, cleaner styling, and premium summer energy.
            </p>
            <Link
              to="/products"
              className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
            >
              Shop Now
              <span className="h-px w-8 bg-white/70" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ProductShowcaseSection() {
  const [products, setProducts] = useState<CatalogProduct[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const response = await getCatalogProducts({ limit: 8 });
      setProducts(response.data);
    }

    loadProducts();
  }, []);

  const newArrivals = useMemo(
    () => mapProducts(products.slice(0, 8)),
    [products],
  );
  const discountProducts = useMemo(
    () =>
      mapProducts(products.filter((item) => item.compareAtPrice).slice(0, 4)),
    [products],
  );

  return (
    <>
      <ProductGrid title="New Arrival" products={newArrivals} />
      <PromoStrip />
      <ProductGrid title="Discounts Up To -50%" products={discountProducts} />
      <BigBanner />
    </>
  );
}
