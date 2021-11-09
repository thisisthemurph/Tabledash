import { getRestaurantById } from "./restaurant.methods.js";
import { MenuNotFoundError } from "./method.errors.js";

export async function getRestaurantMenuById(restaurantId, menuId) {
  const restaurant = await getRestaurantById(restaurantId);
  const menu = restaurant.menus.id(menuId);

  if (!menu) {
    throw new MenuNotFoundError();
  }

  return menu;
}

export async function addMenuToRestaurant(restaurantId, menu) {
  const restaurant = await getRestaurantById(restaurantId);
  restaurant.menus.push(menu);

  return await restaurant.save();
}

export async function deleteRestaurantMenuById(restaurantId, menuId) {
  const restaurant = await getRestaurantById(restaurantId, menuId);
  const menuToRemove = restaurant.menus.id(menuId);

  if (!menuToRemove) {
    throw new MenuNotFoundError();
  }

  await menuToRemove.remove();
  await restaurant.save();

  return menuToRemove;
}
