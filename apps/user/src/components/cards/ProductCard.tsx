import { Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import type { CatalogProduct } from "@/features/catalog/catalog.types";
import { useAuth } from "@/features/auth/auth.context";
import { useCart } from "@/features/cart/cart.context";
import { formatCurrencyVnd } from "@/utils/format";
import { resolveAssetUrl } from "@/utils/assets";

export function ProductCard({ product }: { product: CatalogProduct }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { isInWishlist, toggleWishlist } = useCart();
  const active = isInWishlist(product.id, product.slug);
  const isOutOfStock = product.stock <= 0 || product.status === "out_of_stock";
  const stockLabel = isOutOfStock ? "Unavailable" : `${product.stock} in stock`;
  const description =
    product.description.length > 96
      ? `${product.description.slice(0, 93)}...`
      : product.description;

  return (
    <article className="group relative overflow-hidden rounded-[30px] border border-white/8 bg-[linear-gradient(180deg,rgba(16,22,31,0.96),rgba(10,14,20,0.92))] p-4 shadow-[0_28px_80px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-1 hover:border-white/14 hover:shadow-[0_34px_90px_rgba(0,0,0,0.36)]">
      <div className="pointer-events-none absolute inset-x-8 top-4 h-24 rounded-full bg-[radial-gradient(circle,rgba(143,185,255,0.16),transparent_72%)] opacity-0 blur-2xl transition duration-500 group-hover:opacity-100" />
      {isOutOfStock ? (
        <span className="absolute left-5 top-5 z-10 rounded-full border border-rose-400/24 bg-rose-400/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-200">
          Out of stock
        </span>
      ) : null}
      <button
        type="button"
        onClick={() => {
          if (!isAuthenticated) {
            navigate(`/sign-in?redirect=${encodeURIComponent(`/products/${product.slug}`)}`);
            return;
          }
          toggleWishlist(product);
        }}
        className={[
          "absolute right-5 top-5 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur transition focus:outline-none",
          active
            ? "border-rose-300/35 bg-rose-400/12 text-rose-300 shadow-[0_12px_30px_rgba(244,63,94,0.16)]"
            : "border-white/10 bg-white/[0.03] text-white/34 hover:border-white/18 hover:text-white/72",
        ].join(" ")}
      >
        <Heart
          className={["h-4 w-4", active ? "text-rose-300" : "text-white/36"].join(" ")}
          fill={active ? "currentColor" : "none"}
        />
      </button>
      <Link to={`/products/${product.slug}`} className="block">
        <div className="flex aspect-[4/3] items-center justify-center rounded-[24px] border border-white/6 bg-[radial-gradient(circle_at_top,rgba(143,185,255,0.13),rgba(255,255,255,0.02)_42%,rgba(255,255,255,0.01)_100%)] p-6">
          <img
            src={resolveAssetUrl(product.image || "/assets/images/iphone-17.png")}
            alt={product.name}
            className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.04]"
          />
        </div>
        <div className="space-y-4 p-2 pt-5">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/34">
              {product.category?.name || "Apple hardware"}
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/26">
              {product.category?.name || "Catalog"}
            </p>
          </div>
          <div>
            <h3 className="text-[1.15rem] font-semibold leading-6 tracking-[-0.04em] text-white">
              {product.name}
            </h3>
            <p className="mt-2 text-sm leading-6 text-white/52">{description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="cy-chip">{product.builtInMemory || "Flagship"}</span>
            <span className="cy-chip">{product.screenDiagonal || "Display"}</span>
          </div>
          <div className="flex items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="block text-[1.35rem] font-semibold tracking-[-0.04em] text-white">
                {formatCurrencyVnd(product.price)}
              </span>
              <span className="block text-xs uppercase tracking-[0.18em] text-white/32">
                {stockLabel}
              </span>
            </div>
            {product.compareAtPrice ? (
              <span className="font-mono text-sm text-white/32 line-through">
                {formatCurrencyVnd(product.compareAtPrice)}
              </span>
            ) : null}
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-white/6 pt-4">
          <span className="text-sm font-medium text-white/72">
            {isOutOfStock ? "View details" : "Explore product"}
          </span>
          <span className="text-sm font-semibold text-[var(--accent)] transition duration-300 group-hover:text-[var(--accent-strong)]">
            Open
          </span>
        </div>
      </Link>
    </article>
  );
}


