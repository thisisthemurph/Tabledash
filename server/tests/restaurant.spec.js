import "core-js/stable";
import "regenerator-runtime/runtime";
import supertest from "supertest";
import http from "http";

import RestaurantModel from "../src/database/models/retaurantSchema.js";
import fakeRestaurantPost from "./fixtures/fakeRestaurantPost.js";
import { disconnectFromDatabase } from "../src/database/db.js";
import { createServer } from "../src/server.js";

let request;
beforeAll(async () => {
  request = supertest(http.createServer(await createServer()));
});

afterAll(async () => {
  await disconnectFromDatabase();
});

// afterEach(async () => {
//   await RestaurantModel.deleteMany({});
//   console.log("Deleted all documents");
// });

describe("Restaurant endpoints", () => {
  it("should POST a new restaurant", async () => {
    const res = await fakeRestaurantPost(request);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.success).toBe(true);
    expect(res.body.created).toBeInstanceOf(Object);
  });

  it("should GET all restaurants", async () => {
    const res = await request.get("/api/restaurant");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.success).toBe(true);
    expect(res.body.restaurants).toBeInstanceOf(Array);
    expect(res.body.restaurants[0]).toBeInstanceOf(Object);
  });

  it("should GET a restaurant by the ID", async () => {
    let res = await fakeRestaurantPost(request);
    const created = res.body.created;
    res = await request.get("/api/restaurant/" + created.restaurantId);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.success).toBe(true);
    expect(res.body.restaurant).toBeInstanceOf(Object);
  });

  it("should DELETE a restauraunt by the ID", async () => {
    let res = await fakeRestaurantPost(request);

    const created = res.body.created;
    res = await request.delete("/api/restaurant/" + created.restaurantId);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.success).toBe(true);
    expect(res.body.deleted).toBeInstanceOf(Object);
  });

  it("should update (PUT) a restaurant", async () => {
    let res = await fakeRestaurantPost(request);
    const restaurantId = res.body.created.restaurantId;

    res = await request.put(`/api/restaurant/${restaurantId}`).send({
      name: "Murphy's Irish Bar",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.success).toBe(true);
    expect(res.body.updated).toBeInstanceOf(Object);
    expect(res.body.updated.name).toEqual("Murphy's Irish Bar");
  });

  it("should fail updating on erroneous restaurantId", async () => {
    const res = await request
      .put("/api/restaurant/6192d8e380f08f178087e51c")
      .send({
        name: "Murphy's Irish Bar",
      });

    expect(res.statusCode).toEqual(404);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toEqual(expect.any(String));
  });
});
