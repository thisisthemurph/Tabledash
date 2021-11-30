import mongoose from "mongoose";

import RestaurantLocationSchema from "./RestaurantLocationSchema.js";
import RestaurantStylesSchema from "./RestaurantStylesSchema.js";
import RestaurantMenuSchema from "./RestaurantMenuSchema.js";

const RestaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: RestaurantLocationSchema },
    styles: { type: RestaurantStylesSchema },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    menus: [RestaurantMenuSchema],
  },
  { collection: "restaurant" }
);

export default mongoose.model("Restaurant", RestaurantSchema);
