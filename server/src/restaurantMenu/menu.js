import { InvalidPropertyError } from "../helpers/errors.js";

export default function makeMenu(menuInfo) {
  const validMenu = validate(menuInfo);
  const normalMenu = normalize(validMenu);
  return Object.freeze(normalMenu);

  function validate({ name, defaultTaxRate, ...otherInfo } = {}) {
    validateName(name);
    validateDefaultTaxRate(defaultTaxRate);
    return { name, defaultTaxRate, ...otherInfo };
  }

  function validateName(name) {
    if (name.length < 2) {
      throw new InvalidPropertyError(
        "A menu's name must be at least 2 characters in length."
      );
    }
  }

  function validateDefaultTaxRate(defaultTaxRate) {
    if (isNaN(defaultTaxRate)) {
      throw new InvalidPropertyError(
        "A menu's default tax rate must be a numerical value."
      );
    }

    if (defaultTaxRate < 0 || defaultTaxRate > 1) {
      throw new InvalidPropertyError(
        "A menu's default tax rate must be a value between 0 and 1."
      );
    }
  }

  function normalize({ name, ...otherInfo }) {
    return {
      ...otherInfo,
      name,
    };
  }
}
