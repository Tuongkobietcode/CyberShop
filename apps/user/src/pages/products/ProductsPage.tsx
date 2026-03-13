import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { getCatalogCategories, getCatalogProducts } from "@/features/catalog/catalog.service";
import type { CatalogCategory, CatalogProduct } from "@/features/catalog/catalog.types";
import FilterSidebar from "./components/FilterSidebar";
import ProductGrid from "./components/ProductGrid";
import SortBar from "./components/SortBar";

type SortOption = "rating" | "price_asc" | "price_desc" | "newest";

function getUserCategoryName(category?: CatalogCategory) {
  if (!category) return "Catalog";
  if (category.slug === "phones") return "Smartphones";
  return category.name;
}

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState<CatalogCategory[]>([]);
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(() => searchParams.get("search") || "");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortOption>("rating");

  const activeCategory = searchParams.get("category") || "";

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

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

  const visibleProducts = useMemo(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );

    const sorted = [...filtered];
    if (sort === "price_asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price_desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "newest") {
      sorted.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    }

    return sorted;
  }, [products, search, sort]);

  const pageSize = 9;
  const totalPages = Math.max(1, Math.ceil(visibleProducts.length / pageSize));
  const pagedProducts = visibleProducts.slice((page - 1) * pageSize, page * pageSize);
  const activeCategoryRecord = categories.find((item) => item.id === activeCategory);
  const activeCategoryName = getUserCategoryName(activeCategoryRecord);

  useEffect(() => {
    setPage(1);
  }, [activeCategory, search, sort]);

  return (
    <div className="bg-[#fafafa] pb-20">
      <Breadcrumb
        items={[
          { label: "Home", to: "/home" },
          { label: "Catalog", to: "/products" },
          { label: activeCategoryName },
        ]}
      />

      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 pt-10 sm:px-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:px-8">
        <FilterSidebar
          categories={categories}
          activeCategory={activeCategory}
          search={search}
          onSearch={setSearch}
          onSelectCategory={(categoryId) => {
            const params = new URLSearchParams();
            if (categoryId) {
              params.set("category", categoryId);
            }
            if (search.trim()) {
              params.set("search", search.trim());
            }
            setSearchParams(params);
          }}
        />

        <div className="space-y-8">
          <SortBar total={visibleProducts.length} sort={sort} onSortChange={setSort} />

          {loading ? (
            <div className="rounded-2xl border border-dashed border-black/10 px-6 py-20 text-center text-sm text-black/50">
              Loading products...
            </div>
          ) : (
            <ProductGrid products={pagedProducts} />
          )}

          <div className="flex items-center justify-center gap-3 pt-4 text-sm">
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              className="h-9 w-9 rounded-lg text-black/70 transition hover:bg-black/5"
            >
              ‹
            </button>
            {Array.from({ length: totalPages }).slice(0, 4).map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => setPage(pageNumber)}
                  className={[
                    "h-9 min-w-9 rounded-lg px-3",
                    page === pageNumber ? "bg-black text-white" : "text-black/70 hover:bg-black/5",
                  ].join(" ")}
                >
                  {pageNumber}
                </button>
              );
            })}
            {totalPages > 4 ? <span className="px-1 text-black/40">....</span> : null}
            {totalPages > 4 ? (
              <button
                type="button"
                onClick={() => setPage(totalPages)}
                className={[
                  "h-9 min-w-9 rounded-lg px-3",
                  page === totalPages ? "bg-black text-white" : "text-black/70 hover:bg-black/5",
                ].join(" ")}
              >
                {totalPages}
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
              className="h-9 w-9 rounded-lg text-black/70 transition hover:bg-black/5"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
