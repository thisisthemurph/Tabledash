import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../../config.js";

import {
  InvalidPropertyError,
  UnauthorizedAccessError,
  UserNotFoundError,
} from "../helpers/errors.js";
import makeUser from "../user/user.js";
import makeAuth from "./auth.js";

export default function makeAuthList({ User }) {
  return Object.freeze({
    login,
    verifyToken,
  });

  async function login({ ...authInfo }) {
    const { username, password } = makeAuth(authInfo);

    // Ensure the user exists

    const user = await User.findOne({ username }).select("+password").lean();
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

  async function verifyToken({ token }) {
    if (!token) {
      throw new UnauthorizedAccessError("Auth token not provided.");
    }

    const decodedToken = jwt.verify(token, JWT_SECRET);

    if (!decodedToken) {
      throw new UnauthorizedAccessError("Bad token.");
    }

    const { user: decodedUser } = decodedToken;
    let user = await User.findById(decodedUser.userId).lean();

    if (!user) {
      throw new UnauthorizedAccessError("No known user associated with token.");
    }

    user = modelToUser(user);
    return { user, token };
  }

  function modelToAuthResponse({ success, _id: userId, ...user }) {
    return { success, user: makeUser({ userId, ...user }) };
  }

  function modelToUser({ _id: userId, resraurant, ...model }) {
    return makeUser({ userId, ...model });
  }
}
