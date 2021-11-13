import makeRestaurant from "./restaurant.js";
import { RestaurantNotFoundError } from "../helpers/errors.js";

export default function makeRestaurantList({ RestaurantModel }) {
  return Object.freeze({
    add,
    findById,
    remove,
    getItems,
  });

  /**
   * Adds a new restaurant to the database
   * @param {Object} restaurant an object representing a Restaurant
   * @returns the restaurant object added
   */
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

  /**
   * Finds a restaurant with the given restaurantId
   * @param {String} restaurant.restaurantId the ID of the restaurant
   * @returns an object representing a Restaurant
   */
  async function findById({ restaurantId }) {
    const found = await RestaurantModel.findById(restaurantId).lean();
    if (!found) {
      throw new RestaurantNotFoundError(restaurantId);
    }

    return modelToRestaurant(found);
  }

  /**
   * Objtains an Array of all restaurants in the database
   * @returns an Array of objects representing Restaurants
   */
  async function getItems() {
    const found = await RestaurantModel.find().lean();
    if (!found) {
      throw new RestaurantNotFoundError("ALL RESTAURANTS");
    }

    return found.map(modelToRestaurant);
  }

  /**
   * Removes a restaurant from the database
   * @param {restaurant.restaurantId} restaurantId the ID of the restaurant to be removed
   * @returns the removed restaurant
   */
  async function remove({ restaurantId }) {
    const deleted = await RestaurantModel.findByIdAndDelete(restaurantId);

    if (!deleted) {
      throw new RestaurantNotFoundError(restaurantId);
    }

    return modelToRestaurant(deleted._doc);
  }

  /**
   * Converts a model to a Restaurant object
   * @param {Object} restaurant the restaurant model to be converted
   * @returns an Object representing a Restaurant
   */
  function modelToRestaurant({ _id: restaurantId, ...model }) {
    return makeRestaurant({ restaurantId, ...model });
  }
}
