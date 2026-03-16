import { Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import type { CatalogProduct } from "@/features/catalog/catalog.types";
import { useAuth } from "@/features/auth/auth.context";
import { useCart } from "@/features/cart/cart.context";
import { resolveAssetUrl } from "@/utils/assets";

function formatMoney(value: number) {
  return value.toLocaleString("vi-VN");
}

export function ProductCard({ product }: { product: CatalogProduct }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { isInWishlist, toggleWishlist } = useCart();
  const active = isInWishlist(product.id, product.slug);
  const isOutOfStock = product.stock <= 0 || product.status === "out_of_stock";

  return (
    <article className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      {isOutOfStock ? (
        <span className="absolute left-5 top-5 z-10 rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-rose-600">
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
          "absolute right-5 top-5 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border bg-white/90 backdrop-blur transition focus:outline-none",
          active
            ? "border-rose-300 text-rose-500 shadow-[0_12px_30px_rgba(244,63,94,0.18)]"
            : "border-slate-200 text-slate-300 hover:border-slate-300 hover:text-slate-400",
        ].join(" ")}
      >
        <Heart
          className={["h-4 w-4", active ? "text-rose-500" : "text-slate-300"].join(" ")}
          fill={active ? "currentColor" : "none"}
        />
      </button>
      <Link
        to={`/products/${product.slug}`}
        className="block"
      >
      <div className="aspect-[4/3] bg-[linear-gradient(180deg,_#f8fafc,_#e2e8f0)] p-6">
        <img
          src={resolveAssetUrl(product.image || "/assets/images/iphone-fallback.png")}
          alt={product.name}
          className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="space-y-3 p-5">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            {product.category?.name || "Catalog"}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-slate-900">{product.name}</h3>
        </div>
        <div className="flex items-end gap-3">
          <span className="text-xl font-semibold text-slate-900">{formatMoney(product.price)}</span>
          {product.compareAtPrice ? (
            <span className="text-sm text-slate-400 line-through">
              {formatMoney(product.compareAtPrice)}
            </span>
          ) : null}
        </div>
        <p className="text-sm text-slate-400">{isOutOfStock ? "Currently unavailable" : `${product.stock} items available`}</p>
      </Link>
    </article>
  );
}


