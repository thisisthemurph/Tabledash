import "core-js/stable";
import faker from "faker";
import "regenerator-runtime/runtime";

import handle from ".";
import restaurantHandle from "../restaurant";
import connectToDatabase from "../database/db.js";
import RestaurntMoel from "../database/models/retaurantSchema.js";
import makeFakeRestaurant from "../../tests/fixtures/fakeRestaurant.js";

async function postFakeRestaurant() {
  const dummy = makeFakeRestaurant();
  return await restaurantHandle({
    method: "POST",
    body: JSON.stringify(dummy),
  });
}

beforeAll(() => connectToDatabase());
afterEach(() => RestaurntMoel.deleteMany({}));

describe("Menu Endpoints", () => {
  it("will add a menu to a restaurant", async () => {
    const { data: resultData } = await postFakeRestaurant();
    const { created: restaurant } = JSON.parse(resultData);

    const dummy = {
      name: faker.random.word() + " Menu",
      defaultTaxRate: faker.datatype.float({ min: 0.1, max: 1 }),
    };

    const result = await handle({
      method: "POST",
      pathParams: {
        restaurantId: restaurant.restaurantId,
      },
      body: JSON.stringify(dummy),
    });

    expect(result.statusCode).toEqual(201);

    const data = JSON.parse(result.data);
    expect(data.success).toEqual(true);
    expect(data.created).toMatchObject(dummy);
  });
});
