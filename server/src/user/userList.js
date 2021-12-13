import makeUser from "./user.js";
import { UserExistsError, UserNotFoundError } from "../helpers/errors.js";
import bcrypt from "bcrypt";

export default function makeUserList({ User }) {
  return Object.freeze({
    add,
    find,
    update,
  });

  async function add({ password, ...userInfo }) {
    const { username, email, ...user } = makeUser(userInfo);

    // Verify if a user with username already exists

    const usernameExists = await User.findOne({ username }).lean();
    const emailExists = await User.findOne({ email }).lean();

    if (usernameExists) {
      throw new UserExistsError({ username });
    } else if (emailExists) {
      throw new UserExistsError({ email });
    }

    // Hash the password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user

    let newUser = new User({
      username,
      email,
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
    const user = await User.findOne({
      $or: [{ _id: userId }, { username }, { email }],
    });

    if (!user) {
      throw new UserNotFoundError({ userId, username, email });
    }

    return modelToUser(user._doc);
  }

  async function update({ userId, ...userInfo }) {
    const updated = await User.findByIdAndUpdate(
      userId,
      { ...userInfo },
      { returnDocument: "after" }
    );

    if (!updated) {
      throw new UserNotFoundError({ userId });
    }

    return modelToUser(updated._doc);
  }

  function modelToUser({ _id: userId, __v, ...model }) {
    return makeUser({ userId, ...model });
  }
}
