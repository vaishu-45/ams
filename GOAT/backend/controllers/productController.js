import Product from "../models/Product.js";

export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category });

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getRelatedProducts = async (req, res) => {
  try {
    const { category } = req.params;

    const products = await Product.find({ category }).limit(3);

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
