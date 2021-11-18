import "core-js/stable";
import "regenerator-runtime/runtime";
import faker from "faker";

import handle from ".";
import connectToDatabase from "../database/db.js";
import makeFakeRestaurant from "../../tests/fixtures/fakeRestaurant.js";
import RestaurntMoel from "../database/models/retaurantSchema.js";

function isJSONString(data) {
  try {
    const json = JSON.parse(data);
    const objType = Object.prototype.toString.call(json);
    if (!(objType.endsWith("Object]") || objType.endsWith("Array]"))) {
      return false;
    }
  } catch (e) {
    return false;
  }

  return true;
}

function isErrorObject({ success, error }) {
  return success === false && typeof error === "string";
}

beforeAll(async () => await connectToDatabase());
afterEach(async () => await RestaurntMoel.deleteMany({}));

describe("Restaurant Endpoint", () => {
  it("will create a new restaurant", async () => {
    const dummy = makeFakeRestaurant();
    const result = await handle({
      method: "POST",
      body: JSON.stringify(dummy),
    });

    expect(result.statusCode).toEqual(201);
    expect(result.headers).toEqual({ "Content-Type": "application/json" });
    expect(result.data).toEqual(expect.any(String));
    expect(isJSONString(result.data)).toEqual(true);

    const data = JSON.parse(result.data);
    const restaurant = data.created;

    expect(data.success).toBe(true);
    expect(restaurant.name).toBe(dummy.name);
    expect(restaurant).toMatchObject(restaurant);
    expect(restaurant.users).toHaveLength(1);
  });

  it("will NOT create a restaurant without a name", async () => {
    const dummyRestaurant = {
      // name: faker.company.companyName(),
      location: {
        country: faker.address.country(),
        city: faker.address.cityName(),
        postcode: faker.address.zipCode(),
      },
      users: [
        {
          name: faker.name.firstName() + " " + faker.name.lastName(),
          username: faker.internet.userName(),
          password: faker.internet.password(),
          isAdmin: false,
        },
      ],
      styles: {},
    };

    const result = await handle({
      method: "POST",
      body: JSON.stringify(dummyRestaurant),
    });

    expect(result.statusCode).toEqual(400);
    expect(isErrorObject(JSON.parse(result.data))).toBe(true);
  });

  it("will NOT create a restaurant without a user", async () => {
    const dummyRestaurant = {
      name: faker.company.companyName(),
      location: {
        country: faker.address.country(),
        city: faker.address.cityName(),
        postcode: faker.address.zipCode(),
      },
      styles: {},
    };

    const result = await handle({
      method: "POST",
      body: JSON.stringify(dummyRestaurant),
    });

    expect(result.statusCode).toEqual(400);
    expect(isErrorObject(JSON.parse(result.data))).toBe(true);
  });

  it("will NOT create a restaurant without a location", async () => {
    const dummyRestaurant = {
      name: faker.company.companyName(),
      location: {
        country: faker.address.country(),
        city: faker.address.cityName(),
        postcode: faker.address.zipCode(),
      },
      styles: {},
    };

    const result = await handle({
      method: "POST",
      body: JSON.stringify(dummyRestaurant),
    });

    expect(result.statusCode).toEqual(400);
    expect(isErrorObject(JSON.parse(result.data))).toBe(true);
  });

  it("will retrieve all restaurants", async () => {
    // Create the test restaurants

    const r1 = handle({
      method: "POST",
      body: JSON.stringify(makeFakeRestaurant()),
    });
    const r2 = handle({
      method: "POST",
      body: JSON.stringify(makeFakeRestaurant()),
    });
    const r3 = handle({
      method: "POST",
      body: JSON.stringify(makeFakeRestaurant()),
    });
    await Promise.all([r1, r2, r3]);

    // Now the testing

    const result = await handle({ method: "GET" });

    expect(result.statusCode).toEqual(200);

    const { success, restaurants } = JSON.parse(result.data);
    expect(success).toBe(true);
    expect(restaurants).toBeInstanceOf(Array);
    expect(restaurants).toHaveLength(3);
    expect(restaurants[0]).toMatchObject(r1);
    expect(restaurants[1]).toMatchObject(r2);
    expect(restaurants[2]).toMatchObject(r3);
  });

  it("will retrieve a restaurant by its ID", async () => {
    const dummy = makeFakeRestaurant();
    let result = await handle({
      method: "POST",
      body: JSON.stringify(dummy),
    });

    const { created } = JSON.parse(result.data);
    result = await handle({
      method: "GET",
      pathParams: { id: created.restaurantId },
    });

    expect(result.statusCode).toEqual(200);

    const { success } = JSON.parse(result.data);
    expect(success).toBe(true);
  });

  it("will NOT fetch a restaurant with an unknown ID", async () => {
    const fakeId = "6194b60999d44319bb709a6d";
    const result = await handle({
      method: "GET",
      pathParams: { id: fakeId },
    });

    expect(result.statusCode).toEqual(404);

    const { success, error } = JSON.parse(result.data);
    expect(success).toBe(false);
    expect(error).toEqual(`Restaurant with ID ${fakeId} could not be found.`);
  });

  it("will delete a restaurant by its ID", async () => {
    const dummy = makeFakeRestaurant();
    let result = await handle({
      method: "POST",
      body: JSON.stringify(dummy),
    });

    const { created } = JSON.parse(result.data);

    result = await handle({
      method: "DELETE",
      pathParams: { id: created.restaurantId },
    });

    expect(result.statusCode).toEqual(200);

    const { success, deleted } = JSON.parse(result.data);
    expect(success).toBe(true);
    expect(deleted).toMatchObject(created);
  });

  it("will NOT delete restaurant with unknown ID", async () => {
    const fakeId = "6194b60999d44319bb709a6d";
    const result = await handle({
      method: "DELETE",
      pathParams: { id: fakeId },
    });

    expect(result.statusCode).toEqual(404);

    const { success, error } = JSON.parse(result.data);
    expect(success).toBe(false);
    expect(error).toEqual(`Restaurant with ID ${fakeId} could not be found.`);
  });

  it("will update a restaurant", async () => {
    const dummy = makeFakeRestaurant();
    let result = await handle({
      method: "POST",
      body: JSON.stringify(dummy),
    });

    const { created } = JSON.parse(result.data);

    const changes = { name: "Murphy's Irish Bar" };
    result = await handle({
      method: "PUT",
      pathParams: { id: created.restaurantId },
      body: JSON.stringify(changes),
    });

    expect(result.statusCode).toEqual(200);

    const { success, updated } = JSON.parse(result.data);
    expect(success).toBe(true);
  });
});
