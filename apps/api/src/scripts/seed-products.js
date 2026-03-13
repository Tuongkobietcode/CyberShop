import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDatabase } from "../config/db.js";
import { Category } from "../modules/categories/category.model.js";
import { Product } from "../modules/products/product.model.js";

dotenv.config();

const products = [
  {
    name: "Apple iPhone 14 Pro Max 128GB Deep Purple",
    slug: "apple-iphone-14-pro-max-128gb-deep-purple",
    sku: "PHN-IP14PM-128",
    description: "Premium iPhone with cinematic camera and dynamic island.",
    price: 22990000,
    compareAtPrice: 24990000,
    stock: 11,
    status: "active",
    featured: true,
    brand: "Apple",
    batteryCapacity: "4323 mAh",
    screenType: "OLED",
    screenDiagonal: "6.7\"",
    protectionClass: "IP68",
    builtInMemory: "128GB",
    categorySlug: "phones",
    images: [
      {
        url: "/assets/images/iphone-14-pro-angle-2.png",
        alt: "Apple iPhone 14 Pro Max",
        sortOrder: 0,
      },
    ],
  },
  {
    name: "Blackmagic Pocket Cinema Camera 6K",
    slug: "blackmagic-pocket-cinema-camera-6k",
    sku: "CAM-BMPCC-6K",
    description: "Compact cinema camera with premium recording quality.",
    price: 25350000,
    compareAtPrice: null,
    stock: 4,
    status: "active",
    featured: true,
    brand: "Blackmagic",
    batteryCapacity: "",
    screenType: "LCD",
    screenDiagonal: "5\"",
    protectionClass: "",
    builtInMemory: "CFast 2.0 / SD",
    categorySlug: "cameras",
    images: [
      {
        url: "/assets/images/profile-image-41.png",
        alt: "Blackmagic Pocket Cinema Camera 6K",
        sortOrder: 0,
      },
    ],
  },
  {
    name: "Apple Watch Series 9 GPS 41mm",
    slug: "apple-watch-series-9-gps-41mm",
    sku: "WAT-AW9-41",
    description: "Advanced health tracking and a bright always-on display.",
    price: 3990000,
    compareAtPrice: 4590000,
    stock: 14,
    status: "active",
    featured: false,
    brand: "Apple",
    batteryCapacity: "308 mAh",
    screenType: "OLED",
    screenDiagonal: "41mm",
    protectionClass: "50m water resistant",
    builtInMemory: "64GB",
    categorySlug: "smart-watches",
    images: [
      {
        url: "/assets/images/apple-watch.png",
        alt: "Apple Watch Series 9",
        sortOrder: 0,
      },
    ],
  },
  {
    name: "AirPods Max Silver Starlight Aluminum",
    slug: "airpods-max-silver-starlight-aluminum",
    sku: "AUD-APMAX-SL",
    description: "Premium over-ear headphones with immersive spatial audio.",
    price: 5490000,
    compareAtPrice: 6490000,
    stock: 7,
    status: "active",
    featured: true,
    brand: "Apple",
    batteryCapacity: "20 hours",
    screenType: "",
    screenDiagonal: "",
    protectionClass: "",
    builtInMemory: "",
    categorySlug: "headphones",
    images: [
      {
        url: "/assets/images/airpods-max-silver.png",
        alt: "AirPods Max",
        sortOrder: 0,
      },
    ],
  },
  {
    name: "Samsung Galaxy Watch 6 Classic",
    slug: "samsung-galaxy-watch-6-classic",
    sku: "WAT-SGW6-CLS",
    description: "Bold stainless finish with strong fitness tracking.",
    price: 3690000,
    compareAtPrice: null,
    stock: 9,
    status: "active",
    featured: false,
    brand: "Samsung",
    batteryCapacity: "425 mAh",
    screenType: "Super AMOLED",
    screenDiagonal: "47mm",
    protectionClass: "5ATM + IP68",
    builtInMemory: "16GB",
    categorySlug: "smart-watches",
    images: [
      {
        url: "/assets/images/apple-watch.png",
        alt: "Samsung Galaxy Watch 6 Classic",
        sortOrder: 0,
      },
    ],
  },
  {
    name: "Galaxy Z Fold5 Unlocked",
    slug: "galaxy-z-fold5-unlocked",
    sku: "PHN-ZFOLD5-UNL",
    description: "Foldable flagship phone with multitasking productivity.",
    price: 17990000,
    compareAtPrice: 19990000,
    stock: 5,
    status: "active",
    featured: true,
    brand: "Samsung",
    batteryCapacity: "4400 mAh",
    screenType: "Dynamic AMOLED 2X",
    screenDiagonal: "7.6\"",
    protectionClass: "IPX8",
    builtInMemory: "256GB",
    categorySlug: "phones",
    images: [
      {
        url: "/assets/images/galaxy-z-fold-5.png",
        alt: "Galaxy Z Fold5",
        sortOrder: 0,
      },
    ],
  },
  {
    name: "Galaxy Buds FE Graphite",
    slug: "galaxy-buds-fe-graphite",
    sku: "AUD-BUDSFE-GR",
    description: "Comfortable true wireless earbuds with balanced sound.",
    price: 999900,
    compareAtPrice: 1199900,
    stock: 16,
    status: "active",
    featured: false,
    brand: "Samsung",
    batteryCapacity: "30 hours",
    screenType: "",
    screenDiagonal: "",
    protectionClass: "IPX2",
    builtInMemory: "",
    categorySlug: "headphones",
    images: [
      {
        url: "/assets/images/galaxy-buds-fe.png",
        alt: "Galaxy Buds FE",
        sortOrder: 0,
      },
    ],
  },
  {
    name: "Apple iPad 10.9 64GB Wi-Fi",
    slug: "apple-ipad-10-9-64gb-wifi",
    sku: "TAB-IPAD-109",
    description: "Tablet for work, entertainment, and sketching on the go.",
    price: 3980000,
    compareAtPrice: null,
    stock: 12,
    status: "active",
    featured: false,
    brand: "Apple",
    batteryCapacity: "28.6 Wh",
    screenType: "Liquid Retina",
    screenDiagonal: "10.9\"",
    protectionClass: "",
    builtInMemory: "64GB",
    categorySlug: "computers",
    images: [
      {
        url: "/assets/images/ipad-10-9-wifi.png",
        alt: "Apple iPad",
        sortOrder: 0,
      },
    ],
  },
  {
    name: "MacBook Air 15-inch",
    slug: "macbook-air-15-inch",
    sku: "LAP-MBA15-256",
    description: "Lightweight laptop with a spacious display and all-day battery life.",
    price: 31990000,
    compareAtPrice: 33990000,
    stock: 6,
    status: "active",
    featured: true,
    brand: "Apple",
    batteryCapacity: "Up to 18 hours",
    screenType: "Liquid Retina",
    screenDiagonal: "15.3\"",
    protectionClass: "",
    builtInMemory: "256GB",
    categorySlug: "computers",
    images: [
      {
        url: "/assets/images/macbook-air-main.png",
        alt: "MacBook Air",
        sortOrder: 0,
      },
    ],
  },
];

async function seedProducts() {
  await connectDatabase(process.env.MONGODB_URI);

  const skus = products.map((item) => item.sku);
  await Product.deleteMany({ sku: { $nin: skus } });

  for (const item of products) {
    const category = await Category.findOne({ slug: item.categorySlug });

    if (!category) {
      throw new Error(`Missing category ${item.categorySlug}. Run seed:categories first.`);
    }

    await Product.findOneAndUpdate(
      { sku: item.sku },
      {
        name: item.name,
        slug: item.slug,
        sku: item.sku,
        description: item.description,
        price: item.price,
        compareAtPrice: item.compareAtPrice,
        stock: item.stock,
        status: item.status,
        featured: item.featured,
        brand: item.brand,
        batteryCapacity: item.batteryCapacity,
        screenType: item.screenType,
        screenDiagonal: item.screenDiagonal,
        protectionClass: item.protectionClass,
        builtInMemory: item.builtInMemory,
        categoryId: category._id,
        images: item.images,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }

  console.log(`Seeded ${products.length} products`);
}

seedProducts()
  .catch((error) => {
    console.error("Product seed failed", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });


