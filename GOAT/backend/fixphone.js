import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

import connectDB from "./config/db.js";
import User from "./models/User.js";

await connectDB();

// Delete all users except keep one with phone 9049504237
await User.deleteMany({ phone: { $ne: "9049504237" } });

// Update the remaining one to correct name
const u = await User.findOneAndUpdate(
  { phone: "9049504237" },
  { name: "Vaishnvi", role: "admin" },
  { new: true }
);

console.log("Final account:", u?.name, u?.phone, u?.role);
process.exit();
