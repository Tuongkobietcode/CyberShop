import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { useCart } from "@/features/cart/cart.context";
import { resolveAssetUrl } from "@/utils/assets";

function formatMoney(value: number) {
  return `$${Math.round(value / 16000).toLocaleString("en-US")}`;
}

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addItem } = useCart();

  return (
    <div className="bg-[#fafafa] pb-20">
      <Breadcrumb items={[{ label: "Home", to: "/home" }, { label: "Wishlist" }]} />

      <div className="mx-auto max-w-[1200px] px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-[3rem] font-semibold tracking-[-0.05em] text-black">Wishlist</h1>
            <p className="mt-2 text-base text-black/55">
              Devices you have saved for later, comparison, or a second look.
            </p>
          </div>
          <div className="inline-flex items-center gap-3 rounded-full bg-white px-4 py-3 text-sm font-medium text-black shadow-sm">
            <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
            {wishlist.length} saved item{wishlist.length === 1 ? "" : "s"}
          </div>
        </div>

        {wishlist.length === 0 ? (
          <section className="mt-10 overflow-hidden rounded-[32px] border border-dashed border-black/12 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 text-rose-500">
              <Heart className="h-7 w-7" />
            </div>
            <h2 className="mt-6 text-[2rem] font-semibold tracking-[-0.04em] text-black">Your wishlist is empty</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-black/55">
              Save products you are considering and come back to them later without losing track.
            </p>
            <Link
              to="/products"
              className="mt-8 inline-flex h-14 items-center justify-center rounded-xl bg-black px-8 text-sm font-semibold text-white transition hover:bg-[#1d1d1d]"
            >
              Explore Products
            </Link>
          </section>
        ) : (
          <section className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {wishlist.map((item) => (
              <article
                key={item.productId}
                className="group overflow-hidden rounded-[28px] border border-black/10 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.08)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-rose-500">
                    <Heart className="h-3.5 w-3.5 fill-current" />
                    Saved
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      toggleWishlist({
                        id: item.productId,
                        slug: item.slug,
                        sku: item.sku,
                        name: item.name,
                        description: item.name,
                        price: item.price,
                        compareAtPrice: null,
                        stock: 1,
                        featured: false,
                        status: "active",
                        displayStatus: "normal",
                        image: item.image,
                        images: [{ url: item.image, alt: item.name, sortOrder: 0 }],
                        category: item.categoryName
                          ? { id: "", name: item.categoryName, slug: "" }
                          : null,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                      })
                    }
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full text-black/35 transition hover:bg-black/5 hover:text-black"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <Link to={`/products/${item.slug}`} className="block">
                  <div className="mt-4 flex h-[220px] items-center justify-center rounded-[24px] bg-[linear-gradient(180deg,#f8fafc,#eef2f7)] p-6">
                    <img src={resolveAssetUrl(item.image)} alt={item.name} className="max-h-full object-contain transition duration-300 group-hover:scale-105" />
                  </div>
                  <p className="mt-6 text-xs uppercase tracking-[0.18em] text-black/35">{item.categoryName}</p>
                  <h2 className="mt-3 text-[1.45rem] font-semibold leading-8 tracking-[-0.03em] text-black">{item.name}</h2>
                  <p className="mt-4 text-[2.1rem] font-semibold tracking-[-0.05em] text-black">{formatMoney(item.price)}</p>
                </Link>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() =>
                      addItem({
                        id: item.productId,
                        slug: item.slug,
                        sku: item.sku,
                        name: item.name,
                        description: item.name,
                        price: item.price,
                        compareAtPrice: null,
                        stock: 1,
                        featured: false,
                        status: "active",
                        displayStatus: "normal",
                        image: item.image,
                        images: [{ url: item.image, alt: item.name, sortOrder: 0 }],
                        category: item.categoryName
                          ? { id: "", name: item.categoryName, slug: "" }
                          : null,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                      })
                    }
                    className="inline-flex h-13 flex-1 items-center justify-center gap-3 rounded-xl bg-black px-5 text-sm font-semibold text-white transition hover:bg-[#1d1d1d]"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </button>
                  <Link
                    to={`/products/${item.slug}`}
                    className="inline-flex h-13 flex-1 items-center justify-center rounded-xl border border-black/15 px-5 text-sm font-semibold text-black transition hover:border-black hover:bg-black hover:text-white"
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
