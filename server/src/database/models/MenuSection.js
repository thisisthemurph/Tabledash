import mongoose from "mongoose";

const MenuSection = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true },
  { collection: "restaurant" }
);

export default MenuSection;
