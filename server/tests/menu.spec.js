import "core-js/stable";
import "regenerator-runtime/runtime";
import supertest from "supertest";
import http from "http";

import fakeMenuPost from "./fixtures/fakeMenuPost.js";
import fakeRestaurantPost from "./fixtures/fakeRestaurantPost.js";
import { disconnectFromDatabase } from "../src/database/db.js";
import { createServer } from "../src/server.js";

let request;
beforeAll(async () => {
  request = supertest(http.createServer(await createServer()));
});

afterAll(async () => {
  disconnectFromDatabase();
});

describe("Menu endpoints", () => {
  it("should POST a new menu to a restaurant", async () => {
    let res = await fakeRestaurantPost(request);
    const restaurantId = res.body.created.restaurantId;
    res = await fakeMenuPost(request, restaurantId);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.success).toBe(true);
    expect(res.body.created).toBeInstanceOf(Object);
  });

  it("should GET all menus for a restaurant", async () => {
    let res = await fakeRestaurantPost(request);
    const restaurantId = res.body.created.restaurantId;
    const menu1 = fakeMenuPost(request, restaurantId);
    const menu2 = fakeMenuPost(request, restaurantId);
    const menu3 = fakeMenuPost(request, restaurantId);
    await Promise.all([menu1, menu2, menu3]);

    res = await request.get(`/api/restaurant/${restaurantId}/menu`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.success).toBe(true);
    expect(res.body.menus).toBeInstanceOf(Array);
    expect(res.body.menus.length).toEqual(3);
  });

  it("should GET a specific menu for a restaurant", async () => {
    let res = await fakeRestaurantPost(request);
    const restaurantId = res.body.created.restaurantId;
    res = await fakeMenuPost(request, restaurantId);
    console.log({ body: res.body });
    const menuId = res.body.created.menuId;

    const ep = `/api/restaurant/${restaurantId}/menu/${menuId}`;
    console.log({ ep });
    res = await request.get(ep);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.success).toBe(true);
    expect(res.body.menu).toBeInstanceOf(Object);
  });
});