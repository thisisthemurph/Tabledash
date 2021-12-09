import mongoose from "mongoose";

const MenuItem = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
  },
  { timestamps: true },
  { collection: "restaurant" }
);

export default MenuItem;
