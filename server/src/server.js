import express from "express";

import { PORT } from "../config.js";
import connectToDatabase from "./database/db.js";
import adaptRequest from "./helpers/adaptRequest.js";
import handleRestaurantRequest from "./restaurant/index.js";
import {
  logErrors,
  errorHandler,
  notFoundErrorHandler,
} from "./middleware/errorHandlers.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all("/api/restaurant", restaurantController);
app.get("/api/restaurant/:id", restaurantController);
app.delete("/api/restaurant/:id", restaurantController);

// app.all("/api/testaurant/:restaurantId/menu", CONTROLLER)
// app.get("/api/restaurant/:restaurantId/menu/:menuId", CONTROLLER)

function restaurantController(req, res) {
  const httpRequest = adaptRequest(req);
  handleRestaurantRequest(httpRequest)
    .then(({ headers, statusCode, data }) =>
      res.set(headers).status(statusCode).send(data)
    )
    .catch((_) => res.status(500).end());
}

app.use(logErrors);
app.use(errorHandler);
app.use(notFoundErrorHandler);

app.listen(PORT, (req, res) => {
  connectToDatabase();
  console.log(`Magic is happening on port ${PORT} 😎`);
});
