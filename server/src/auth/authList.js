import bcrypt from "bcrypt";

import { InvalidPropertyError, UserNotFoundError } from "../helpers/errors.js";
import makeUser from "../user/user.js";
import makeAuth from "./auth.js";

export default function makeAuthList({ UserModel }) {
  return Object.freeze({
    login,
  });

  async function login({ ...authInfo }) {
    const { username, password } = makeAuth(authInfo);

    // Ensure the user exists

    const user = await UserModel.findOne({ username })
      .select("+password")
      .lean();
    if (!user) {
      throw new UserNotFoundError({ username });
    }

    // Verify the password

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new InvalidPropertyError("The password is incorrect.");
    }

    return modelToAuthResponse({ success: true, ...user });
  }

  function modelToAuthResponse({ success, _id: userId, ...user }) {
    return { success, user: makeUser({ userId, ...user }) };
  }
}
