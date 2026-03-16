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
  "apple-iphone-14-pro-max-128gb-deep-purple": [
    "/assets/images/iphone-14-pro-angle-2.png",
    "/assets/images/iphone-14-front.png",
    "/assets/images/iphone-14-pro-gold.png",
    "/assets/images/iphone-14-pro-angle-1.png",
  ],
  "airpods-max-silver-starlight-aluminum": [
    "/assets/images/airpods-max-silver.png",
    "/assets/images/wireless-headphones.png",
    "/assets/images/profile-image-64.png",
  ],
  "apple-watch-series-9-gps-41mm": [
    "/assets/images/apple-watch.png",
    "/assets/images/profile-image-64.png",
    "/assets/images/profile-group-1.png",
  ],
  "macbook-air-15-inch": [
    "/assets/images/macbook-air-main.png",
    "/assets/images/macbook-air-side.png",
  ],
};

const productColorImageMap: Record<string, Record<string, string>> = {
  "airpods-max-silver-starlight-aluminum": {
    black: "/assets/images/Logo.png",
    purple: "/assets/images/Logo.png",
    red: "/assets/images/Logo.png",
    yellow: "/assets/images/Logo.png",
    silver: "/assets/images/Logo.png",
  },
};

export function getProductGallery(
  product: CatalogProduct,
  selectedColor?: string,
) {
  const mapped = productMediaMap[product.slug] || [];

  const colorKey = selectedColor?.toLowerCase();

  const colorImage =
    productColorImageMap[product.slug]?.[
      colorKey as keyof typeof productColorImageMap
    ];

  const mainImage = colorImage || product.image;

  const media = [mainImage, ...mapped.filter((img) => img !== mainImage)];

  return media;
}

export function getProductSpecs(product: CatalogProduct): ProductSpecRow[] {
  const memory = /128GB|256GB|512GB|1TB/i.exec(product.name)?.[0] || "128GB";

  if (product.category?.slug === "phones") {
    return [
      { label: "Screen diagonal", value: '6.7"' },
      { label: "The screen resolution", value: "2796x1290" },
      { label: "The screen refresh rate", value: "120 Hz" },
      { label: "The pixel density", value: "460 ppi" },
      { label: "Screen type", value: "OLED" },
      {
        label: "Additionally",
        value: `Dynamic Island, Always-On display, ${memory}`,
      },
      { label: "CPU", value: "A16 Bionic" },
      { label: "Number of cores", value: "6" },
    ];
  }

  if (product.category?.slug === "headphones") {
    return [
      { label: "Type", value: "Wireless over-ear" },
      { label: "Connection", value: "Bluetooth 5.0" },
      { label: "Noise cancelling", value: "Active" },
      { label: "Battery", value: "Up to 20 hours" },
      { label: "Charging", value: "Lightning" },
      { label: "Weight", value: "384.8 g" },
    ];
  }

  if (product.slug === "macbook-air-15-inch") {
    return [
      { label: "Screen diagonal", value: '15.3"' },
      { label: "The screen resolution", value: "2880x1864" },
      { label: "Brightness", value: "500 nits" },
      { label: "Display type", value: "Liquid Retina" },
      { label: "Chip", value: "Apple M3" },
      { label: "Memory", value: "8GB unified memory" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Battery life", value: "Up to 18 hours" },
    ];
  }

  return [
    { label: "Category", value: product.category?.name || "Catalog" },
    { label: "SKU", value: product.sku },
    {
      label: "Availability",
      value: product.stock > 0 ? "In stock" : "Out of stock",
    },
    { label: "Display status", value: product.displayStatus },
    {
      label: "Created",
      value: new Date(product.createdAt).toLocaleDateString(),
    },
  ];
}

export function getProductReviews(product: CatalogProduct): ProductReview[] {
  if (product.slug === "macbook-air-15-inch") {
    return [
      {
        id: `${product.id}-review-1`,
        author: "Grace Carey",
        avatar: "/assets/images/profile-image-41.png",
        rating: 5,
        date: "24 January, 2023",
        content:
          "The larger screen makes multitasking more comfortable, and the machine stays light enough to carry every day.",
      },
      {
        id: `${product.id}-review-2`,
        author: "Ronald Richards",
        avatar: "/assets/images/profile-group-1.png",
        rating: 4,
        date: "24 January, 2023",
        content:
          "Battery life is strong and the keyboard feels reliable for long writing sessions. Great fit for work and travel.",
      },
      {
        id: `${product.id}-review-3`,
        author: "Darcy King",
        avatar: "/assets/images/profile-image-64.png",
        rating: 4,
        date: "24 January, 2023",
        content:
          "The design is clean and premium. The display is the main highlight, especially for productivity and media.",
        photos: [
          "/assets/images/macbook-air-main.png",
          "/assets/images/macbook-air-side.png",
        ],
      },
    ];
  }

  return [
    {
      id: `${product.id}-review-1`,
      author: "Grace Carey",
      avatar: "/assets/images/profile-image-41.png",
      rating: 5,
      date: "24 January, 2023",
      content:
        "I was a bit nervous to be buying a secondhand phone, but I could not be happier with my purchase. The device looked and felt premium right away.",
    },
    {
      id: `${product.id}-review-2`,
      author: "Ronald Richards",
      avatar: "/assets/images/profile-group-1.png",
      rating: 4,
      date: "24 January, 2023",
      content:
        "This device has the storage and speed I needed. The build feels solid and the experience has been smooth across daily tasks.",
    },
    {
      id: `${product.id}-review-3`,
      author: "Darcy King",
      avatar: "/assets/images/profile-image-64.png",
      rating: 4,
      date: "24 January, 2023",
      content:
        "The overall experience is strong. The finish and screen quality stand out, and the package feels well put together.",
      photos: [
        "/assets/images/iphone-14-front.png",
        "/assets/images/iphone-14-pro-angle-3.png",
      ],
    },
  ];
}
