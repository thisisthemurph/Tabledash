import makeHttpError from "./httpError.js";

export default function jsonOrHttpError(data) {
  if (typeof data === "string") {
    try {
      return JSON.parse(data);
    } catch {
      makeHttpError({
        statusCode: 400,
        errorMessage: "Bad request. POST body must be valid JSON.",
      });
    }
  }

  return data;
}
