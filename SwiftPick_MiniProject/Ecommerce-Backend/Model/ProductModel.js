import mongoose from "mongoose";
const ProductSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    pricediscount: { type: Number, required: true },
    brand: { type: String, required: true },
    category: { type: String,required: true },
    thumbnail: [
      { type: String, required: true }
    ],
    rating: { type: Number, required: true },
    stock: { type: Number },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
