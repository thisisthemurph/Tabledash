import "core-js/stable";
import "regenerator-runtime/runtime";
import faker from "faker";

import handle from ".";
import connectToDatabase, { disconnectFromDatabase } from "../database/db.js";
import { postFakeRestaurant } from "../../tests/fakers/fakeRestaurant.js";
import RestaurntMoel from "../database/models/retaurantSchema.js";
import isJSONString from "../../tests/fixtures/isJSONString.js";
import isErrorObject from "../../tests/fixtures/isErrorObject.js";

describe("Restaurant Endpoint", () => {
  beforeAll(async () => await connectToDatabase());
  afterAll(async () => await disconnectFromDatabase());
  afterEach(async () => await RestaurntMoel.deleteMany({}));

  it("will create a new restaurant", async () => {
    const { dummy, result } = await postFakeRestaurant(handle);

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
    const dummy = {
      name: faker.company.companyName(),
      location: {
        country: faker.address.country(),
        city: faker.address.cityName(),
        postcode: faker.address.zipCode(),
      },
      styles: {},
    };

    const { result } = await postFakeRestaurant(handle, dummy);

    expect(result.statusCode).toEqual(400);
    expect(isErrorObject(JSON.parse(result.data))).toBe(true);
  });

  it("will NOT create a restaurant without a location", async () => {
    const dummy = {
      name: faker.company.companyName(),
      location: {
        country: faker.address.country(),
        city: faker.address.cityName(),
        postcode: faker.address.zipCode(),
      },
      styles: {},
    };

    const { result } = await postFakeRestaurant(handle, dummy);

    expect(result.statusCode).toEqual(400);
    expect(isErrorObject(JSON.parse(result.data))).toBe(true);
  });

  it("will retrieve all restaurants", async () => {
    const r1 = await postFakeRestaurant(handle);
    const r2 = await postFakeRestaurant(handle);
    const r3 = await postFakeRestaurant(handle);
    // await Promise.all([r1, r2, r3]);

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
    const { result: postRes } = await postFakeRestaurant(handle);
    const { created } = JSON.parse(postRes.data);

    const result = await handle({
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
    const { result: postRes } = await postFakeRestaurant(handle);
    const { created } = JSON.parse(postRes.data);

    const result = await handle({
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
    const { result: postRes } = await postFakeRestaurant(handle);

    const { created } = JSON.parse(postRes.data);

    const changes = { name: "Murphy's Irish Bar" };
    const result = await handle({
      method: "PUT",
      pathParams: { id: created.restaurantId },
      body: JSON.stringify(changes),
    });

    expect(result.statusCode).toEqual(200);

    const { success, updated } = JSON.parse(result.data);
    expect(success).toBe(true);
  });
});
