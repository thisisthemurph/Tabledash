import express from "express";

import {
  addMenuToRestaurant,
  getRestaurantMenuById,
  deleteRestaurantMenuById,
} from "../methods/menu.methods.js";

const router = express.Router();

router.get("/:restaurantId/menu/:menuId", async (req, res, next) => {
  try {
    const menu = await getRestaurantMenuById(
      req.params.restaurantId,
      req.params.menuId
    );

    res.send(menu);
  } catch (error) {
    next(error);
  }
});

router.post("/:restaurantId/menu", async (req, res, next) => {
  try {
    const updatedRestaurant = await addMenuToRestaurant(
      req.params.restaurantId,
      req.body
    );

    res.status(201).send(updatedRestaurant);
  } catch (error) {
    next(error);
  }
});

router.delete("/:restaurantId/menu/:menuId", async (req, res, next) => {
  try {
    const updatedRestaurant = await deleteRestaurantMenuById(
      req.params.restaurantId,
      req.params.menuId
    );

    res.status(201).send(updatedRestaurant);
  } catch (error) {
    next(error);
  }
});

export default router;
