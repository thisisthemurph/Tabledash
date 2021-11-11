import makeHttpError from "../helpers/httpError.js";
import makeHttpResponse from "../helpers/httpResponse.js";
import makeRestaurant from "./restaurant.js";

export default function makeRestaurantEndpointHandler({ restaurantList }) {
  return async function handle(httpRequest) {
    switch (httpRequest.method) {
      case "POST":
        return postRestaurant(httpRequest);

      case "GET":
        return getRestaurant(httpRequest);

      case "DELETE":
        return deleteRestaurant(httpRequest);

      default:
        return makeHttpError({
          statusCode: 405,
          errorMessage: `${httpRequest.method} not allowed.`,
        });
    }
  };

  async function postRestaurant(httpRequest) {
    let restaurantInfo = httpRequest.body;

    if (!restaurantInfo) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: "Bad request. No POST body provided.",
      });
    }

    if (typeof restaurantInfo === "string") {
      try {
        restaurantInfo = JSON.parse(restaurantInfo);
      } catch {
        makeHttpError({
          statusCode: 400,
          errorMessage: "Bad request. POST body must be valid JSON.",
        });
      }
    }

    try {
      const restaurant = makeRestaurant(restaurantInfo);
      const created = await restaurantList.add(restaurant);

      return makeHttpResponse({ statusCode: 201, data: { created } });
    } catch (error) {
      return makeHttpError({
        errorMessage: error.message,
        statusCode: error.statusCode() || 500,
      });
    }
  }

  async function getRestaurant(httpRequest) {
    const { id } = httpRequest.pathParams || {};
    const fetchAllRestaurants = !id ? true : false;

    try {
      const result = fetchAllRestaurants
        ? await restaurantList.getItems()
        : await restaurantList.findById({ restaurantId: id });

      return makeHttpResponse({
        data: fetchAllRestaurants
          ? { restaurants: result }
          : { restaurant: result },
      });
    } catch (error) {
      return makeHttpError({
        errorMessage: error.message,
        statusCode: error.statusCode() || 500,
      });
    }
  }

  async function deleteRestaurant(httpRequest) {
    const { id } = httpRequest.pathParams || {};

    try {
      const deleted = await restaurantList.remove({ restaurantId: id });
      return makeHttpResponse({ data: { deleted } });
    } catch (error) {
      return makeHttpError({
        errorMessage: error.message,
        statusCode: error.statusCode() || 500,
      });
    }
  }
}
