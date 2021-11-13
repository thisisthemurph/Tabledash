import {
  MenuNotFoundError,
  RestaurantNotFoundError,
} from "../helpers/errors.js";
import makeMenu from "./menu.js";

export default function makeMenuList({ RestaurantModel }) {
  return Object.freeze({ add, findById, removeById, getItems });

  /**
   * Adds a new menu to the restaurant with the given restaurantId
   * @param {Object[]} data
   * @param {String} data.restaurantId the ID of the restaurant that the menu will belong to
   * @param {Object} data.menuInfo the object representing the menu to be added
   * @returns an object representing the added menu
   */
  async function add({ restaurantId, ...menuInfo }) {
    try {
      const restaurant = await RestaurantModel.findById(restaurantId);

      if (!restaurant) {
        throw new RestaurantNotFoundError(restaurantId);
      }

      let menu = makeMenu({ ...menuInfo });
      restaurant.menus.push(menu);
      await restaurant.save();
      return menu;
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Finds a menu based on the restaurantId and menuId
   * @param {Object[]} data
   * @param {String} data.restaurantId the ID of the restaurant that the menu belongs to
   * @param {Object} data.menuId the ID of the menu to be located
   * @returns an object representing a menu
   */
  async function findById({ restaurantId, menuId }) {
    const restaurant = await RestaurantModel.findById(restaurantId);
    if (!restaurant) {
      throw new RestaurantNotFoundError(restaurantId);
    }

    const menu = restaurant.menus.id(menuId);
    if (!menu) {
      throw new MenuNotFoundError(restaurantId, menuId);
    }

    return modelToMenu(menu._doc);
  }

  /**
   * Gets all menus for the given restaurantId
   * @param {Object[]} data
   * @param {String} data.restaurantId the ID of the restaurant that the menus belong to
   * @returns an Array of objects representing menus
   */
  async function getItems({ restaurantId }) {
    const restaurant = await RestaurantModel.findById(restaurantId);
    if (!restaurant) {
      throw new RestaurantNotFoundError(restaurantId);
    }

    return restaurant.menus.map((menu) => modelToMenu(menu._doc));
  }

  /**
   * Removes a menu from the database based on the restaurantId and menuId
   * @param {Object[]} data
   * @param {Object[]} data.restaurantId the ID of the restaurant the menu belongs to
   * @param {Object[]} data.menuId the ID of the menu to be removed
   * @returnsan object representing the removed menu
   */
  async function removeById({ restaurantId, menuId }) {
    const restaurant = await RestaurantModel.findById(restaurantId);
    if (!restaurant) {
      throw new RestaurantNotFoundError(restaurantId);
    }

    const menu = restaurant.menus.id(menuId);
    if (!menu) {
      throw new MenuNotFoundError(restaurantId, menuId);
    }

    await menu.remove();
    await restaurant.save();

    return menu;
  }

  /**
   * Converts a model to a Menu object
   * @param {Object[]} menu the menu model to be converted
   * @returns an Object representing a Restaurant
   */
  function modelToMenu({ _id: menuId, ...model }) {
    return makeMenu({ menuId, ...model });
  }
}
