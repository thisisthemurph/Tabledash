import RestaurantModel from "../models/RestaurauntSchema.js";
import { RestaurantNotFoundError } from "./errors.js";

export async function createRestaurant(restaurantData) {
  const restaurant = new RestaurantModel(restaurantData);

  try {
    return await restaurant.save();
  } catch (error) {
    throw error;
  }
}

export async function getRestaurantById(id) {
  const restaurant = await RestaurantModel.findById(id);
  if (restaurant === null) {
    throw new RestaurantNotFoundError();
  }

  return restaurant;
}

export async function deleteRestaurantById(id) {
  const deletedRestaurant = await RestaurantModel.findByIdAndDelete(id);
  if (deletedRestaurant === null) {
    throw new RestaurantNotFoundError();
  }

  return deletedRestaurant;
}
