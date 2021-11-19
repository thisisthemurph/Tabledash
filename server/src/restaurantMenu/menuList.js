import {
  MenuNotFoundError,
  RestaurantNotFoundError,
} from "../helpers/errors.js";
import makeMenu from "./menu.js";

export default function makeMenuList({ RestaurantModel }) {
  return Object.freeze({
    add,
    findById,
    removeById,
    getItems,
    updateById,
  });

  /**
   * Adds a new menu to the restaurant with the given restaurantId
   * @param {Object[]} data
   * @param {String} data.restaurantId the ID of the restaurant that the menu will belong to
   * @param {Object} data.menuInfo the object representing the menu to be added
   * @returns an object representing the added menu
   */
  async function add({ restaurantId, ...menuInfo }) {
    const restaurant = await RestaurantModel.findById(restaurantId);

    if (!restaurant) {
      throw new RestaurantNotFoundError(restaurantId);
    }

    let menu = makeMenu({ ...menuInfo });
    restaurant.menus.push(menu);

    const updated = await restaurant.save();
    return modelToMenu(updated.menus[updated.menus.length - 1]._doc);
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
   * @param {String} data.restaurantId the ID of the restaurant the menu belongs to
   * @param {String} data.menuId the ID of the menu to be removed
   * @returns an object representing the removed menu
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
   * Updates a menu by the given restaurantId and menuId
   * @param {Object[]} updateObject
   * @param {String} restaurantId the ID of the restaurant that owns the menu
   * @param {String} menuId the ID of the menu to be updated
   * @param {Object} menuInfo object representing the data to be updated
   * @returns an object representing the new menu
   */
  async function updateById({ restaurantId, menuId, ...menuInfo }) {
    const restaurant = await RestaurantModel.findById(restaurantId);
    if (!restaurant) {
      throw new RestaurantNotFoundError(restaurantId);
    }

    const menu = restaurant.menus.id(menuId);
    if (!menu) {
      throw new MenuNotFoundError(restaurantId, menuId);
    }

    menu.set(makeMenu({ ...menu._doc, ...menuInfo }));
    const updated = await restaurant.save();
    const result = updated.menus.id(menuId)._doc;
    return modelToMenu(result);
  }

  /**
   * Converts a model to a Menu object
   * @param {Object[]} menu the menu model to be converted
   * @returns an Object representing a Restaurant
   */
  function modelToMenu({ _id: menuId, name, defaultTaxRate, ...model }) {
    return makeMenu({ menuId, name, defaultTaxRate, ...model });
  }
}
