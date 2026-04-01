import express from "express";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import mongoose from "mongoose";

const router = express.Router();

// GET /api/products/search?q=keema
router.get("/search", async (req, res) => {
  try {
    const q = req.query.q?.trim();
    if (!q) return res.json([]);
    const products = await Product.find({
      $or: [
        { name:        { $regex: q, $options: "i" } },
        { category:    { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ],
    }).limit(10);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/products/top-selling — top 3 most ordered products
router.get("/top-selling", async (req, res) => {
  try {
    const top = await Order.aggregate([
      { $unwind: "$items" },
      { $match: { "items.product": { $exists: true, $ne: null } } },
      { $group: { _id: "$items.product", totalSold: { $sum: "$items.quantity" } } },
      { $sort: { totalSold: -1 } },
      { $limit: 3 },
      { $lookup: { from: "products", localField: "_id", foreignField: "_id", as: "product" } },
      { $unwind: "$product" },
      { $replaceRoot: { newRoot: { $mergeObjects: ["$product", { totalSold: "$totalSold" }] } } },
    ]);

    // fallback: agar orders nahi hain toh random 3 products
    if (top.length < 3) {
      const fallback = await Product.find({}).limit(3);
      return res.json(fallback);
    }
    res.json(top);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/products (all)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/products/category/:categoryName
router.get("/category/:categoryName", async (req, res) => {
  try {
    const categoryName = decodeURIComponent(req.params.categoryName);
    const products = await Product.find({
      category: { $regex: new RegExp(`^${categoryName}$`, "i") },
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/products/random/:excludeId  — 3 random products (for related section)
router.get("/random/:excludeId", async (req, res) => {
  try {
    const products = await Product.aggregate([
      { $match: { _id: { $ne: new mongoose.Types.ObjectId(req.params.excludeId) } } },
      { $sample: { size: 3 } },
    ]);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/products/:id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
