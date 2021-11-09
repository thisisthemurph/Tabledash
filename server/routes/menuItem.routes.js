import express from "express";

import { addItemToMenu } from "../methods/menuItem.methods.js";

const router = express.Router();

router.post("/:restaurantId/menu/:menuId/item", async (req, res, next) => {
  try {
    const updated = await addItemToMenu(
      req.params.restaurantId,
      req.params.menuId,
      req.body
    );

    res.status(201).send(updated);
  } catch (error) {
    next(error);
  }
});

export default router;
