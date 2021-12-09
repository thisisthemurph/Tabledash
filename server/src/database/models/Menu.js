import mongoose from "mongoose";

import MenuItem from "./MenuItem.js";

const Menu = new mongoose.Schema(
  {
    name: { type: String, required: true },
    defaultTaxRate: { type: Number, default: 0.2, min: 0, max: 1 },
    sections: [
      {
        name: { type: String, required: true },
        desription: { type: String },
        items: [MenuItem],
      },
    ],
  },
  { timestamps: true },
  { collection: "restaurant" }
);

export default Menu;
