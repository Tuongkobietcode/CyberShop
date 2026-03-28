import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Breadcrumb from "@/components/layout/Breadcrumb";
import {
  getCatalogCategories,
  getCatalogProductFilters,
  getCatalogProducts,
} from "@/features/catalog/catalog.service";
import type {
  CatalogCategory,
  CatalogProduct,
  CatalogProductFilters,
} from "@/features/catalog/catalog.types";
import FilterSidebar from "./components/FilterSidebar";
import ProductGrid from "./components/ProductGrid";
import SortBar from "./components/SortBar";

type SortOption = "rating" | "price_asc" | "price_desc" | "newest";
type FilterKey =
  | "batteryCapacity"
  | "screenType"
  | "screenDiagonal"
  | "protectionClass"
  | "builtInMemory";

const filterKeys: FilterKey[] = [
  "batteryCapacity",
  "screenType",
  "screenDiagonal",
  "protectionClass",
  "builtInMemory",
];

function emptyFilters(): CatalogProductFilters {
  return {
    batteryCapacity: [],
    screenType: [],
    screenDiagonal: [],
    protectionClass: [],
    builtInMemory: [],
  };
}

function getUserCategoryName(category?: CatalogCategory) {
  if (!category) return "Catalog";
  return category.name;
}

function buildSelectedFilters(searchParams: URLSearchParams): Record<FilterKey, string[]> {
  return {
    batteryCapacity: searchParams.getAll("batteryCapacity"),
    screenType: searchParams.getAll("screenType"),
    screenDiagonal: searchParams.getAll("screenDiagonal"),
    protectionClass: searchParams.getAll("protectionClass"),
    builtInMemory: searchParams.getAll("builtInMemory"),
  };
}

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState<CatalogCategory[]>([]);
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [filters, setFilters] = useState<CatalogProductFilters>(emptyFilters());
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(() => searchParams.get("search") || "");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortOption>("rating");

  const activeCategory = searchParams.get("category") || "";
  const selectedFilters = useMemo(() => buildSelectedFilters(searchParams), [searchParams]);

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const productParams: Record<string, string | number | boolean | string[]> = { limit: 100 };
        if (activeCategory) {
          productParams.category = activeCategory;
        }

        filterKeys.forEach((key) => {
          if (selectedFilters[key].length) {
            productParams[key] = selectedFilters[key];
          }
        });

        const [categoryResponse, filterResponse, productResponse] = await Promise.all([
          getCatalogCategories({ limit: 20 }),
          getCatalogProductFilters(activeCategory ? { category: activeCategory } : undefined),
          getCatalogProducts(productParams),
        ]);

        setCategories(categoryResponse.data);
        setFilters(filterResponse.data);
        setProducts(productResponse.data);
      } finally {
        setLoading(false);
      }
    }

    void loadData();
  }, [activeCategory, selectedFilters]);

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
  const activeCategoryRecord = categories.find(
    (item) => item.id === activeCategory || item.slug === activeCategory
  );
  const activeCategoryName = getUserCategoryName(activeCategoryRecord);

  useEffect(() => {
    setPage(1);
  }, [activeCategory, search, sort, selectedFilters]);

  function buildParamsForCategory(categoryId: string) {
    const params = new URLSearchParams();
    if (categoryId) {
      params.set("category", categoryId);
    }
    if (search.trim()) {
      params.set("search", search.trim());
    }
    return params;
  }

  function toggleFilter(key: FilterKey, value: string) {
    const params = new URLSearchParams(searchParams);
    const currentValues = params.getAll(key);
    params.delete(key);

    const nextValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];

    nextValues.forEach((item) => params.append(key, item));

    if (search.trim()) {
      params.set("search", search.trim());
    } else {
      params.delete("search");
    }

    setSearchParams(params);
  }

  function clearCatalogFilters() {
    setSearch("");
    setSearchParams(new URLSearchParams());
  }

  return (
    <div className="bg-transparent pb-20">
      <Breadcrumb
        items={
          activeCategory
            ? [
                { label: "Home", to: "/home" },
                { label: "Catalog", to: "/products" },
                { label: activeCategoryName },
              ]
            : [{ label: "Home", to: "/home" }, { label: "Catalog" }]
        }
      />

      <div className="cy-shell grid gap-10 pt-10 lg:grid-cols-[320px_minmax(0,1fr)]">
        <FilterSidebar
          categories={categories}
          activeCategory={activeCategory}
          search={search}
          filters={filters}
          selectedFilters={selectedFilters}
          onSearch={setSearch}
          onSelectCategory={(categoryId) => {
            setSearchParams(buildParamsForCategory(categoryId));
          }}
          onToggleFilter={toggleFilter}
        />

        <div className="space-y-8">
          <SortBar total={visibleProducts.length} sort={sort} onSortChange={setSort} />

          {loading ? (
            <div className="rounded-[28px] border border-dashed border-white/12 bg-white/[0.02] px-6 py-20 text-center text-sm text-white/44">
              Loading products...
            </div>
          ) : !visibleProducts.length ? (
            <div className="rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,rgba(15,19,25,0.9),rgba(9,12,17,0.86))] px-6 py-16 text-center shadow-[0_24px_70px_rgba(0,0,0,0.22)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/34">
                Catalog state
              </p>
              <h3 className="mt-4 text-[1.9rem] font-semibold tracking-[-0.05em] text-white">
                No products match the current view.
              </h3>
              <p className="mx-auto mt-4 max-w-[42ch] text-sm leading-7 text-white/52 sm:text-base">
                This usually means the active category, search query, or selected
                filters narrowed the catalog down to zero results.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <button type="button" onClick={clearCatalogFilters} className="cy-btn-primary">
                  Reset catalog
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setPage(1);
                  }}
                  className="cy-btn-secondary"
                >
                  Clear search only
                </button>
              </div>
            </div>
          ) : (
            <ProductGrid products={pagedProducts} />
          )}

          <div className="flex items-center justify-center gap-3 pt-4 text-sm text-white/54">
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              className="h-10 w-10 rounded-xl border border-white/8 bg-white/[0.03] transition hover:border-white/16 hover:bg-white/[0.06]"
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
                    "h-10 min-w-10 rounded-xl px-3",
                    page === pageNumber
                      ? "bg-[var(--accent)] text-slate-950"
                      : "border border-white/8 bg-white/[0.03] text-white/54 hover:border-white/16 hover:bg-white/[0.06]",
                  ].join(" ")}
                >
                  {pageNumber}
                </button>
              );
            })}
            {totalPages > 4 ? <span className="px-1 text-white/28">....</span> : null}
            {totalPages > 4 ? (
              <button
                type="button"
                onClick={() => setPage(totalPages)}
                className={[
                  "h-10 min-w-10 rounded-xl px-3",
                  page === totalPages
                    ? "bg-[var(--accent)] text-slate-950"
                    : "border border-white/8 bg-white/[0.03] text-white/54 hover:border-white/16 hover:bg-white/[0.06]",
                ].join(" ")}
              >
                {totalPages}
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
              className="h-10 w-10 rounded-xl border border-white/8 bg-white/[0.03] transition hover:border-white/16 hover:bg-white/[0.06]"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
