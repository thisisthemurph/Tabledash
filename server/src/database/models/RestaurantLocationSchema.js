import mongoose from "mongoose";

const RestaurantLocationSchema = new mongoose.Schema(
  {
    townOrCity: { type: String },
    postcode: { type: String },
    country: { type: String },
  },
  { collection: "restaurant" }
);

export default RestaurantLocationSchema;
