import mongoose from "mongoose";

import MenuItem from "./MenuItem";

const MenuSection = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    items: [MenuItem],
  },
  { timestamps: true },
  { collection: "restaurant" }
);

export default MenuSection;
