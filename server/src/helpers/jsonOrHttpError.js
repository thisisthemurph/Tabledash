import makeHttpError from "./httpError.js";

/**
 * Parses a JSON string or creates a HTTP error
 * @param {String} data the JSON data to be processed
 * @returns an object if valud JSON otherwise a HTTP error object
 */
export default function jsonOrHttpError(data) {
  if (typeof data === "string") {
    try {
      return JSON.parse(data);
    } catch {
      return makeHttpError({
        statusCode: 400,
        errorMessage: "Bad request. POST body must be valid JSON.",
      });
    }
  }

  return data;
}
