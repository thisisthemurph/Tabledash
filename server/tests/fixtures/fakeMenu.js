import faker from "faker";
import makeMenu from "../../src/restaurantMenu/menu.js";

export default function makeFakeMenu(spec = {}) {
  return makeMenu({
    name: faker.random.word() + " Menu",
    defaultTaxRate: faker.datatype.float({ min: 0.1, max: 1 }),
    ...spec,
  });
}
