export class RestaurantNotFoundError extends Error {
  constructor(restaurantId) {
    super(`Restaurant with ID ${restaurantId} could not be found.`);
    Error.captureStackTrace(this, this.constructor);
    this.status = 404;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RestaurantNotFoundError);
    }
  }

  statusCode() {
    return this.status;
  }
}

export class MenuNotFoundError extends Error {
  constructor(restaurantId, menuId) {
    super(
      `Menu with ID ${menuId} could not be found for restaurant with ID ${restaurantId}.`
    );
    this.status = 404;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MenuNotFoundError);
    }
  }

  statusCode() {
    return this.status;
  }
}

export class InvalidPropertyError extends Error {
  constructor(msg) {
    super(msg);
    this.status = 400;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidPropertyError);
    }
  }

  statusCode() {
    return this.status;
  }
}

export class UniqueConstraintError extends Error {
  constructor(value) {
    super(`${value} must be unique.`);
    this.status = 400;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UniqueConstraintError);
    }
  }

  statusCode() {
    return this.status;
  }
}

export class RequiredParameterError extends Error {
  constructor(param) {
    super(`${param} can not be null or undefined.`);
    this.status = 400;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RequiredParameterError);
    }
  }

  statusCode() {
    return this.status;
  }
}
