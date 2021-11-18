import express from "express";

import { PORT, ENVIRONMENT } from "../config.js";
import connectToDatabase from "./database/db.js";
import adaptRequest from "./helpers/adaptRequest.js";
import handleRestaurantRequest from "./restaurant/index.js";
import handleRestaurantMenuRequest from "./restaurantMenu/index.js";
import {
  logErrors,
  errorHandler,
  notFoundErrorHandler,
} from "./middleware/errorHandlers.js";

export async function createServer() {
  await connectToDatabase();
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Endpoints

  app.all("/api/restaurant", restaurantController);
  app.get("/api/restaurant/:id", restaurantController);
  app.put("/api/restaurant/:id", restaurantController);
  app.delete("/api/restaurant/:id", restaurantController);

  app.all("/api/restaurant/:restaurantId/menu", menuController);
  app.get("/api/restaurant/:restaurantId/menu/:menuId", menuController);
  app.put("/api/restaurant/:restaurantId/menu/:menuId", menuController);
  app.delete("/api/restaurant/:restaurantId/menu/:menuId", menuController);

  // Error middleware

  app.use(logErrors);
  app.use(errorHandler);
  app.use(notFoundErrorHandler);

  return app;
}

async function startServer() {
  const app = await createServer();
  app.listen({ port: PORT }, async () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}

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

if (ENVIRONMENT === "dev") {
  startServer();
}
