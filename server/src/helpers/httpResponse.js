/**
 * Makes a standardised HTTP response object
 * @param {Object[]} response the response object
 * @param {Number} response.statusCode the HTTP status code, defaults to 200
 * @param {Object} response.data the data object to be sent with the response, defaults to null
 * @returns a response object
 */
export default function makeHttpResponse({ statusCode = 200, data = null }) {
  const response = {
    headers: {
      "Content-Type": "application/json",
    },
    statusCode,
  };

  if (data) {
    const success = statusCode >= 200 && statusCode < 300 ? true : false;
    response["data"] = JSON.stringify({ success, ...data });
  }

  return response;
}
