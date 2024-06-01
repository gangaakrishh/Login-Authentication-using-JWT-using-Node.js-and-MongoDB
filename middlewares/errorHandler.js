const notFound = (req, res, next) => {
  res.status(404);
  next(new Error(`Not Found: ${req?.originalUrl}`));
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode);
  res.json({
    message: err?.message,
    stack: err?.stack,
  });
};
module.exports = { errorHandler, notFound };
