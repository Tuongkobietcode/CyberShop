import type {
  CatalogCategory,
  CatalogProduct,
  CatalogProductFilters,
} from "./catalog.types";

const now = "2026-03-23T00:00:00.000Z";

export const fallbackCategories: CatalogCategory[] = [
  {
    id: "phones",
    name: "Phones",
    slug: "phones",
    image: "/assets/images/iphone-14-front.png",
    description: "Flagship and foldable phones for daily performance.",
  },
  {
    id: "smart-watches",
    name: "Smart Watches",
    slug: "smart-watches",
    image: "/assets/images/apple-watch.png",
    description: "Wearables focused on health, fitness, and notifications.",
  },
  {
    id: "cameras",
    name: "Cameras",
    slug: "cameras",
    image: "/assets/images/apple-vision-pro.png",
    description: "Imaging devices and immersive capture hardware.",
  },
  {
    id: "headphones",
    name: "Headphones",
    slug: "headphones",
    image: "/assets/images/wireless-headphones.png",
    description: "Wireless and premium listening gear.",
  },
  {
    id: "computers",
    name: "Computers",
    slug: "computers",
    image: "/assets/images/macbook-air-main.png",
    description: "Portable and desktop computers for work and study.",
  },
  {
    id: "gaming",
    name: "Gaming",
    slug: "gaming",
    image: "/assets/images/playstation-5.png",
    description: "Consoles and gaming hardware.",
  },
];

const categoryMap = Object.fromEntries(
  fallbackCategories.map((category) => [category.slug, category])
);

function categoryRef(slug: string) {
  const category = categoryMap[slug];

  return category
    ? {
        id: category.id,
        name: category.name,
        slug: category.slug,
      }
    : null;
}

