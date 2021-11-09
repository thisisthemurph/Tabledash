import mongoose from "mongoose";

const RestaurantUserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    username: { type: String, requires: true },
    password: { type: String, required: true },
  },
  { collection: "restaurant" }
);

export default RestaurantUserSchema;
