export class RestaurantNotFoundError extends Error {
  constructor(restaurantId) {
    super(`Restaurant with ID ${restaurantId} could not be found.`);
    Error.captureStackTrace(this, this.constructor);
    this.status = 404;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RestaurantNotFoundError);
    }
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
}

export class UserNotFoundError extends Error {
  constructor({ userId, username, email }) {
    console.log({ userId, username, email });
    const key = userId ? "ID" : username ? "username" : "email";
    const value = userId ? userId : username ? username : email;

    super(`User with ${key} of ${value} could not be found.`);
    Error.captureStackTrace(this, this.constructor);
    this.status = 404;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UserNotFoundError);
    }
  }
}

export class UserExistsError extends Error {
  constructor({ username, email }) {
    const key = username ? "username" : "email";
    const value = username ? username : email;
    super(`User with ${key} of ${value} already exists.`);
    Error.captureStackTrace(this, this.constructor);
    this.status = 400;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UserExistsError);
    }
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
}

export class UniqueConstraintError extends Error {
  constructor(value) {
    super(`${value} must be unique.`);
    this.status = 400;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UniqueConstraintError);
    }
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
}
