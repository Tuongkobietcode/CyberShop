import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { useAuth } from "@/features/auth/auth.context";
import { getCatalogProducts } from "@/features/catalog/catalog.service";
import { useCart } from "@/features/cart/cart.context";
import { getProductDetail } from "@/features/product/product.service";
import type { CatalogProduct } from "@/features/catalog/catalog.types";
import type { ProductDetail } from "@/features/product/product.types";
import { resolveAssetUrl } from "@/utils/assets";
import AddToCartSection from "./components/AddToCartSection";
import ProductGallery from "./components/ProductGallery";
import ProductInfo from "./components/ProductInfo";
import ProductSpecs from "./components/ProductSpecs";
import ReviewSection from "./components/ReviewSection";
import {
  getProductGallery,
  getProductReviews,
  getProductSpecs,
} from "./data/product-content";

function getDisplayCategoryName(
  categoryName: string | undefined,
  categorySlug: string | undefined,
) {
  if (categorySlug === "phones") return "Smartphones";
  return categoryName || "Catalog";
}

function RelatedProducts({ products }: { products: CatalogProduct[] }) {
  return (
    <section className="space-y-8">
      <h2 className="text-[2rem] font-semibold tracking-[-0.04em] text-black">
        Related Products
      </h2>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <article
            key={product.id}
            className="rounded-2xl bg-[#f6f6f6] p-6 text-center"
          >
            <div className="mx-auto flex h-[180px] items-center justify-center">
              <img
                src={resolveAssetUrl(product.image)}
                alt={product.name}
                className="max-h-full object-contain"
              />
            </div>
            <h3 className="mx-auto mt-5 max-w-[220px] text-sm font-medium leading-6 text-black">
              {product.name}
            </h3>
            <p className="mt-4 text-[1.9rem] font-semibold tracking-[-0.04em] text-black">
              ${Math.round(product.price / 16000).toLocaleString("en-US")}
            </p>
            <Link
              to={`/products/${product.slug}`}
              className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-[10px] bg-black text-sm font-medium text-white"
            >
              Buy Now
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function ProductDetailPage() {
  const { slug = "" } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addItem, isInWishlist, toggleWishlist } = useCart();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<CatalogProduct[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("#7441e1");
  const [selectedCapacity, setSelectedCapacity] = useState("128GB");
  const [addedSignal, setAddedSignal] = useState(0);
  const [wishlistSignal, setWishlistSignal] = useState(0);

  useEffect(() => {
    async function loadData() {
      if (!slug) return;
      const detail = await getProductDetail(slug);
      setProduct(detail);
      const related = await getCatalogProducts({
        category: detail.category?.id || "",
        limit: 8,
      });
      setRelatedProducts(
        related.data.filter((item) => item.slug !== detail.slug).slice(0, 4),
      );
    }

    loadData();
  }, [slug]);

  const gallery = useMemo(
    () => (product ? getProductGallery(product) : []),
    [product],
  );
  const specs = useMemo(
    () => (product ? getProductSpecs(product) : []),
    [product],
  );
  const reviews = useMemo(
    () => (product ? getProductReviews(product) : []),
    [product],
  );

  if (!product) {
    return (
      <div className="px-4 py-16 text-center text-sm text-black/50">
        Loading product...
      </div>
    );
  }

  const brand = product.name.split(" ")[0];
  const categoryLabel = getDisplayCategoryName(
    product.category?.name,
    product.category?.slug,
  );
  const wishlisted = isInWishlist(product.id, product.slug);

  return (
    <div className="bg-[#fafafa] pb-20">
      <Breadcrumb
        items={[
          { label: "Home", to: "/home" },
          { label: "Catalog", to: "/products" },
          {
            label: categoryLabel,
            to: product.category
              ? `/products?category=${product.category.id}`
              : "/products",
          },
          { label: brand },
          { label: product.name },
        ]}
      />

      <div className="mx-auto max-w-[1200px] space-y-18 px-4 pt-10 sm:px-6 lg:px-8">
        <section className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <ProductGallery images={gallery} name={product.name} />
          <div>
            <ProductInfo
              product={product}
              selectedColor={selectedColor}
              onSelectColor={setSelectedColor}
              selectedCapacity={selectedCapacity}
              onSelectCapacity={setSelectedCapacity}
            />
            <AddToCartSection
              quantity={quantity}
              addedSignal={addedSignal}
              wishlistSignal={wishlistSignal}
              isWishlisted={wishlisted}
              onDecrease={() =>
                setQuantity((current) => Math.max(1, current - 1))
              }
              onIncrease={() => setQuantity((current) => current + 1)}
              onAddToCart={() => {
                if (!isAuthenticated) {
                  navigate(
                    `/sign-in?redirect=${encodeURIComponent(`/products/${product.slug}`)}`,
                  );
                  return;
                }
                addItem(product, quantity);
                setAddedSignal(Date.now());
              }}
              onToggleWishlist={() => {
                if (!isAuthenticated) {
                  navigate(
                    `/sign-in?redirect=${encodeURIComponent(`/products/${product.slug}`)}`,
                  );
                  return;
                }
                toggleWishlist(product);
                setWishlistSignal(Date.now());
              }}
            />
          </div>
        </section>

        <ProductSpecs specs={specs} />
        <ReviewSection reviews={reviews} />
        <RelatedProducts products={relatedProducts} />
      </div>

      {/* DETAILS */}
      <div className="bg-white mt-20 p-20 rounded-xl w-3/4 mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Details</h2>

        <p className="text-gray-400 text-sm leading-6 mb-8 max-w-5xl">
          Just as a book is judged by its cover, the first thing you notice when
          you pick up a modern smartphone is the display. Nothing surprising,
          because advanced technologies allow you to practically level the
          display frames.
        </p>

        {/* SCREEN */}
        <h3 className="font-semibold text-lg mb-4">Screen</h3>

        <div className="border-t border-gray-200">
          {SCREEN_DETAILS.map((item) => (
            <div
              key={item.label}
              className="flex justify-between py-4 border-b border-gray-200 text-sm"
            >
              <span className="text-gray-500">{item.label}</span>

              <span className="text-gray-800 text-right whitespace-pre-line">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* CPU */}
        <h3 className="font-semibold text-lg mt-10 mb-4">CPU</h3>

        <div>
          {CPU_DETAILS.map((item) => (
            <div
              key={item.label}
              className="flex justify-between py-4 border-gray-200 border-b text-sm"
            >
              <span className="text-gray-500">{item.label}</span>
              <span className="text-gray-800">{item.value}</span>
            </div>
          ))}
        </div>

        {/* VIEW MORE */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowMore(!showMore)}
            className="flex items-center gap-2 border px-10 py-2 rounded-lg hover:bg-gray-50"
          >
            View More
            <ChevronDown size={18} />
          </button>
        </div>
      </div>

      {/* REVIEWS */}
      <div className="bg-white mt-20 p-20 rounded-xl w-3/4 mx-auto">
        <h2 className="text-2xl font-semibold mb-10">Reviews</h2>

        <div className="flex gap-16 mb-10">
          {/* SCORE */}
          <div className="bg-gray-50 rounded-xl px-10 py-8 text-center">
            <p className="text-5xl font-bold">4.8</p>
            <p className="text-gray-400 text-sm mt-2">of 125 reviews</p>

            <div className="flex justify-center gap-1 mt-3 text-orange-400">
              {"★★★★★"}
            </div>
          </div>

          {/* BARS */}
          <div className="flex-1 space-y-3">
            {REVIEW_STATS.map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <span className="w-32 text-sm text-gray-600">{item.label}</span>

                <div className="flex-1 h-2 bg-gray-200 rounded">
                  <div
                    className="h-2 bg-orange-300 rounded"
                    style={{ width: `${item.value}%` }}
                  />
                </div>

                <span className="text-sm text-gray-400 w-6">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* COMMENT INPUT */}
        <input
          placeholder="Leave Comment"
          className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm mb-10"
        />

        {/* REVIEWS LIST */}
        <div className="space-y-6">
          {REVIEWS.map((review, i) => (
            <div key={i} className="bg-gray-50 p-6 rounded-xl">
              <div className="flex justify-between mb-2">
                <div className="flex items-center gap-3">
                  <img src={review.avatar} className="w-10 h-10 rounded-full" />

                  <div>
                    <p className="font-medium">{review.name}</p>

                    <div className="text-orange-400 text-sm">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </div>
                  </div>
                </div>

                <span className="text-gray-400 text-sm">{review.date}</span>
              </div>

              <p className="text-gray-500 text-sm leading-6">{review.text}</p>
            </div>
          ))}
        </div>

        {/* VIEW MORE */}
        <div className="flex justify-center mt-10">
          <button className="flex items-center gap-2 border px-10 py-2 rounded-lg hover:bg-gray-50">
            View More
            <ChevronDown size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
