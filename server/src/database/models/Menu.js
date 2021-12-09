import mongoose from "mongoose";

import MenuSection from "./MenuSection.js";

const Menu = new mongoose.Schema(
  {
    name: { type: String, required: true },
    defaultTaxRate: { type: Number, default: 0.2, min: 0, max: 1 },
    sections: [
      {
        name: { type: String, required: true },
        desription: { type: String },
        sections: [MenuSection],
      },
    ],
  },
  { timestamps: true },
  { collection: "restaurant" }
);

export default Menu;
