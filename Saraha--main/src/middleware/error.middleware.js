// global error handler: must keep 4 params so express treats it as an error handler
export function globalErrMiddleware(error, req, res, _next) {
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message,
  });
}
