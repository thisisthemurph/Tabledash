import faker from "faker";
import makeMenu from "../../src/restaurantMenu/menu.js";
import makeRestaurant from "../../src/restaurant/restaurant.js";

export function makeFakeRestaurant(spec = {}) {
  return {
    name: faker.company.companyName(),
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
    ...spec,
  };
}

export async function postFakeRestaurant(handle, dummy = makeFakeRestaurant()) {
  const result = await handle({
    method: "POST",
    body: JSON.stringify(dummy),
  });

  return { dummy, result };
}
