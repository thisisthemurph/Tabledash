import makeUser from "./user.js";
import { UserExistsError, UserNotFoundError } from "../helpers/errors.js";
import bcrypt from "bcrypt";

export default function makeUserList({ UserModel }) {
  return Object.freeze({
    add,
    find,
  });

  async function add({ ...userInfo }) {
    const { username, email, password, ...user } = makeUser(userInfo);

    // Verify if a user with username already exists

    const usernameExists = await UserModel.findOne({ username }).lean();
    const emailExists = await UserModel.findOne({ email }).lean();

    if (usernameExists) {
      throw new UserExistsError({ username });
    } else if (emailExists) {
      throw new UserExistsError({ email });
    }

    // Hash the password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user

    let newUser = new UserModel({
      username,
      password: hashedPassword,
      ...user,
    });

    const created = await newUser.save();

    if (!created) {
      throw new Error("There has been an issue creating the new user.");
    }

    return modelToUser(JSON.parse(JSON.stringify(created)));
  }

  async function find({ userId, username, email }) {
    const user = await UserModel.findOne({
      $or: [{ _id: userId }, { username }, { email }],
    });

    if (!user) {
      throw new UserNotFoundError({ userId, username, email });
    }

    return modelToUser(user._doc);
  }

  function modelToUser({ _id: userId, ...model }) {
    return makeUser({ userId, ...model });
  }
}
