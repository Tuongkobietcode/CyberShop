import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { useCart } from "@/features/cart/cart.context";
import type { CatalogProduct } from "@/features/catalog/catalog.types";
import type { WishlistItem } from "@/features/cart/cart.types";
import { resolveAssetUrl } from "@/utils/assets";
import { formatCurrencyVnd } from "@/utils/format";

function toCatalogProduct(item: WishlistItem): CatalogProduct {
  const now = new Date().toISOString();

  return {
    id: item.productId,
    slug: item.slug,
    sku: item.sku,
    name: item.name,
    description: item.name,
    price: item.price,
    compareAtPrice: null,
    stock: 1,
    featured: false,
    batteryCapacity: "",
    screenType: "",
    screenDiagonal: "",
    protectionClass: "",
    builtInMemory: "",
    status: "active",
    displayStatus: "normal",
    image: item.image,
    images: [{ url: item.image, alt: item.name, sortOrder: 0 }],
    category: item.categoryName ? { id: "", name: item.categoryName, slug: "" } : null,
    createdAt: now,
    updatedAt: now,
  };
}

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addItem } = useCart();

  return (
    <div className="pb-24">
      <Breadcrumb items={[{ label: "Home", to: "/home" }, { label: "Wishlist" }]} />

      <div className="cy-shell pt-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="cy-kicker">Saved products</span>
            <h1 className="cy-display mt-5 max-w-[10ch]">Wishlist built for a second decision.</h1>
            <p className="cy-copy mt-5 max-w-xl">
              Devices saved for later stay in a darker, calmer space so the user can compare and return without visual clutter.
            </p>
          </div>
          <div className="inline-flex items-center gap-3 rounded-full border border-(--line-soft) bg-white/[0.04] px-4 py-3 text-sm font-medium text-(--text-primary)">
            <Heart className="h-4 w-4 fill-(--accent) text-(--accent)" />
            {wishlist.length} saved item{wishlist.length === 1 ? "" : "s"}
          </div>
        </div>

        {wishlist.length === 0 ? (
          <section className="cy-panel mt-10 px-10 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[rgba(143,185,255,0.22)] bg-[rgba(143,185,255,0.14)] text-(--accent)">
              <Heart className="h-7 w-7" />
            </div>
            <h2 className="mt-6 text-[2rem] font-semibold tracking-[-0.04em] text-(--text-primary)">Your wishlist is empty</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-(--text-secondary)">
              Save products you are considering and come back to them later without losing track.
            </p>
            <Link to="/products" className="cy-btn-primary mt-8 inline-flex h-14 items-center justify-center px-8">
              Explore products
            </Link>
          </section>
        ) : (
          <section className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {wishlist.map((item) => (
              <article
                key={item.productId}
                className="group overflow-hidden rounded-[28px] border border-(--line-soft) bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:border-[rgba(143,185,255,0.2)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(143,185,255,0.2)] bg-[rgba(143,185,255,0.14)] px-3 py-2 text-xs uppercase tracking-[0.18em] text-(--accent)">
                    <Heart className="h-3.5 w-3.5 fill-current" />
                    Saved
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleWishlist(toCatalogProduct(item))}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full text-(--text-secondary) transition hover:bg-white/[0.06] hover:text-(--text-primary)"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <Link to={`/products/${item.slug}`} className="block">
                  <div className="relative mt-4 flex h-[220px] items-center justify-center overflow-hidden rounded-[24px] bg-[linear-gradient(180deg,#0f141c,#0b0f15)] p-6">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(143,185,255,0.1),transparent_30%)]" />
                    <img src={resolveAssetUrl(item.image)} alt={item.name} className="relative z-10 max-h-full object-contain transition duration-300 group-hover:scale-105" />
                  </div>
                  <p className="mt-6 text-xs uppercase tracking-[0.18em] text-(--text-tertiary)">{item.categoryName}</p>
                  <h2 className="mt-3 text-[1.45rem] font-semibold leading-8 tracking-[-0.03em] text-(--text-primary)">{item.name}</h2>
                  <p className="mt-4 font-mono text-[2.1rem] font-semibold tracking-[-0.05em] text-(--text-primary)">{formatCurrencyVnd(item.price)}</p>
                </Link>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => addItem(toCatalogProduct(item))}
                    className="cy-btn-primary inline-flex h-13 flex-1 items-center justify-center gap-3 px-5 text-sm"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to cart
                  </button>
                  <Link
                    to={`/products/${item.slug}`}
                    className="cy-btn-secondary inline-flex h-13 flex-1 items-center justify-center px-5 text-sm"
                  >
                    View
                  </Link>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
