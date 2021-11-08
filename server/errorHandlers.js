function logErrors(error, req, res, next) {
  console.error(error.message || "Internal Server Error");
  next(error);
}

function errorHandler(error, req, res, next) {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    },
  });
}

function notFoundErrorHandler(req, res, next) {
  res.status(404).send({
    status: 404,
    error: "Resource not found.",
  });
}

export default {
  logErrors,
  errorHandler,
  notFoundErrorHandler,
};
