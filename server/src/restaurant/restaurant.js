import makeMenu from "../restaurantMenu/menu.js";
import { InvalidPropertyError } from "../helpers/errors.js";

export default function makeRestaurant(restaurantInfo) {
  const validRestaurant = validate(restaurantInfo);
  const normalRestaurant = normalize(validRestaurant);
  normalRestaurant.menus = validateAndNormalizeMenus(normalRestaurant.menus);
  return Object.freeze(normalRestaurant);

  function validate({ name, ...otherInfo } = {}) {
    validateName(name);
    return { name, ...otherInfo };
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

  function validateAndNormalizeMenus(menus) {
    if (menus) {
      return menus.map(makeMenu);
    }

    return [];
  }
}
