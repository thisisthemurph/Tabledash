import mongoose from "mongoose";

const Location = new mongoose.Schema(
  {
    townOrCity: { type: String },
    postcode: { type: String },
    country: { type: String },
  },
  { collection: "restaurant" }
);

export default Location;
