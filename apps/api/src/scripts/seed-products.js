import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDatabase } from "../config/db.js";
import { Category } from "../modules/categories/category.model.js";
import { Product } from "../modules/products/product.model.js";

dotenv.config();

const products = [
  {
    name: "MacBook Air M4",
    slug: "macbook-air-m4",
    sku: "MBA-M4-001",
    description: "Lightweight Apple laptop for work and travel.",
    price: 29990000,
    compareAtPrice: 31990000,
    stock: 8,
    status: "active",
    featured: true,
    categorySlug: "laptops",
    images: [
      {
        url: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?w=900&q=80",
        alt: "MacBook Air M4",
        sortOrder: 0,
      },
    ],
  },
  {
    name: "Sony WH-1000XM5",
    slug: "sony-wh-1000xm5",
    sku: "AUD-SONY-001",
    description: "Noise cancelling flagship headphones from Sony.",
    price: 8990000,
    compareAtPrice: 9990000,
    stock: 15,
    status: "active",
    featured: true,
    categorySlug: "audio",
    images: [
      {
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=80",
        alt: "Sony WH-1000XM5",
        sortOrder: 0,
      },
    ],
  },
  {
    name: "PlayStation 5 Slim",
    slug: "playstation-5-slim",
    sku: "GAME-PS5-001",
    description: "Next-gen console with fast load times and strong visuals.",
    price: 13990000,
    compareAtPrice: null,
    stock: 6,
    status: "active",
    featured: true,
    categorySlug: "gaming",
    images: [
      {
        url: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=900&q=80",
        alt: "PlayStation 5 Slim",
        sortOrder: 0,
      },
    ],
  },
  {
    name: "Apple Watch Series 10",
    slug: "apple-watch-series-10",
    sku: "WEAR-AW-010",
    description: "Fitness, messaging, and notifications on your wrist.",
    price: 11990000,
    compareAtPrice: 12990000,
    stock: 10,
    status: "active",
    featured: false,
    categorySlug: "wearables",
    images: [
      {
        url: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=900&q=80",
        alt: "Apple Watch Series 10",
        sortOrder: 0,
      },
    ],
  },
  {
    name: "Fujifilm X-S20",
    slug: "fujifilm-x-s20",
    sku: "CAM-FUJI-020",
    description: "Portable mirrorless camera for creators and travelers.",
    price: 25990000,
    compareAtPrice: null,
    stock: 4,
    status: "active",
    featured: false,
    categorySlug: "cameras",
    images: [
      {
        url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=900&q=80",
        alt: "Fujifilm X-S20",
        sortOrder: 0,
      },
    ],
  },
  {
    name: "Mechanical Gaming Keyboard",
    slug: "mechanical-gaming-keyboard",
    sku: "GAME-KB-002",
    description: "RGB mechanical keyboard with tactile switches.",
    price: 2490000,
    compareAtPrice: 2990000,
    stock: 18,
    status: "active",
    featured: false,
    categorySlug: "gaming",
    images: [
      {
        url: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=900&q=80",
        alt: "Mechanical Gaming Keyboard",
        sortOrder: 0,
      },
    ],
  },
];

async function seedProducts() {
  await connectDatabase(process.env.MONGODB_URI);

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
