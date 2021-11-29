import makeHttpError from "../helpers/httpError.js";
import jsonOrHttpError from "../helpers/jsonOrHttpError.js";
import makeHttpResponse from "../helpers/httpResponse.js";
import makeUser from "./user.js";

export default function makeUserEndpointHandler({ userList }) {
  return async function handle(httpRequest) {
    switch (httpRequest.method) {
      case "GET":
        return getUser(httpRequest);

      case "POST":
        return postUser(httpRequest);

      case "DELETE":
        return deleteUser(httpRequest);

      default:
        return makeHttpError({
          statusCode: 405,
          errorMessage: `Bad requesr. ${httpRequest.method} not allowed.`,
        });
    }
  };

  async function getUser(httpRequest) {
    const { userId, username } = httpRequest.pathParams;

    try {
      const user = await userList.find({ userId, username });

      return makeHttpResponse({
        statusCode: 200,
        data: { user },
      });
    } catch (error) {
      return makeHttpError({
        errorMessage: error.message,
        statusCode: error.status || 500,
      });
    }
  }

  async function postUser(httpRequest) {
    const userInfo = httpRequest.body;

    if (!userInfo) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: "Bad request. No POST body provided.",
      });
    }

    // Error if the data was not JSON
    const jsonResult = jsonOrHttpError(userInfo);
    if (jsonResult.errorMessage) {
      return jsonResult;
    }

    try {
      const user = makeUser(jsonResult);
      const created = await userList.add(user);

      return makeHttpResponse({
        statusCode: 201,
        data: { created },
      });
    } catch (error) {
      return makeHttpError({
        statusCode: error.status || 500,
        errorMessage: error.message,
      });
    }
  }

  async function deleteUser(httpRequest) {
    const { userId } = httpRequest.pathParams;

    try {
      const deleted = userList.delete(userId);

      return makeHttpResponse({
        statusCode: 200,
        data: { deleted },
      });
    } catch (error) {
      return makeHttpError({
        errorMessage: error.message,
        statusCode: error.status || 500,
      });
    }
  }
}
