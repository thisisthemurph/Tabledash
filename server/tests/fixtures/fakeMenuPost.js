import makeFakeMenu from "./fakeMenu.js";

export default async function (request, restaurantId) {
  const dummyMenu = makeFakeMenu();
  return await request
    .post(`/api/restaurant/${restaurantId}/menu`)
    .send(dummyMenu)
    .set("Accept", "application/json");
}
