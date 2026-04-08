import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

import connectDB from "./config/db.js";
import Category from "./models/Category.js";
import Product from "./models/Product.js";

await connectDB();

// Clear existing
await Category.deleteMany({});
await Product.deleteMany({});

const categories = await Category.insertMany([
  { name: "Biryani Cuts",  image: "/uploads/Biryani_cuts.png" },
  { name: "Boneless",      image: "/uploads/Boneless.png" },
  { name: "Bone Marrow",   image: "/uploads/Bone_marrow.png" },
  { name: "Chop",          image: "/uploads/Chop.png" },
  { name: "Curry Cuts",    image: "/uploads/Curry_Cuts.png" },
  { name: "Full Legs",     image: "/uploads/Full_legs.png" },
  { name: "Keema",         image: "/uploads/Keema.png" },
  { name: "Liver",         image: "/uploads/Liver.png" },
]);

console.log("✅ Categories seeded:", categories.map(c => c.name).join(", "));

// Seed sample products for each category
const products = categories.map(cat => ({
  name: `${cat.name} Mutton`,
  category: cat.name,
  categoryId: cat._id.toString(),
  image: cat.image,
  weight: "500g",
  description: `Fresh ${cat.name.toLowerCase()} — cleaned and ready to cook.`,
  price: 350,
  offer: 0,
}));

await Product.insertMany(products);
console.log("✅ Products seeded:", products.length);

process.exit();
