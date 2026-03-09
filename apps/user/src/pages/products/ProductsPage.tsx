import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductCard } from "@/components/cards/ProductCard";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { getCatalogCategories, getCatalogProducts } from "@/features/catalog/catalog.service";
import type { CatalogCategory, CatalogProduct } from "@/features/catalog/catalog.types";

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const [categories, setCategories] = useState<CatalogCategory[]>([]);
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const activeCategory = searchParams.get("category") || "";

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      try {
        const [categoryResponse, productResponse] = await Promise.all([
          getCatalogCategories({ limit: 20 }),
          getCatalogProducts(activeCategory ? { category: activeCategory, limit: 100 } : { limit: 100 }),
        ]);
        setCategories(categoryResponse.data);
        setProducts(productResponse.data);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12">
      <div className="mx-auto max-w-[1400px] space-y-10 px-4 lg:px-6">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">CyberShop Store</p>
          <h1 className="mt-2 text-4xl font-semibold text-slate-900">Products</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        {loading ? (
          <div className="rounded-3xl border border-dashed border-slate-200 px-6 py-16 text-center text-sm text-slate-500">
            Loading products...
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