export const fallbackProducts: CatalogProduct[] = [
  {
    id: "iphone-14-pro",
    name: "iPhone 14 Pro",
    slug: "iphone-14-pro",
    sku: "APL-IP14PRO-128",
    description: "Apple flagship with ProMotion display and refined cameras.",
    price: 30990000,
    compareAtPrice: 33990000,
    stock: 12,
    featured: true,
    brand: "Apple",
    batteryCapacity: "3200mAh",
    screenType: "OLED",
    screenDiagonal: "6.1\"",
    protectionClass: "IP68",
    builtInMemory: "128GB",
    status: "active",
    displayStatus: "featured",
    image: "/assets/images/iphone-14-pro-main.png",
    images: [
      { url: "/assets/images/iphone-14-pro-main.png", alt: "iPhone 14 Pro front", sortOrder: 0 },
      { url: "/assets/images/iphone-14-pro-angle-1.png", alt: "iPhone 14 Pro angle", sortOrder: 1 },
      { url: "/assets/images/iphone-14-pro-angle-2.png", alt: "iPhone 14 Pro angle", sortOrder: 2 },
    ],
    category: categoryRef("phones"),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "iphone-14",
    name: "iPhone 14",
    slug: "iphone-14",
    sku: "APL-IP14-128",
    description: "Balanced everyday iPhone with strong battery life and clean cameras.",
    price: 21990000,
    compareAtPrice: 23990000,
    stock: 18,
    featured: false,
    brand: "Apple",
    batteryCapacity: "3279mAh",
    screenType: "OLED",
    screenDiagonal: "6.1\"",
    protectionClass: "IP68",
    builtInMemory: "128GB",
    status: "active",
    displayStatus: "sale",
    image: "/assets/images/iphone-14-front.png",
    images: [
      { url: "/assets/images/iphone-14-front.png", alt: "iPhone 14 front", sortOrder: 0 },
      { url: "/assets/images/iphone-14-pro-angle-3.png", alt: "iPhone angle", sortOrder: 1 },
    ],
    category: categoryRef("phones"),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "galaxy-z-fold-5",
    name: "Galaxy Z Fold 5",
    slug: "galaxy-z-fold-5",
    sku: "SMS-ZFOLD5-256",
    description: "Samsung foldable with a cinematic inner display and multitasking focus.",
    price: 35990000,
    compareAtPrice: null,
    stock: 6,
    featured: true,
    brand: "Samsung",
    batteryCapacity: "4400mAh",
    screenType: "Dynamic AMOLED",
    screenDiagonal: "7.6\"",
    protectionClass: "IPX8",
    builtInMemory: "256GB",
    status: "active",
    displayStatus: "featured",
    image: "/assets/images/galaxy-z-fold-5.png",
    images: [
      { url: "/assets/images/galaxy-z-fold-5.png", alt: "Galaxy Z Fold 5", sortOrder: 0 },
    ],
    category: categoryRef("phones"),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "apple-watch-series",
    name: "Apple Watch Series",
    slug: "apple-watch-series",
    sku: "APL-WATCH-SRS",
    description: "A modern smartwatch focused on health tracking and everyday connectivity.",
    price: 10990000,
    compareAtPrice: null,
    stock: 14,
    featured: false,
    brand: "Apple",
    batteryCapacity: "308mAh",
    screenType: "Retina OLED",
    screenDiagonal: "1.9\"",
    protectionClass: "WR50",
    builtInMemory: "32GB",
    status: "active",
    displayStatus: "normal",
    image: "/assets/images/apple-watch.png",
    images: [{ url: "/assets/images/apple-watch.png", alt: "Apple Watch", sortOrder: 0 }],
    category: categoryRef("smart-watches"),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "airpods-max",
    name: "AirPods Max",
    slug: "airpods-max",
    sku: "APL-AIRMAX-SLV",
    description: "Premium over-ear headphones with spatial audio and rich detail.",
    price: 12990000,
    compareAtPrice: 14990000,
    stock: 9,
    featured: false,
    brand: "Apple",
    batteryCapacity: "20h",
    screenType: "N/A",
    screenDiagonal: "N/A",
    protectionClass: "N/A",
    builtInMemory: "N/A",
    status: "active",
    displayStatus: "sale",
    image: "/assets/images/airpods-max-silver.png",
    images: [
      { url: "/assets/images/airpods-max-silver.png", alt: "AirPods Max", sortOrder: 0 },
      { url: "/assets/images/wireless-headphones.png", alt: "Headphones", sortOrder: 1 },
    ],
    category: categoryRef("headphones"),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "macbook-air-15-inch",
    name: "MacBook Air 15-inch",
    slug: "macbook-air-15-inch",
    sku: "APL-MBA15-256",
    description: "Thin and light laptop with a spacious display and all-day battery.",
    price: 32990000,
    compareAtPrice: 35990000,
    stock: 7,
    featured: true,
    brand: "Apple",
    batteryCapacity: "18h",
    screenType: "Liquid Retina",
    screenDiagonal: "15.3\"",
    protectionClass: "N/A",
    builtInMemory: "256GB",
    status: "active",
    displayStatus: "featured",
    image: "/assets/images/macbook-air-main.png",
    images: [
      { url: "/assets/images/macbook-air-main.png", alt: "MacBook Air front", sortOrder: 0 },
      { url: "/assets/images/macbook-air-side.png", alt: "MacBook Air side", sortOrder: 1 },
    ],
    category: categoryRef("computers"),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "ipad-10-9-wifi",
    name: "iPad 10.9 Wi-Fi",
    slug: "ipad-10-9-wifi",
    sku: "APL-IPAD109-64",
    description: "Portable tablet for note taking, browsing, and light creative work.",
    price: 12990000,
    compareAtPrice: null,
    stock: 16,
    featured: false,
    brand: "Apple",
    batteryCapacity: "7606mAh",
    screenType: "Liquid Retina",
    screenDiagonal: "10.9\"",
    protectionClass: "N/A",
    builtInMemory: "64GB",
    status: "active",
    displayStatus: "normal",
    image: "/assets/images/ipad-10-9-wifi.png",
    images: [{ url: "/assets/images/ipad-10-9-wifi.png", alt: "iPad", sortOrder: 0 }],
    category: categoryRef("computers"),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "playstation-5",
    name: "PlayStation 5",
    slug: "playstation-5",
    sku: "SNY-PS5-STD",
    description: "High-performance console for immersive modern gaming.",
    price: 15990000,
    compareAtPrice: null,
    stock: 0,
    featured: true,
    brand: "Sony",
    batteryCapacity: "N/A",
    screenType: "N/A",
    screenDiagonal: "N/A",
    protectionClass: "N/A",
    builtInMemory: "825GB",
    status: "out_of_stock",
    displayStatus: "out_of_stock",
    image: "/assets/images/playstation-5.png",
    images: [{ url: "/assets/images/playstation-5.png", alt: "PlayStation 5", sortOrder: 0 }],
    category: categoryRef("gaming"),
    createdAt: now,
    updatedAt: now,
  },
];

