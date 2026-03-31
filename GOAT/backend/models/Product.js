import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    categoryId: { type: String, required: true },  // Added
    image: { type: String, required: true }, // "/uploads/chicken.png"
    weight: { type: String, required: true }, // "500g"
    description: { type: String, required: true },
    price: { type: Number, required: true },
    offer: { type: Number, default: 0 }, // discount %
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
