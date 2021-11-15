import mongoose from "mongoose";
import { DB_CONNECTION_STRING } from "../../config.js";

let connection;
export default async function connectToDatabase() {
  connection = mongoose
    .connect(DB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((dbConnection) => {
      connection = dbConnection;
    });

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.once("open", () => {
    console.log("Connected successfully");
  });
}

export async function disconnectFromDatabase() {
  await connection.disconnect();
}
