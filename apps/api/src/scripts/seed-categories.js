import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDatabase } from "../config/db.js";
import { Category } from "../modules/categories/category.model.js";

dotenv.config();

const categories = [
  {
    name: "Phones",
    slug: "phones",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80",
    description: "Flagship phones and foldable devices.",
    sortOrder: 1,
  },
  {
    name: "Smart Watches",
    slug: "smart-watches",
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80",
    description: "Wearables built for health, style, and fitness.",
    sortOrder: 2,
  },
  {
    name: "Cameras",
    slug: "cameras",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80",
    description: "Portable cinema and mirrorless camera gear.",
    sortOrder: 3,
  },
  {
    name: "Headphones",
    slug: "headphones",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    description: "Over-ear, in-ear, and wireless audio devices.",
    sortOrder: 4,
  },
  {
    name: "Computers",
    slug: "computers",
    image:
      "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?w=600&q=80",
    description: "Laptops, tablets, and desktop-grade devices.",
    sortOrder: 5,
  },
  {
    name: "Gaming",
    slug: "gaming",
    image:
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&q=80",
    description: "Consoles and gaming accessories.",
    sortOrder: 6,
  },
];

async function seedCategories() {
  await connectDatabase(process.env.MONGODB_URI);

  const slugs = categories.map((item) => item.slug);
  await Category.deleteMany({ slug: { $nin: slugs } });

  for (const item of categories) {
    await Category.findOneAndUpdate(
      { slug: item.slug },
      { ...item, isActive: true },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }

  console.log(`Seeded ${categories.length} categories`);
}

seedCategories()
  .catch((error) => {
    console.error("Category seed failed", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });
