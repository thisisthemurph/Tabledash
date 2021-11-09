import mongoose from "mongoose";

import { DB_CONNECTION_STRING } from "../../config.js";

const connectToDatabase = async () => {
  mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.once("open", () => {
    console.log("Connected successfully");
  });
};

export default connectToDatabase;
