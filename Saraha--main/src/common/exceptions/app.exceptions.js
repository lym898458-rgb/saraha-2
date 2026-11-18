import { AppError } from "./app.error.js";

export function BadReqException({ errMsg = "Bad Request", cause = { statusCode: 400 } } = {}) {
  throw new AppError(errMsg, cause.statusCode);
}

export function ConflictException({ errMsg = "Conflict", cause = { statusCode: 409 } } = {}) {
  throw new AppError(errMsg, cause.statusCode);
}

export function NotFoundException({ errMsg = "Not Found", cause = { statusCode: 404 } } = {}) {
  throw new AppError(errMsg, cause.statusCode);
}
