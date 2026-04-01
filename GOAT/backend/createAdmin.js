import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

import connectDB from "./config/db.js";
import User from "./models/User.js";

await connectDB();

const user = await User.findOne({ phone: "9049504237" });
if (!user) {
  console.log("❌ User with phone 9049504237 not found in database.");
  process.exit();
}

user.role = "admin";
await user.save();

console.log("✅ Admin access granted to:", user.name, "| Phone:", user.phone);
process.exit();
