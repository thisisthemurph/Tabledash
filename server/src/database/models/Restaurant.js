import mongoose from "mongoose";

import Menu from "./Menu.js";

const Restaurant = new mongoose.Schema(
  {
    name: { type: String, required: true },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    menus: [Menu],
  },
  { timestaps: true },
  { collection: "restaurant" }
);

export default mongoose.model("Restaurant", Restaurant);
