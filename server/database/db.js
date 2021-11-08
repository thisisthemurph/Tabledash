import mongoose from "mongoose";

const username = "mike";
const password = "simplepassword";
const cluster = "development-cluster.vqxd1";
const dbname = "tabledash";

const connectToDatabase = async () => {
  const mongoDB = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`;
  mongoose.connect(mongoDB, {
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
