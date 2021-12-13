import client from "../api-client";

export const getUser = async ({ userId }) => {
  const user = await client(`user/${userId}`);
  return user;
};

export const createUser = async ({ ...userInfo }) => {
  const created = await client("user", { body: userInfo });
  return created;
};

export const updateUser = async ({ userId, ...userInfo }) => {
  const updated = await client(`user/${userId}`, {
    body: { ...userInfo },
    method: "PUT",
  });

  return updated;
};
