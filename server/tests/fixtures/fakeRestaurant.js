import faker from "faker";
import makeRestaurant from "../../src/restaurant/restaurant.js";

export default function makeFakeRestaurant(spec = {}) {
  return makeRestaurant({
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
  });
}
