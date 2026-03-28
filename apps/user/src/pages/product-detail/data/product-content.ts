import type { CatalogProduct } from "@/features/catalog/catalog.types";

export type ProductSpecRow = {
  label: string;
  value: string;
};

export type ProductReview = {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  content: string;
  photos?: string[];
};

const productMediaMap: Record<string, string[]> = {
  "iphone-17-pro-max": [
    "/assets/images/iphone-17-promax.png",
  ],
  "macbook-pro-14-inch": [
    "/assets/images/macbook-pro-14-inch.png",
  ],
  "apple-vision-pro": [
    "/assets/images/apple-vision-pro.png",
  ],
};

function getPhoneChip(name: string) {
  if (/iPhone 17 Pro/i.test(name)) return "A19 Pro";
  if (/iPhone 17/i.test(name)) return "A19";
  if (/iPhone 16/i.test(name)) return "A18";
  return "Apple Silicon";
}

function getPhoneRefreshRate(name: string) {
  return /Pro/i.test(name) ? "120 Hz" : "60 Hz";
}

function getPhoneResolution(screenDiagonal: string, name: string) {
  if (/6\.9|6\.7/i.test(screenDiagonal)) {
    return /Pro/i.test(name) ? "2868x1320" : "2796x1290";
  }

  if (/6\.3/i.test(screenDiagonal)) {
    return /Pro/i.test(name) ? "2622x1206" : "2556x1179";
  }

  return "2532x1170";
}

export function getProductGallery(product: CatalogProduct) {
  const mapped = productMediaMap[product.slug] || [];
  const media = [product.image, ...mapped, ...product.images.map((item) => item.url)].filter(Boolean);
  return [...new Set(media)];
}

export function getProductSpecs(product: CatalogProduct): ProductSpecRow[] {
  if (product.category?.slug === "iphone") {
    return [
      { label: "Screen diagonal", value: product.screenDiagonal || "6.1-inch" },
      { label: "Resolution", value: getPhoneResolution(product.screenDiagonal, product.name) },
      { label: "Refresh rate", value: getPhoneRefreshRate(product.name) },
      { label: "Display type", value: product.screenType || "Super Retina XDR" },
      { label: "Chip", value: getPhoneChip(product.name) },
      { label: "Storage", value: product.builtInMemory || "128GB" },
      { label: "Protection", value: product.protectionClass || "IP68" },
      { label: "Battery", value: product.batteryCapacity || "All-day battery life" },
    ];
  }

  if (product.category?.slug === "airpods") {
    if (/Max/i.test(product.name)) {
      return [
        { label: "Type", value: "Wireless over-ear" },
        { label: "Connection", value: "Bluetooth 5.3" },
        { label: "Noise control", value: "Active Noise Cancellation" },
        { label: "Battery", value: product.batteryCapacity || "Up to 20 hours" },
        { label: "Charging", value: "USB-C" },
        { label: "Build", value: "Aluminum ear cups" },
      ];
    }

    return [
      { label: "Type", value: /Pro|Active Noise Cancellation/i.test(product.name) ? "Wireless in-ear with ANC" : "Wireless open-ear" },
      { label: "Connection", value: "Bluetooth 5.3" },
      { label: "Battery", value: product.batteryCapacity || "Up to 30 hours" },
      { label: "Protection", value: product.protectionClass || "IP54" },
      { label: "Case", value: "USB-C charging case" },
      { label: "Listening mode", value: /Pro|Active Noise Cancellation/i.test(product.name) ? "ANC + Transparency" : "Adaptive EQ" },
    ];
  }

  if (product.category?.slug === "apple-watch") {
    return [
      { label: "Case size", value: product.screenDiagonal || "42mm" },
      { label: "Display", value: product.screenType || "Retina LTPO OLED" },
      { label: "Storage", value: product.builtInMemory || "64GB" },
      { label: "Battery", value: product.batteryCapacity || "Up to 18 hours" },
      { label: "Protection", value: product.protectionClass || "50m water resistant" },
      { label: "Use case", value: /Ultra/i.test(product.name) ? "Outdoor and training" : "Health and everyday connectivity" },
    ];
  }

  if (product.category?.slug === "mac") {
    return [
      { label: "Display", value: product.screenType || "Retina-class display" },
      { label: "Screen size", value: product.screenDiagonal || "Desktop / notebook" },
      { label: "Storage", value: product.builtInMemory || "256GB" },
      { label: "Battery", value: product.batteryCapacity || "Desktop powered" },
      { label: "Positioning", value: /Pro|Studio/i.test(product.name) ? "Professional workflow" : "Everyday workstation" },
      { label: "Form factor", value: /Book/i.test(product.name) ? "Notebook" : "Desktop" },
    ];
  }

  if (product.category?.slug === "ipad") {
    return [
      { label: "Display", value: product.screenType || "Liquid Retina" },
      { label: "Screen size", value: product.screenDiagonal || "11-inch" },
      { label: "Storage", value: product.builtInMemory || "128GB" },
      { label: "Battery", value: product.batteryCapacity || "Up to 10 hours" },
      { label: "Use case", value: /Pro/i.test(product.name) ? "Drawing, editing, studio work" : "Notes, study, and media" },
      { label: "Accessory support", value: "Apple Pencil and keyboard accessories" },
    ];
  }

  if (product.category?.slug === "apple-vision-pro") {
    return [
      { label: "Display", value: product.screenType || "Micro-OLED" },
      { label: "Configuration", value: product.screenDiagonal || "Dual displays" },
      { label: "Storage", value: product.builtInMemory || "256GB" },
      { label: "Battery", value: product.batteryCapacity || "Up to 2 hours" },
      { label: "Platform", value: "Spatial computing" },
      { label: "Use case", value: "Immersive apps, cinema, and virtual workspaces" },
    ];
  }

  return [
    { label: "Category", value: product.category?.name || "Catalog" },
    { label: "SKU", value: product.sku },
    { label: "Availability", value: product.stock > 0 ? "In stock" : "Out of stock" },
    { label: "Created", value: new Date(product.createdAt).toLocaleDateString() },
  ];
}

export function getProductReviews(product: CatalogProduct): ProductReview[] {
  const gallery = getProductGallery(product);
  const reviewPhotos = gallery.slice(0, 2);

  return [
    {
      id: `${product.id}-review-1`,
      author: "Minh Anh",
      avatar: "/assets/images/profile-image-41.png",
      rating: 5,
      date: "24 March, 2026",
      content:
        "The product detail page reads much more clearly now. The device feels like the focus instead of the interface chrome.",
    },
    {
      id: `${product.id}-review-2`,
      author: "Bao Chau",
      avatar: "/assets/images/profile-group-1.png",
      rating: 4,
      date: "24 March, 2026",
      content:
        "Specs, finishes, and pricing are much easier to compare. It feels closer to a premium Apple-style retail presentation.",
    },
    {
      id: `${product.id}-review-3`,
      author: "Quoc Viet",
      avatar: "/assets/images/profile-image-64.png",
      rating: 4,
      date: "24 March, 2026",
      content:
        "The darker surfaces let the hardware materials stand out. The overall experience feels calmer and more intentional.",
      photos: reviewPhotos,
    },
  ];
}
