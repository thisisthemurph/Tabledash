import makeFakeRestaurant from "./fakeRestaurant.js";

/**
 * Creates a fake restaurant and posts it to the API
 * @returns a HTTP response from the created restaurant
 */
export default async function fakeRestaurantPost(request) {
  const dummyRestaurant = makeFakeRestaurant();
  return await request
    .post("/api/restaurant")
    .send(dummyRestaurant)
    .set("Accept", "application/json");
}
