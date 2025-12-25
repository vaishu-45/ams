import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();

/* ADD TO CART */
router.post("/add", async (req, res) => {
  const { productId, name, price, image, description } = req.body;

  const existing = await Cart.findOne({ productId });

  if (existing) {
    existing.qty += 1;
    await existing.save();
    return res.json(existing);
  }

  const cartItem = new Cart({
    productId,
    name,
    price,
    image,
    description,
    qty: 1,
  });

  await cartItem.save();
  res.json(cartItem);
});

/* GET CART ITEMS */
router.get("/", async (req, res) => {
  const items = await Cart.find().sort({ createdAt: -1 });
  res.json(items);
});

/* UPDATE QTY */
router.put("/update/:id", async (req, res) => {
  const { qty } = req.body;
  const item = await Cart.findByIdAndUpdate(
    req.params.id,
    { qty },
    { new: true }
  );
  res.json(item);
});

/* REMOVE ITEM */
router.delete("/remove/:id", async (req, res) => {
  await Cart.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;

