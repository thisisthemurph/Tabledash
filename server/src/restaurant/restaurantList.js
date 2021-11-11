import makeRestaurant from "./restaurant.js";
import { RestaurantNotFoundError } from "../helpers/errors.js";

export default function makeRestaurantList({ RestaurantModel }) {
  return Object.freeze({
    add,
    findById,
    remove,
    getItems,
  });

  async function add({ ...restaurant } = {}) {
    let newRestaurant = new RestaurantModel(restaurant);
    newRestaurant = await newRestaurant.save();

    if (!newRestaurant) {
      throw Error(
        "There has been an issue adding the restaurant to the database."
      );
    }

    return modelToRestaurant(JSON.parse(JSON.stringify(newRestaurant)));
  }

  async function findById({ restaurantId }) {
    const found = await RestaurantModel.findById(restaurantId).lean();
    if (!found) {
      throw new RestaurantNotFoundError(restaurantId);
    }

    return modelToRestaurant(found);
  }

  async function getItems() {
    const found = await RestaurantModel.find().lean();
    if (!found) {
      throw new RestaurantNotFoundError("ALL RESTAURANTS");
    }

    return found.map(modelToRestaurant);
  }

  async function remove({ restaurantId }) {
    const deleted = await RestaurantModel.findByIdAndDelete(restaurantId);

    if (!deleted) {
      throw new RestaurantNotFoundError(restaurantId);
    }

    return deleted;
  }

  function modelToRestaurant({ _id: restaurantId, ...model }) {
    return makeRestaurant({ restaurantId, ...model });
  }
}
