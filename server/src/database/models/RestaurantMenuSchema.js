import mongoose from "mongoose";

import RestaurantMenuItemSchema from "./RestaurantMenuItemSchema.js";

const RestaurantMenuSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    defaultTaxRate: { type: Number, default: 0.2, min: 0, max: 1 },
    items: [RestaurantMenuItemSchema],
  },
  { timestamps: true },
  { collection: "restaurant" }
);

export default RestaurantMenuSchema;
