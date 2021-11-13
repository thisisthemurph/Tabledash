import {
  MenuNotFoundError,
  RestaurantNotFoundError,
} from "../helpers/errors.js";
import makeMenu from "./menu.js";

export default function makeMenuList({ RestaurantModel }) {
  return Object.freeze({ add, findById, removeById, getItems });

  async function add({ restaurantId, ...menuInfo }) {
    const restaurant = await RestaurantModel.findById(restaurantId);

    if (!restaurant) {
      throw new RestaurantNotFoundError(restaurantId);
    }

    let menu = makeMenu({ ...menuInfo });
    restaurant.menus.push(menu);
    await restaurant.save();
    return menu;
  }

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

  async function getItems({ restaurantId }) {
    const restaurant = await RestaurantModel.findById(restaurantId);
    if (!restaurant) {
      throw new RestaurantNotFoundError(restaurantId);
    }

    return restaurant.menus.map((menu) => modelToMenu(menu._doc));
  }

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

  function modelToMenu({ _id: menuId, ...model }) {
    return makeMenu({ menuId, ...model });
  }
}
