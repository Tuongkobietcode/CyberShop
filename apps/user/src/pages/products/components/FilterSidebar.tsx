import { useState, useMemo } from "react";
import FilterSidebar from "./FilterSidebar";
import type {
  CatalogCategory,
  CatalogProduct,
  CatalogProductFilters
} from "@/features/catalog/catalog.types";

type FilterKey =
  | "brand"
  | "batteryCapacity"
  | "screenType"
  | "screenDiagonal"
  | "protectionClass"
  | "builtInMemory";

/* ---------------- utils ---------------- */

function extractFilters(products: CatalogProduct[]): CatalogProductFilters {
  return {
    brands: [...new Set(products.map((p) => p.brand))].sort(),
    batteryCapacity: [...new Set(products.map((p) => p.batteryCapacity))].sort(),
    screenType: [...new Set(products.map((p) => p.screenType))].sort(),
    screenDiagonal: [...new Set(products.map((p) => p.screenDiagonal))].sort(),
    protectionClass: [...new Set(products.map((p) => p.protectionClass))].sort(),
    builtInMemory: [...new Set(products.map((p) => p.builtInMemory))].sort(),
  };
}

/* ---------------- mock data ---------------- */

const categories: CatalogCategory[] = [
  {
    id: "smartphone",
    name: "Smartphone",
    slug: "smartphone",
    image: "",
    description: "",
  },
  {
    id: "laptop",
    name: "Laptop",
    slug: "laptop",
    image: "",
    description: "",
  },
];

const products: CatalogProduct[] = [
  {
    id: "1",
    name: "iPhone 15",
    slug: "iphone-15",
    sku: "IP15",
    description: "",
    price: 999,
    compareAtPrice: null,
    stock: 10,
    featured: false,
    brand: "Apple",
    batteryCapacity: "3200 mAh",
    screenType: "OLED",
    screenDiagonal: "6.1",
    protectionClass: "IP68",
    builtInMemory: "128 GB",
    status: "active",
    displayStatus: "available",
    image: "",
    images: [],
    category: {
      id: "smartphone",
      name: "Smartphone",
      slug: "smartphone",
    },
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "2",
    name: "Galaxy S24",
    slug: "galaxy-s24",
    sku: "S24",
    description: "",
    price: 899,
    compareAtPrice: null,
    stock: 10,
    featured: false,
    brand: "Samsung",
    batteryCapacity: "4000 mAh",
    screenType: "AMOLED",
    screenDiagonal: "6.2",
    protectionClass: "IP68",
    builtInMemory: "256 GB",
    status: "active",
    displayStatus: "available",
    image: "",
    images: [],
    category: {
      id: "smartphone",
      name: "Smartphone",
      slug: "smartphone",
    },
    createdAt: "",
    updatedAt: "",
  },
];

/* ---------------- page ---------------- */

export default function CatalogPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("");

  const [selectedFilters, setSelectedFilters] = useState<Record<FilterKey, string[]>>({
    brand: [],
    batteryCapacity: [],
    screenType: [],
    screenDiagonal: [],
    protectionClass: [],
    builtInMemory: [],
  });

  const filters = useMemo(() => extractFilters(products), []);

  function handleToggleFilter(key: FilterKey, value: string) {
    setSelectedFilters((prev) => {
      const exists = prev[key].includes(value);

      return {
        ...prev,
        [key]: exists
          ? prev[key].filter((v) => v !== value)
          : [...prev[key], value],
      };
    });
  }

  const filteredProducts = products.filter((p) => {
    if (activeCategory && p.category?.id !== activeCategory) return false;

    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;

    if (selectedFilters.brand.length && !selectedFilters.brand.includes(p.brand)) return false;

    if (
      selectedFilters.batteryCapacity.length &&
      !selectedFilters.batteryCapacity.includes(p.batteryCapacity)
    )
      return false;

    if (selectedFilters.screenType.length && !selectedFilters.screenType.includes(p.screenType))
      return false;

    if (
      selectedFilters.screenDiagonal.length &&
      !selectedFilters.screenDiagonal.includes(p.screenDiagonal)
    )
      return false;

    if (
      selectedFilters.protectionClass.length &&
      !selectedFilters.protectionClass.includes(p.protectionClass)
    )
      return false;

    if (
      selectedFilters.builtInMemory.length &&
      !selectedFilters.builtInMemory.includes(p.builtInMemory)
    )
      return false;

    return true;
  });

  return (
    <div className="flex gap-10 p-10">
      <div className="w-[300px]">
        <FilterSidebar
          categories={categories}
          activeCategory={activeCategory}
          search={search}
          filters={filters}
          selectedFilters={selectedFilters}
          onSearch={setSearch}
          onSelectCategory={setActiveCategory}
          onToggleFilter={handleToggleFilter}
        />
      </div>

      <div className="flex-1 grid grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border p-4 rounded">
            <h3 className="font-semibold">{product.name}</h3>
            <p>{product.brand}</p>
            <p>{product.price}$</p>
          </div>
        ))}
      </div>
    </div>
  );
}