import express from "express";

import { PORT, ENVIRONMENT } from "../config.js";
import connectToDatabase from "./database/db.js";
import adaptRequest from "./helpers/adaptRequest.js";

import handleUserRequest from "./user/index.js";
import handleRestaurantRequest from "./restaurant/index.js";
import handleRestaurantMenuRequest from "./restaurantMenu/index.js";
import handleAuthRequest from "./auth/index.js";

import {
  logErrors,
  errorHandler,
  notFoundErrorHandler,
} from "./middleware/errorHandlers.js";
import { authenticate, requireAdmin } from "./middleware/auth.js";

export async function createServer() {
  await connectToDatabase();
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Endpoints

  app.all("/api/restaurant", restaurantController);
  app.get("/api/restaurant/:id", restaurantController);
  app.put(
    "/api/restaurant/:id",
    authenticate,
    requireAdmin,
    restaurantController
  );
  app.delete(
    "/api/restaurant/:id",
    authenticate,
    requireAdmin,
    restaurantController
  );

  app.all("/api/restaurant/:restaurantId/menu", menuController);
  app.get("/api/restaurant/:restaurantId/menu/:menuId", menuController);
  app.put(
    "/api/restaurant/:restaurantId/menu/:menuId",
    authenticate,
    requireAdmin,
    menuController
  );
  app.delete(
    "/api/restaurant/:restaurantId/menu/:menuId",
    authenticate,
    requireAdmin,
    menuController
  );

  app.all("/api/user", authenticate, userController);
  app.get("/api/user/:userId", authenticate, userController);
  app.get("/api/user/username/:username", authenticate, userController);
  app.delete("/api/user/:userId", authenticate, requireAdmin, userController);

  app.all("/api/auth/:action", authController);

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

// Controllers

function authController(req, res) {
  const httpRequest = adaptRequest(req);
  handleAuthRequest(httpRequest)
    .then(({ headers, statusCode, data }) =>
      res.set(headers).status(statusCode).send(data)
    )
    .catch((e) => res.status(500).end());
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

function userController(req, res) {
  const httpRequest = adaptRequest(req);
  handleUserRequest(httpRequest)
    .then(({ headers, statusCode, data }) =>
      res.set(headers).status(statusCode).send(data)
    )
    .catch((e) => res.status(500).end());
}

if (ENVIRONMENT === "dev") {
  startServer();
}
