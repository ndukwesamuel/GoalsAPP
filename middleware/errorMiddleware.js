const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
    //   this is to tell the erro that when we are in prodution show null while developent show the error
  });
};

module.exports = {
  errorHandler,
};
