import mongoose from "mongoose";

import Menu from "./Menu.js";
import Location from "./Location.js";
import Styles from "./Styles.js";

const Restaurant = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: Location },
    styles: { type: Styles },
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