function parseValues(value?: string | number | boolean | Array<string | number | boolean>) {
  if (Array.isArray(value)) {
    return value.map(String).filter(Boolean);
  }

  if (value === undefined || value === null || value === "") {
    return [];
  }

  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function getFallbackCategories(limit?: number) {
  return typeof limit === "number" ? fallbackCategories.slice(0, limit) : fallbackCategories;
}

export function getFallbackProducts(
  params?: Record<string, string | number | boolean | Array<string | number | boolean>>
) {
  const category = String(params?.category || "").trim();
  const search = String(params?.search || "").trim().toLowerCase();
  const featured = params?.featured;
  const brandValues = parseValues(params?.brand);
  const batteryCapacityValues = parseValues(params?.batteryCapacity);
  const screenTypeValues = parseValues(params?.screenType);
  const screenDiagonalValues = parseValues(params?.screenDiagonal);
  const protectionClassValues = parseValues(params?.protectionClass);
  const builtInMemoryValues = parseValues(params?.builtInMemory);
  const limit = Number(params?.limit || 0);

  let items = [...fallbackProducts];

  if (category) {
    items = items.filter(
      (item) => item.category?.id === category || item.category?.slug === category
    );
  }

  if (search) {
    items = items.filter((item) =>
      [item.name, item.slug, item.sku].some((field) =>
        field.toLowerCase().includes(search)
      )
    );
  }

  if (featured !== undefined) {
    const featuredValue = String(featured) === "true";
    items = items.filter((item) => item.featured === featuredValue);
  }

  if (brandValues.length) {
    items = items.filter((item) => brandValues.includes(item.brand));
  }

  if (batteryCapacityValues.length) {
    items = items.filter((item) => batteryCapacityValues.includes(item.batteryCapacity));
  }

  if (screenTypeValues.length) {
    items = items.filter((item) => screenTypeValues.includes(item.screenType));
  }

  if (screenDiagonalValues.length) {
    items = items.filter((item) => screenDiagonalValues.includes(item.screenDiagonal));
  }

  if (protectionClassValues.length) {
    items = items.filter((item) => protectionClassValues.includes(item.protectionClass));
  }

  if (builtInMemoryValues.length) {
    items = items.filter((item) => builtInMemoryValues.includes(item.builtInMemory));
  }

  return limit > 0 ? items.slice(0, limit) : items;
}

function uniqueValues(items: CatalogProduct[], key: keyof CatalogProduct) {
  return [...new Set(items.map((item) => String(item[key] || "").trim()).filter(Boolean))].sort(
    (a, b) => a.localeCompare(b)
  );
}

export function getFallbackProductFilters(
  params?: Record<string, string | number | boolean | Array<string | number | boolean>>
): CatalogProductFilters {
  const items = getFallbackProducts(params);

  return {
    brands: uniqueValues(items, "brand"),
    batteryCapacity: uniqueValues(items, "batteryCapacity"),
    screenType: uniqueValues(items, "screenType"),
    screenDiagonal: uniqueValues(items, "screenDiagonal"),
    protectionClass: uniqueValues(items, "protectionClass"),
    builtInMemory: uniqueValues(items, "builtInMemory"),
  };
}

export function getFallbackProductDetail(slug: string) {
  return fallbackProducts.find((item) => item.slug === slug) || null;
}
