import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import { getAllProducts, addProduct, updateProduct, deleteProduct } from "../controllers/adminProductController.js";
import { addCategory, updateCategory, deleteCategory } from "../controllers/categoryController.js";
import { getAllOrders, updateOrderStatus } from "../controllers/orderController.js";
import { getAllUsers, deleteUser } from "../controllers/userController.js";

const router = express.Router();

// All admin routes require auth + admin role
router.use(protect, adminOnly);

// Products
router.get("/products", getAllProducts);
router.post("/products", upload.single("image"), addProduct);
router.put("/products/:id", upload.single("image"), updateProduct);
router.delete("/products/:id", deleteProduct);

// Categories
router.post("/categories", upload.single("image"), addCategory);
router.put("/categories/:id", upload.single("image"), updateCategory);
router.delete("/categories/:id", deleteCategory);

// Orders
router.get("/orders", getAllOrders);
router.put("/orders/:id/status", updateOrderStatus);
router.put("/orders/:id/payment", async (req, res) => {
  try {
    const Order = (await import("../models/Order.js")).default;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { paymentStatus: "paid" },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Users
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.put("/users/:id/role", async (req, res) => {
  try {
    const User = (await import("../models/User.js")).default;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.role = user.role === "admin" ? "user" : "admin";
    await user.save();
    res.json({ message: `Role updated to ${user.role}`, role: user.role });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
