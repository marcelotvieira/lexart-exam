import { StatusCodes } from 'http-status-codes';

export class ApiError extends Error {
  message;
  statusCode;

  constructor(message, statusCode) {
    super()
    this.message = message
    this.statusCode = statusCode
    Error.captureStackTrace(this, this.constructor)
  }

  static handler(error, _req, res, _next) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        message: error,
        details: error.message
      })
    }

    return res.status(500).json({
      message: "Erro interno",
      details: error,
    })
  }

  static notFound(message) {
    throw new ApiError(message, StatusCodes.NOT_FOUND)
  }

  static unauthorized(message) {
    throw new ApiError(message, StatusCodes.UNAUTHORIZED)
  }

  static unprocessable(message) {
    throw new ApiError(message, StatusCodes.UNPROCESSABLE_ENTITY)
  }

  static badRequest(message) {
    throw new ApiError(message, StatusCodes.BAD_REQUEST)
  }
}