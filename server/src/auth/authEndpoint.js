import jwt from "jsonwebtoken";

import makeHttpError from "../helpers/httpError.js";
import makeHttpResponse from "../helpers/httpResponse.js";
import { JWT_SECRET } from "../../config.js";
import makeAuth from "./auth.js";

export default function makeAuthEndpointHandler({ authList }) {
  return async function handle(httpRequest) {
    switch (httpRequest.method) {
      case "POST":
        const { action } = httpRequest.pathParams;

        switch (action) {
          case "login":
            return login(httpRequest);

          case "verify":
            return verifyToken(httpRequest);

          default:
            return makeHttpError({
              statusCode: 404,
              errorMessage: "Unknown authentication route",
            });
        }

      default:
        return makeHttpError({
          statusCode: 405,
          errorMessage: `Bad request. ${httpRequest.method} not allowed.`,
        });
    }
  };

  async function verifyToken(httpRequest) {
    const { token: userToken } = httpRequest.body;

    try {
      const { user, token } = await authList.verifyToken({ token: userToken });
      return makeHttpResponse({ data: { user, token } });
    } catch (error) {
      return makeHttpError({
        statusCode: error.status || 500,
        errorMessage: error.message,
      });
    }
  }

  async function login(httpRequest) {
    const { username, password } = makeAuth(httpRequest.body);

    try {
      const result = await authList.login({ username, password });

      if (!result) {
        return makeHttpError({
          statusCode: 500,
          errorMessage:
            "It has not been possible to complete the login at this time.",
        });
      }

      const token = jwt.sign(result, JWT_SECRET);
      return makeHttpResponse({
        data: result,
        headers: { "auth-token": token },
      });
    } catch (error) {
      return makeHttpError({
        statusCode: error.status || 500,
        errorMessage: error.message,
      });
    }
  }
}
