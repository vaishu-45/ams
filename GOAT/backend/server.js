import dotenv from "dotenv";
dotenv.config({ override: true });
import express from "express";
import connectDB from "./config/db.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
// const cors = require("cors");
import cors from "cors";

// import connectDB from "./db.js";

// Connect DB
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads")); // MAKE UPLOADS PUBLIC



// Serve static category images
app.use("/images", express.static("public/images"));

// Routes
app.use("/api", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);


app.listen(5000, () => {
  console.log("Server running on Port 5000");
});