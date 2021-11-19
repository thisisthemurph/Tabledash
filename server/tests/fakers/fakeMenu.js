import faker from "faker";
import makeMenu from "../../src/restaurantMenu/menu.js";

export function makeFakeMenu(spec = {}) {
  return {
    name: faker.random.word() + " Menu",
    defaultTaxRate: faker.datatype.float({ min: 0.1, max: 1 }),
    ...spec,
  };
}

export async function postFakeMenu(
  handle,
  restaurantId,
  dummy = makeFakeMenu()
) {
  const result = await handle({
    method: "POST",
    pathParams: { restaurantId },
    body: JSON.stringify(dummy),
  });

  return { dummy, result };
}
