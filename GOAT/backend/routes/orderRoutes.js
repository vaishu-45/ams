import express from "express";
import { placeOrder, getMyOrders, getOrderById } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, placeOrder);
router.get("/my", protect, getMyOrders);
router.get("/:id", protect, getOrderById);

// Cancel order — only within 5 minutes of placing
router.put("/:id/cancel", protect, async (req, res) => {
  try {
    const Order = (await import("../models/Order.js")).default;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Only owner can cancel
    if (order.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    // Check 5-minute window
    const minutesSince = (Date.now() - new Date(order.createdAt).getTime()) / 60000;
    if (minutesSince > 5)
      return res.status(400).json({ message: "Cannot cancel after 5 minutes of placing order." });

    if (order.status === "cancelled")
      return res.status(400).json({ message: "Order is already cancelled." });

    order.status = "cancelled";
    await order.save();
    res.json({ message: "Order cancelled successfully.", order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
