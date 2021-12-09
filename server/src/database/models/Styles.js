import mongoose from "mongoose";

const Styles = new mongoose.Schema(
  {
    primaryColor: { type: String, default: "#85144b", required: true },
    fontStyle: {
      type: String,
      emum: ["serif", "sans-serif", "monospace"],
      default: "sand-serif",
      required: true,
    },
    logo: { type: String },
  },
  { collection: "restaurant" }
);

export default Styles;
