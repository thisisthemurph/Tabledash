import requiredParam from "../helpers/requiredParam.js";
import { InvalidPropertyError } from "../helpers/errors.js";

export default function makeUser(userInfo = requiredParam("userInfo")) {
  console.log({ userInfo });
  const validUser = validate(userInfo);
  const normalUser = normalize(validUser);
  return Object.freeze(normalUser);

  function validate({
    name = requiredParam("name"),
    email,
    username = requiredParam("username"),
    password,
    isAdmin,
    ...otherInfo
  }) {
    validateUsername(username);
    validateEmail(isAdmin, email);
    return { ...otherInfo, name, email, username, password, isAdmin };
  }

  function validateUsername(username) {
    // Validate the length of the username is correct
    if (username.length < 3) {
      throw new InvalidPropertyError(
        "a username must be 3 characters or more in length."
      );
    }

    if (username.length > 32) {
      throw new InvalidPropertyError(
        "A username cannot be more than 36 characters in length."
      );
    }

    // Validat the username only includes the required characters
    const sanctionedCharacters = "abcdefghijklmnopqrstuvwxyz_-.0123456789";
    username.split("").forEach((letter) => {
      if (!sanctionedCharacters.includes(letter.toLowerCase())) {
        throw new InvalidPropertyError(
          "A username must include only letters a - z, dashes, underscores and dots (periods)."
        );
      }
    });
  }

  function validateEmail(isAdmin, email) {
    if (isAdmin && !email) {
      throw new InvalidPropertyError(
        "An admin user must have an email address."
      );
    }
  }

  function normalize({ username, password, isAdmin, ...otherInfo }) {
    username = normalizeUsername(username);
    isAdmin = normalizeIsAdmin(isAdmin);

    // The password is not inclued
    return { username, isAdmin, ...otherInfo };
  }

  function normalizeUsername(username) {
    return username.toLowerCase();
  }

  /**
   * Normalises the isAdmin boolean value
   * @param {Boolean} isAdmin
   * @returns false if isAdmin is undefined or null, otherwise returns isAdmin
   */
  function normalizeIsAdmin(isAdmin) {
    return isAdmin ?? false;
  }
}
