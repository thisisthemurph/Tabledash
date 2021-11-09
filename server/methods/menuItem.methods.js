import { getRestaurantById } from "./restaurant.methods.js";
import { MenuNotFoundError } from "./method.errors.js";

export async function addItemToMenu(restaurantId, menuId, menuItem) {
  const restaurant = await getRestaurantById(restaurantId);
  const menu = restaurant.menus.id(menuId);

  if (!menu) {
    throw new MenuNotFoundError();
  }

  menu.items.push(menuItem);

  await restaurant.save();
  return menu;
}
