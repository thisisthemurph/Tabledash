import mongoose from "mongoose";

import RestaurantUserSchema from "./RestaurantUserSchema.js";
import RestaurantLocationSchema from "./RestaurantLocationSchema.js";
import RestaurantStylesSchema from "./RestaurantStylesSchema.js";
import RestaurantMenuSchema from "./RestaurantMenuSchema.js";

const RestaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: RestaurantLocationSchema },
    users: [RestaurantUserSchema],
    styles: { type: RestaurantStylesSchema },
    menus: [RestaurantMenuSchema],
  },
  { collection: "restaurant" }
);

export default mongoose.model("Restaurant", RestaurantSchema);
