import express from "express";

import { PORT } from "../config.js";
import connectToDatabase from "./database/db.js";
import adaptRequest from "./helpers/adaptRequest.js";
import handleRestaurantRequest from "./restaurant/index.js";
import handleRestaurantMenuRequest from "./restaurantMenu/index.js";
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

app.all("/api/restaurant/:restaurantId/menu", menuController);
app.get("/api/restaurant/:restaurantId/menu/:menuId", menuController);
app.delete("/api/restaurant/:restaurantId/menu/:menuId", menuController);

function restaurantController(req, res) {
  const httpRequest = adaptRequest(req);
  handleRestaurantRequest(httpRequest)
    .then(({ headers, statusCode, data }) =>
      res.set(headers).status(statusCode).send(data)
    )
    .catch((e) => res.status(500).end());
}

function menuController(req, res) {
  const httpRequest = adaptRequest(req);
  handleRestaurantMenuRequest(httpRequest)
    .then(({ headers, statusCode, data }) =>
      res.set(headers).status(statusCode).send(data)
    )
    .catch((e) => res.status(500).end());
}

app.use(logErrors);
app.use(errorHandler);
app.use(notFoundErrorHandler);

app.listen(PORT, (req, res) => {
  connectToDatabase();
  console.log(`Magic is happening on port ${PORT} 😎`);
});
