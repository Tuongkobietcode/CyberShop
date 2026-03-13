import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDatabase } from "../config/db.js";
import { Category } from "../modules/categories/category.model.js";

dotenv.config();

const categories = [
  {
    name: "Phones",
    slug: "phones",
    image: "/assets/images/iphone-14-front.png",
    description: "Flagship phones and foldable devices.",
    sortOrder: 1,
  },
  {
    name: "Smart Watches",
    slug: "smart-watches",
    image: "/assets/images/apple-watch.png",
    description: "Wearables built for health, style, and fitness.",
    sortOrder: 2,
  },
  {
    name: "Cameras",
    slug: "cameras",
    image: "/assets/images/profile-image-41.png",
    description: "Portable cinema and mirrorless camera gear.",
    sortOrder: 3,
  },
  {
    name: "Headphones",
    slug: "headphones",
    image: "/assets/images/airpods-max-silver.png",
    description: "Over-ear, in-ear, and wireless audio devices.",
    sortOrder: 4,
  },
  {
    name: "Computers",
    slug: "computers",
    image: "/assets/images/macbook-air-main.png",
    description: "Laptops, tablets, and desktop-grade devices.",
    sortOrder: 5,
  },
  {
    name: "Gaming",
    slug: "gaming",
    image: "/assets/images/playstation-5.png",
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


