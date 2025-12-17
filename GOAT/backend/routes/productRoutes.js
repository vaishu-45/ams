import express from "express";
import Product from "../models/Product.js";
import mongoose from "mongoose";

const router = express.Router();

// GET ALL PRODUCTS
// ==============================
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching all products:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET PRODUCTS BY CATEGORY
// ==============================
router.get("/category/:categoryName", async (req, res) => {
  try {
    // Decode URL (Full%20Legs → Full Legs)
    const categoryName = decodeURIComponent(req.params.categoryName);

    // Case-insensitive + space friendly match
    const products = await Product.find({
      category: { $regex: new RegExp(`^${categoryName}$`, "i") }
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET 3 RANDOM PRODUCTS (exclude current)
router.get("/random/:excludeId", async (req, res) => {
  try {
    const excludeId = req.params.excludeId;

    const products = await Product.aggregate([
      {
        $match: {
          _id: { $ne: new mongoose.Types.ObjectId(excludeId) }
        }
      },
      { $sample: { size: 3 } }
    ]);

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

// #2

// /products/category/:categoryName
// router.get("/category/:categoryName", async (req, res) => {
//   try {
//     const categoryName = req.params.categoryName;
//     const products = await Product.find({ category: categoryName, inStock: true });
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ error: "Error fetching products" });
//   }
// });

// #3

// import express from "express";
// import Product from "../models/Product.js";

// const router = express.Router();

// // GET products of a category
// router.get("/category/:categoryName", async (req, res) => {
//   try {
//     const products = await Product.find({
//       category: req.params.categoryName,
//       stock: true
//     });

//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

// export default router;


