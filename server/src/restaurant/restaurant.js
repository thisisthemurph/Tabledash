import makeMenu from "../restaurantMenu/menu.js";
import { InvalidPropertyError } from "../helpers/errors.js";
import requiredParam from "../helpers/requiredParam.js";

export default function makeRestaurant(
  restaurantInfo = requiredParam("restaurantInfo")
) {
  const validRestaurant = validate(restaurantInfo);
  const normalRestaurant = normalize(validRestaurant);
  normalRestaurant.menus = validateAndNormalizeMenus(normalRestaurant.menus);
  return Object.freeze(normalRestaurant);

  function validate({
    name = requiredParam("name"),
    users = requiredParam("users"),
    ...otherInfo
  } = {}) {
    validateName(name);
    return { name, users, ...otherInfo };
  }

  function validateName(name) {
    if (name.length < 2) {
      throw new InvalidPropertyError(
        "A restaurant's name must be at least 2 characters in length."
      );
    }
  }

  function normalize({ name, ...otherInfo }) {
    return {
      ...otherInfo,
      name: name,
    };
  }

  /**
   * Validats and normalizes an array of menus
   * @param {Array[]} menus an array of menu documents
   * @returns an array of valid normalized Menu objects
   */
  function validateAndNormalizeMenus(menus) {
    if (menus) {
      return menus.map(makeMenu);
    }

    return [];
  }
}
