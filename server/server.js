import express from "express";

import connectToDatabase from "./database/db.js";
import restaurantRoutes from "./routes/restaurant.routes.js";
import menuRoutes from "./routes/menu.routes.js";
import menuItemRoutes from "./routes/menuItem.routes.js";
import {
  logErrors,
  errorHandler,
  notFoundErrorHandler,
} from "./errorHandlers.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/restaurant", restaurantRoutes);
app.use("/api/restaurant", menuRoutes);
app.use("/api/restaurant", menuItemRoutes);

app.use(logErrors);
app.use(errorHandler);
app.use(notFoundErrorHandler);

const port = process.env.PORT | 3000;
app.listen(port, (req, res) => {
  connectToDatabase();
  console.log(`Magic is happening on port ${port} 😎`);
});
