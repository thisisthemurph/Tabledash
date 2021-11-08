import express from "express";

import {
  createRestaurant,
  getRestaurantById,
  deleteRestaurantById,
} from "../methods/restaurant.methods.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const restaurant = await createRestaurant(req.body);
    res.status(201).send(restaurant);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const restaurant = await getRestaurantById(req.params.id);
    res.send(restaurant);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deletedRestaurant = await deleteRestaurantById(req.params.id);
    console.log("Returned deleted");
    console.log(deletedRestaurant);
    res.send(deletedRestaurant);
  } catch (error) {
    next(error);
  }
});

export default router;
