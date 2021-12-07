import { logout } from "../../helper/auth";

const API_URL = "http://localhost:3001/api";

/**
 * Simplifies making a request to the API
 * @param {String} endpoint the endpoint to hit
 * @param {Object} body the body of the request
 * @returns
 */
const makeRequest = async (endpoint, { ...body }) => {
  const config = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  return await fetch(new URL(`${API_URL}/${endpoint}`).toString(), config);
};

/**
 * Log-in the user using the authentication API
 * @param {Object[]} user the user object containing the username and password
 * @param {String} username the users username
 * @param {String} password the users password
 * @returns
 */
export const login = async ({ username, password }) => {
  const response = await makeRequest("auth/login", { username, password });

  if (response && response.ok) {
    const token = response.headers.get("auth-token");
    const { success, user } = await response.json();
    return { success, user, token };
  } else {
    logout();
    return await response.json();
  }
};

/**
 * Verify the user token using the authentication API
 * @param {Object[]} auth the auth object containing the token
 * @param {String} token the token to be verified
 * @returns true if verified, otherwise false
 */
export const verifyToken = async ({ token }) => {
  const response = await makeRequest("auth/verify", { token });
  if (response && response.ok) {
    const { success } = await response.json();
    console.log({ success });
    return success;
  }

  return false;
};
