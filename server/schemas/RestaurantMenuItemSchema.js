import mongoose from "mongoose";

const RestaurantMenuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: mongoose.Decimal128, required: true },
    taxInclusive: {
      type: mongoose.Decimal128,
      min: 0,
      max: 1,
      default: 0.2,
      required: true,
    },
  },
  { timestamps: true },
  { collection: "restaurant" }
);

export default RestaurantMenuItemSchema;
