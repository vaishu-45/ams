import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

import connectDB from "./config/db.js";
import User from "./models/User.js";

await connectDB();

const user = await User.findOne({ phone: "9049504237" });
if (!user) { console.log("User not found!"); process.exit(); }

user.password = "admin123";   // new password
await user.save();            // pre-save hook will hash it

console.log("✅ Password reset for:", user.name, user.phone);
console.log("   New password: admin123");
process.exit();
