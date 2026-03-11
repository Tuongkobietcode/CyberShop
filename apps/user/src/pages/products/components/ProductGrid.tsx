import { Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import type { CatalogProduct } from "@/features/catalog/catalog.types";
import { useAuth } from "@/features/auth/auth.context";
import { useCart } from "@/features/cart/cart.context";
import { resolveAssetUrl } from "@/utils/assets";

function formatMoney(value: number) {
  return `$${Math.round(value / 16000).toLocaleString("en-US")}`;
}

export default function ProductGrid({ products }: { products: CatalogProduct[] }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { isInWishlist, toggleWishlist } = useCart();

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <article key={product.id} className="rounded-2xl bg-[#f6f6f6] p-6 text-center transition hover:-translate-y-1 hover:shadow-lg">
          <div className="flex justify-end">
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
                "inline-flex h-10 w-10 items-center justify-center rounded-full transition focus:outline-none",
                isInWishlist(product.id, product.slug)
                  ? "text-rose-500"
                  : "text-black/25 hover:text-black/40",
              ].join(" ")}
            >
              <Heart
                className={[
                  "h-6 w-6",
                  isInWishlist(product.id, product.slug) ? "text-rose-500" : "text-black/25",
                ].join(" ")}
                fill={isInWishlist(product.id, product.slug) ? "currentColor" : "none"}
              />
            </button>
          </div>
          <Link to={`/products/${product.slug}`} className="block">
            <div className="mx-auto flex h-[220px] items-center justify-center">
              <img src={resolveAssetUrl(product.image)} alt={product.name} className="max-h-full object-contain" />
            </div>
            <h3 className="mx-auto mt-6 max-w-[270px] text-[1.05rem] font-medium leading-8 text-black">
              {product.name}
            </h3>
            <p className="mt-5 text-[2.1rem] font-semibold tracking-[-0.04em] text-black">
              {formatMoney(product.price)}
            </p>
          </Link>
          <Link
            to={`/products/${product.slug}`}
            className="mt-6 inline-flex h-14 w-full items-center justify-center rounded-[10px] bg-black text-[15px] font-medium text-white transition hover:bg-[#1f1f1f]"
          >
            Buy Now
          </Link>
        </article>
      ))}
    </div>
  );
}
