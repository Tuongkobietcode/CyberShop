import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { useAuth } from "@/features/auth/auth.context";
import { getCatalogProducts } from "@/features/catalog/catalog.service";
import { useCart } from "@/features/cart/cart.context";
import {
  createProductReview,
  getProductDetail,
  getProductReviews as getProductReviewsApi,
} from "@/features/product/product.service";
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
  getProductSpecs,
} from "./data/product-content";
import type { ProductReview } from "@/features/product/product-review.types";

function getDisplayCategoryName(categoryName: string | undefined, categorySlug: string | undefined) {
  if (categorySlug === "phones") return "Smartphones";
  return categoryName || "Catalog";
}

function RelatedProducts({ products }: { products: CatalogProduct[] }) {
  return (
    <section className="space-y-8">
      <h2 className="text-[2rem] font-semibold tracking-[-0.04em] text-black">Related Products</h2>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <article key={product.id} className="rounded-2xl bg-[#f6f6f6] p-6 text-center">
            <div className="mx-auto flex h-[180px] items-center justify-center">
              <img src={resolveAssetUrl(product.image)} alt={product.name} className="max-h-full object-contain" />
            </div>
            <h3 className="mx-auto mt-5 max-w-[220px] text-sm font-medium leading-6 text-black">{product.name}</h3>
            <p className="mt-4 text-[1.9rem] font-semibold tracking-[-0.04em] text-black">${Math.round(product.price / 16000).toLocaleString("en-US")}</p>
            <Link to={`/products/${product.slug}`} className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-[10px] bg-black text-sm font-medium text-white">Buy Now</Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function ProductDetailPage() {
  const { slug = "" } = useParams();
  const navigate = useNavigate();
  const { customer, isAuthenticated } = useAuth();
  const { addItem, isInWishlist, toggleWishlist } = useCart();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<CatalogProduct[]>([]);
  const [reviews, setReviews] = useState<ProductReview[]>([]);
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
      const related = await getCatalogProducts({ category: detail.category?.id || "", limit: 8 });
      setRelatedProducts(related.data.filter((item) => item.slug !== detail.slug).slice(0, 4));
      const apiReviews = await getProductReviewsApi(slug);
      setReviews(apiReviews);
    }

    loadData();
  }, [slug]);

  const gallery = useMemo(() => (product ? getProductGallery(product) : []), [product]);
  const specs = useMemo(() => (product ? getProductSpecs(product) : []), [product]);

  if (!product) {
    return <div className="px-4 py-16 text-center text-sm text-black/50">Loading product...</div>;
  }

  const brand = product.name.split(" ")[0];
  const categoryLabel = getDisplayCategoryName(product.category?.name, product.category?.slug);
  const wishlisted = isInWishlist(product.id, product.slug);

  return (
    <div className="bg-[#fafafa] pb-20">
      <Breadcrumb
        items={[
          { label: "Home", to: "/home" },
          { label: "Catalog", to: "/products" },
          { label: categoryLabel, to: product.category ? `/products?category=${product.category.id}` : "/products" },
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
              onDecrease={() => setQuantity((current) => Math.max(1, current - 1))}
              onIncrease={() => setQuantity((current) => current + 1)}
              onAddToCart={() => {
                if (!isAuthenticated) {
                  navigate(`/sign-in?redirect=${encodeURIComponent(`/products/${product.slug}`)}`);
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
        <ReviewSection
          reviews={reviews}
          isAuthenticated={isAuthenticated}
          customerName={customer?.name}
          onRequireSignIn={() => navigate(`/sign-in?redirect=${encodeURIComponent(`/products/${product.slug}`)}`)}
          onSubmitReview={async ({ rating, content }) => {
            const created = await createProductReview(product.slug, { rating, content });
            const nextReview: ProductReview = {
              id: created.id,
              author: created.customer?.name || "Customer",
              avatar: "/assets/images/profile-image-64.png",
              rating: created.rating,
              date: new Date(created.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }),
              content: created.content,
              photos: created.photos,
            };

            setReviews((current) => [nextReview, ...current]);
          }}
        />
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
}
