import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Breadcrumb from "@/components/layout/Breadcrumb";
import {
  getCatalogCategories,
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
  | "brand"
  | "batteryCapacity"
  | "screenType"
  | "screenDiagonal"
  | "protectionClass"
  | "builtInMemory";

function mockFilters(): CatalogProductFilters {
  return {
    brands: ["Apple", "Samsung", "Galaxy"],
    batteryCapacity: ["3000 mAh", "4000 mAh", "5000 mAh"],
    screenType: ["OLED", "AMOLED", "LCD"],
    screenDiagonal: ['6.1"', '6.7"', '7.0"'],
    protectionClass: ["IP67", "IP68"],
    builtInMemory: ["128 GB", "256 GB", "512 GB", "1 TB"],
  };
}

function getUserCategoryName(category?: CatalogCategory) {
  if (!category) return "Catalog";
  if (category.slug === "phones") return "Smartphones";
  return category.name;
}

function buildSelectedFilters(searchParams: URLSearchParams): Record<FilterKey, string[]> {
  return {
    brand: searchParams.getAll("brand"),
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
  const [filters, setFilters] = useState<CatalogProductFilters>(mockFilters());

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
        const productParams: Record<string, string | number> = {
          limit: 100,
        };

        if (activeCategory) {
          productParams.category = activeCategory;
        }

        const [categoryResponse, productResponse] = await Promise.all([
          getCatalogCategories({ limit: 20 }),
          getCatalogProducts(productParams),
        ]);

        setCategories(categoryResponse.data);
        setProducts(productResponse.data);

        // mock filters for UI
        setFilters(mockFilters());
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

    if (sort === "price_asc") {
      sorted.sort((a, b) => a.price - b.price);
    }

    if (sort === "price_desc") {
      sorted.sort((a, b) => b.price - a.price);
    }

    if (sort === "newest") {
      sorted.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    }

    return sorted;
  }, [products, search, sort]);

  const pageSize = 9;
  const totalPages = Math.max(1, Math.ceil(visibleProducts.length / pageSize));

  const pagedProducts = visibleProducts.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const activeCategoryRecord = categories.find(
    (item) => item.id === activeCategory
  );

  const activeCategoryName = getUserCategoryName(activeCategoryRecord);

  useEffect(() => {
    setPage(1);
  }, [activeCategory, search, sort]);

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

    setSearchParams(params);
  }

  return (
    <div className="bg-[#fafafa] pb-20">
      <Breadcrumb
        items={[
          { label: "Home", to: "/home" },
          { label: "Catalog", to: "/products" },
          { label: activeCategoryName },
        ]}
      />

      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 pt-10 sm:px-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:px-8">
        <FilterSidebar
          categories={categories}
          activeCategory={activeCategory}
          search={search}
          filters={filters}
          selectedFilters={selectedFilters}
          onSearch={setSearch}
          onSelectCategory={(categoryId) =>
            setSearchParams(buildParamsForCategory(categoryId))
          }
          onToggleFilter={toggleFilter}
        />

        <div className="space-y-8">
          <SortBar
            total={visibleProducts.length}
            sort={sort}
            onSortChange={setSort}
          />

          {loading ? (
            <div className="rounded-2xl border border-dashed border-black/10 px-6 py-20 text-center text-sm text-black/50">
              Loading products...
            </div>
          ) : (
            <ProductGrid products={pagedProducts} />
          )}

          <div className="flex items-center justify-center gap-3 pt-4 text-sm">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="h-9 w-9 rounded-lg hover:bg-black/5"
            >
              ‹
            </button>

            {Array.from({ length: totalPages }).slice(0, 4).map((_, index) => {
              const pageNumber = index + 1;

              return (
                <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  className={[
                    "h-9 min-w-9 rounded-lg px-3",
                    page === pageNumber
                      ? "bg-black text-white"
                      : "hover:bg-black/5",
                  ].join(" ")}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="h-9 w-9 rounded-lg hover:bg-black/5"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}