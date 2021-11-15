import makeHttpError from "../helpers/httpError.js";
import makeHttpResponse from "../helpers/httpResponse.js";
import jsonOrHttpError from "../helpers/jsonOrHttpError.js";

export default function makeMenuEndpointHandler({ menuList }) {
  return async function handle(httpRequest) {
    switch (httpRequest.method) {
      case "GET":
        return getMenu(httpRequest);

      case "POST":
        return postMenu(httpRequest);

      case "DELETE":
        return deleteMenu(httpRequest);

      default:
        return makeHttpError({
          statusCode: 405,
          errorMessage: `${httpRequest.method} not allowed.`,
        });
    }
  };

  async function postMenu(httpRequest) {
    const { restaurantId } = httpRequest.pathParams || {};
    let menuInfo = httpRequest.body;

    if (!menuInfo) {
      return makeHttpError({
        status: 400,
        errorMessage: `Bad request. No POST body provided.`,
      });
    }

    // Decode JSON or send an error if not JSON
    const jsonResult = jsonOrHttpError(menuInfo);
    if (jsonResult.errorMessage) {
      return jsonResult;
    }

    try {
      const created = await menuList.add({ restaurantId, ...menuInfo });
      return makeHttpResponse({
        statusCode: 201,
        data: { created },
      });
    } catch (e) {
      return makeHttpError({
        errorMessage: error.message,
        statusCode: error.status || 500,
      });
    }
  }

  async function getMenu(httpRequest) {
    const { restaurantId, menuId } = httpRequest.pathParams || {};
    const fetchAllMenus = menuId ? false : true;

    try {
      const result = fetchAllMenus
        ? await menuList.getItems({ restaurantId })
        : await menuList.findById({ restaurantId, menuId });
      return makeHttpResponse({
        data: fetchAllMenus ? { menus: result } : { menu: result },
      });
    } catch (error) {
      return makeHttpError({
        errorMessage: error.message,
        statusCode: error.status || 500,
      });
    }
  }

  async function deleteMenu(httpRequest) {
    const { restaurantId, menuId } = httpRequest.pathParams;

    try {
      const deleted = await menuList.removeById({ restaurantId, menuId });
      return makeHttpResponse({ data: { deleted } });
    } catch (error) {
      return makeHttpError({
        errorMessage: error.message,
        statusCode: error.status || 500,
      });
    }
  }
}
