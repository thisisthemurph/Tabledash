export class RestaurantNotFoundError extends Error {
  constructor(message = "Could not locate restaurant with the given ID.") {
    super(message);
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.status = 404;
  }

  statusCode() {
    return this.status;
  }
}

export class MenuNotFoundError extends Error {
  constructor(
    message = "No menu located with the given ID for the given restaurant."
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.status = 404;
  }

  statusCode() {
    return this.status;
  }
}
