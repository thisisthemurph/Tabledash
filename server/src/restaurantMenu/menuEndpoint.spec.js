import "core-js/stable";
import "regenerator-runtime/runtime";
import faker from "faker";

import handle from ".";
import restaurantHandle from "../restaurant";
import connectToDatabase, { disconnectFromDatabase } from "../database/db.js";
import RestaurntMoel from "../database/models/retaurantSchema.js";
import { postFakeMenu } from "../../tests/fakers/fakeMenu.js";
import { postFakeRestaurant } from "../../tests/fakers/fakeRestaurant.js";

describe("Menu Endpoints", () => {
  beforeAll(async () => await connectToDatabase());
  afterAll(async () => await disconnectFromDatabase());
  afterEach(async () => await RestaurntMoel.deleteMany({}));

  it("will add a menu to a restaurant", async () => {
    const { result: postRes } = await postFakeRestaurant(restaurantHandle);
    const { created: restaurant } = JSON.parse(postRes.data);

    const { result, dummy } = await postFakeMenu(
      handle,
      restaurant.restaurantId
    );

    const data = JSON.parse(result.data);
    expect(result.statusCode).toEqual(201);
    expect(data.success).toEqual(true);
    expect(data.created).toMatchObject(dummy);
  });

  it("will NOT create a menu without a name", async () => {
    const { result: postRes } = await postFakeRestaurant(restaurantHandle);
    const { created: restaurant } = JSON.parse(postRes.data);

    const { result } = await postFakeMenu(handle, restaurant.restaurantId, {
      defaultTaxRate: faker.datatype.float({ min: 0.1, max: 1 }),
    });

    expect(result.statusCode).toEqual(400);
    expect(result.data).toEqual(
      JSON.stringify({
        success: false,
        error: "name can not be null or undefined.",
      })
    );
  });

  it("will NOT create a menu without a defaultTaxRate", async () => {
    const { result: postRes } = await postFakeRestaurant(restaurantHandle);
    const { created: restaurant } = JSON.parse(postRes.data);

    const { result } = await postFakeMenu(handle, restaurant.restaurantId, {
      name: "Murphy's Irish Bar",
    });

    expect(result.statusCode).toEqual(400);
    expect(result.data).toEqual(
      JSON.stringify({
        success: false,
        error: "defaultTaxRate can not be null or undefined.",
      })
    );
  });

  it("will get all menus for a given restaurant", async () => {
    const { result: postRes } = await postFakeRestaurant(restaurantHandle);
    const { created: restaurant } = JSON.parse(postRes.data);

    const menuResults = [
      await postFakeMenu(handle, restaurant.restaurantId),
      await postFakeMenu(handle, restaurant.restaurantId),
      await postFakeMenu(handle, restaurant.restaurantId),
    ];

    const result = await handle({
      method: "GET",
      pathParams: { restaurantId: restaurant.restaurantId },
    });

    expect(result.statusCode).toEqual(200);
  });
});
