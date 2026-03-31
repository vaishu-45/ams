import Product from "../models/Product.js";

// GET /api/admin/products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/admin/products
export const addProduct = async (req, res) => {
  try {
    const { name, category, categoryId, weight, description, price, offer } = req.body;

    if (!name || !category || !categoryId || !weight || !description || !price)
      return res.status(400).json({ message: "All required fields must be provided" });

    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;
    if (!image) return res.status(400).json({ message: "Product image is required" });

    const product = await Product.create({
      name, category, categoryId, image, weight, description,
      price: Number(price),
      offer: Number(offer) || 0,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/admin/products/:id
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const fields = ["name", "category", "categoryId", "weight", "description", "price", "offer"];
    fields.forEach((f) => { if (req.body[f] !== undefined) product[f] = req.body[f]; });
    if (req.file) product.image = `/uploads/${req.file.filename}`;

    const updated = await product.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/admin/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
