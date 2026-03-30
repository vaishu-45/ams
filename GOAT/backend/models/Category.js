import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,   // store filename only like "chicken.png"
    required: true,
  },
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
