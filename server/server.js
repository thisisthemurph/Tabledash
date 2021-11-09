import express from "express";

import { PORT } from "./config.js";
import connectToDatabase from "./src/database/db.js";
import restaurantRoutes from "./src/routes/restaurant.routes.js";
import menuRoutes from "./src/routes/menu.routes.js";
import menuItemRoutes from "./src/routes/menuItem.routes.js";
import {
  logErrors,
  errorHandler,
  notFoundErrorHandler,
} from "./src/middleware/errorHandlers.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/restaurant", restaurantRoutes);
app.use("/api/restaurant", menuRoutes);
app.use("/api/restaurant", menuItemRoutes);

app.use(logErrors);
app.use(errorHandler);
app.use(notFoundErrorHandler);

app.listen(PORT, (req, res) => {
  connectToDatabase();
  console.log(`Magic is happening on port ${PORT} 😎`);
});
