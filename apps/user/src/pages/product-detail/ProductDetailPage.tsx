import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { ProductCard } from "@/components/cards/ProductCard";
import { useAuth } from "@/features/auth/auth.context";
import { getCatalogProducts } from "@/features/catalog/catalog.service";
import { useCart } from "@/features/cart/cart.context";
import { getProductDetail } from "@/features/product/product.service";
import type { CatalogProduct } from "@/features/catalog/catalog.types";
import type { ProductDetail } from "@/features/product/product.types";
import AddToCartSection from "./components/AddToCartSection";
import ProductGallery from "./components/ProductGallery";
import ProductInfo from "./components/ProductInfo";
import ProductSpecs from "./components/ProductSpecs";
import ReviewSection from "./components/ReviewSection";
import { getProductGallery, getProductReviews, getProductSpecs } from "./data/product-content";

function getDisplayCategoryName(categoryName: string | undefined) {
  return categoryName || "Catalog";
}

function RelatedProducts({ products }: { products: CatalogProduct[] }) {
  return (
    <section className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="cy-kicker">Related products</p>
          <h2 className="mt-3 text-[2rem] font-semibold tracking-[-0.04em] text-white">
            More hardware in the same visual lane.
          </h2>
        </div>
        <Link to="/products" className="text-sm font-semibold text-white/54 transition hover:text-white">
          View catalog
        </Link>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
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
  const [selectedColor, setSelectedColor] = useState("#10141A");
  const [selectedCapacity, setSelectedCapacity] = useState("128GB");
  const [addedSignal, setAddedSignal] = useState(0);
  const [wishlistSignal, setWishlistSignal] = useState(0);

  useEffect(() => {
    async function loadData() {
      if (!slug) return;
      const detail = await getProductDetail(slug);
      setProduct(detail);
      const related = await getCatalogProducts({
        category: detail.category?.slug || detail.category?.id || "",
        limit: 8,
      });
      setRelatedProducts(related.data.filter((item) => item.slug !== detail.slug).slice(0, 4));
    }

    void loadData();
  }, [slug]);

  useEffect(() => {
    if (!product) return;
    setQuantity((current) => Math.min(Math.max(1, current), Math.max(product.stock, 1)));
  }, [product]);

  const gallery = useMemo(() => (product ? getProductGallery(product) : []), [product]);
  const specs = useMemo(() => (product ? getProductSpecs(product) : []), [product]);
  const reviews = useMemo(() => (product ? getProductReviews(product) : []), [product]);

  if (!product) {
    return <div className="px-4 py-16 text-center text-sm text-white/50">Loading product...</div>;
  }

  const categoryLabel = getDisplayCategoryName(product.category?.name);
  const wishlisted = isInWishlist(product.id, product.slug);
  const isOutOfStock = product.stock <= 0 || product.status === "out_of_stock";
  const maxQuantity = Math.max(product.stock, 1);

  return (
    <div className="bg-transparent pb-20">
      <Breadcrumb
        items={[
          { label: "Home", to: "/home" },
          { label: "Catalog", to: "/products" },
          {
            label: categoryLabel,
            to: product.category
              ? `/products?category=${encodeURIComponent(product.category.slug || product.category.id)}`
              : "/products",
          },
          { label: product.name },
        ]}
      />

      <div className="cy-shell space-y-16 pt-10">
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
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span
                className={[
                  "inline-flex rounded-full px-3 py-2 text-sm font-medium",
                  isOutOfStock ? "bg-rose-400/12 text-rose-200" : "bg-emerald-400/12 text-emerald-200",
                ].join(" ")}
              >
                {isOutOfStock ? "Out of stock" : `${product.stock} in stock`}
              </span>
              {!isOutOfStock ? <span className="text-sm text-white/45">Inventory updates after each confirmed purchase.</span> : null}
            </div>
            <AddToCartSection
              quantity={quantity}
              maxQuantity={maxQuantity}
              isOutOfStock={isOutOfStock}
              addedSignal={addedSignal}
              wishlistSignal={wishlistSignal}
              isWishlisted={wishlisted}
              onDecrease={() => setQuantity((current) => Math.max(1, current - 1))}
              onIncrease={() => setQuantity((current) => Math.min(maxQuantity, current + 1))}
              onAddToCart={() => {
                if (!isAuthenticated) {
                  navigate(`/sign-in?redirect=${encodeURIComponent(`/products/${product.slug}`)}`);
                  return;
                }
                if (isOutOfStock) {
                  return;
                }
                addItem(product, quantity);
                setAddedSignal(Date.now());
              }}
              onToggleWishlist={() => {
                if (!isAuthenticated) {
                  navigate(`/sign-in?redirect=${encodeURIComponent(`/products/${product.slug}`)}`);
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
    </div>
  );
}
