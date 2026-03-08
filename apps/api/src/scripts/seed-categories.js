import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDatabase } from "../config/db.js";
import { Category } from "../modules/categories/category.model.js";

dotenv.config();

const categories = [
  {
    name: "Laptops",
    slug: "laptops",
    image:
      "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?w=600&q=80",
    description: "Slim laptops and performance notebooks.",
    sortOrder: 1,
  },
  {
    name: "Audio",
    slug: "audio",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    description: "Headphones, speakers, and wireless audio gear.",
    sortOrder: 2,
  },
  {
    name: "Gaming",
    slug: "gaming",
    image:
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&q=80",
    description: "Consoles, controllers, and gaming accessories.",
    sortOrder: 3,
  },
  {
    name: "Wearables",
    slug: "wearables",
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80",
    description: "Smart watches and fitness trackers.",
    sortOrder: 4,
  },
  {
    name: "Cameras",
    slug: "cameras",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80",
    description: "Mirrorless cameras and portable shooting gear.",
    sortOrder: 5,
  },
];

async function seedCategories() {
  await connectDatabase(process.env.MONGODB_URI);

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
