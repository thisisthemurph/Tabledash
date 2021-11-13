/**
 * Creates a standard HTTP error response
 * @param {Object[]} error the error object
 * @param {Number} error.statusCode the http status code associated with the error
 * @param {String} error.errorMessage the error message
 * @returns a HTTP error response object
 */
export default function makeHttpError({ statusCode, errorMessage }) {
  return {
    headers: {
      "Content-Type": "application/json",
    },
    statusCode,
    data: JSON.stringify({
      success: false,
      error: errorMessage,
    }),
  };
}
