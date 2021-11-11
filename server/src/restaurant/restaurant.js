import { InvalidPropertyError } from "../helpers/errors.js";

export default function makeRestaurant(restaurantInfo) {
  const validRestaurant = validate(restaurantInfo);
  const normalRestaurant = normalize(validRestaurant);
  return Object.freeze(normalRestaurant);

  function validate({ name, ...otherInfo } = {}) {
    console.log(`Validating name "${name}"`);
    validateName(name);
    return { name, ...otherInfo };
  }

  function validateName(name) {
    if (name.length < 2) {
      throw new InvalidPropertyError(
        "A restaurant's naame must be at least 2 characters in length"
      );
    }
  }

  function normalize({ name, ...otherInfo }) {
    return {
      ...otherInfo,
      name: name,
    };
  }
}
