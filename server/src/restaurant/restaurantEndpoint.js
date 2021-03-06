import makeHttpError from "../helpers/httpError.js";
import makeHttpResponse from "../helpers/httpResponse.js";
import jsonOrHttpError from "../helpers/jsonOrHttpError.js";
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

      case "PUT":
        return updateRestaurant(httpRequest);

      default:
        return makeHttpError({
          statusCode: 405,
          errorMessage: `${httpRequest.method} not allowed.`,
        });
    }
  };

  async function postRestaurant(httpRequest) {
    const restaurantInfo = {
      ...httpRequest.body,
      users: [httpRequest.user.userId],
    };

    if (!restaurantInfo) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: "Bad request. No POST body provided.",
      });
    }

    // Error if the data is not JSON of Object
    const jsonResult = jsonOrHttpError(restaurantInfo);
    if (jsonResult.errorMessage) {
      return jsonResult;
    }

    try {
      const restaurant = makeRestaurant(jsonResult);
      const created = await restaurantList.add({
        ...restaurant,
        userId: httpRequest.user.userId,
      });

      return makeHttpResponse({ statusCode: 201, data: { created } });
    } catch (error) {
      return makeHttpError({
        errorMessage: error.message,
        statusCode: error.status || 500,
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
        statusCode: error.status || 500,
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
        statusCode: error.status || 500,
      });
    }
  }

  async function updateRestaurant(httpRequest) {
    const { id } = httpRequest.pathParams || {};
    const restaurantInfo = httpRequest.body;

    try {
      const updated = await restaurantList.update({
        restaurantId: id,
        ...restaurantInfo,
      });

      return makeHttpResponse({ statusCode: 200, data: { updated } });
    } catch (error) {
      return makeHttpError({
        errorMessage: error.message,
        statusCode: error.status || 500,
      });
    }
  }
}
