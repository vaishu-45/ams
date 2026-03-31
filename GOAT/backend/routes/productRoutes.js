import express from "express";
import Product from "../models/Product.js";
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
