export class ApiError extends Error {
  constructor(
    statusCode = 500,
    message = "internal server error",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors
    this.data = null;
    this.cause = message;
    this.success = false;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace = (this, this.constructor);
    }
  }
}
