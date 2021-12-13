import client from "../api-client";

export const getRestaurantById = async ({ restaurantId }) => {
  const restaurant = await client(`restaurant/${restaurantId}`);
  return restaurant;
};

export const createRestaurant = async ({ ...restaurantInfo }) => {
  const created = await client("restaurant", { body: restaurantInfo });
  return created;
};

export const updateRestaurant = async ({ restaurantId, ...restaurantInfo }) => {
  const updated = await client(`restaurant/${restaurantId}`, {
    body: { ...restaurantInfo },
    method: "PUT",
  });

  return updated;
};
