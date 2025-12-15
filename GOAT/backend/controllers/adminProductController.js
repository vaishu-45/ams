// const Product = require("../models/Product");

// // Add product
// exports.addProduct = async (req, res) => {
//   try {
//     const product = await Product.create(req.body);
//     res.json(product);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// // Get all products
// exports.getProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// // Update (stock, price, name…)
// exports.updateProduct = async (req, res) => {
//   try {
//     const updated = await Product.findByIdAndUpdate(
//       req.params.id, 
//       req.body,
//       { new: true }
//     );
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// // Delete
// exports.deleteProduct = async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);
//     res.json({ message: "Deleted" });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };
