const errorMiddleWare = (err, _req, res, _next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  res.status(500).json({ message: err.message });
};
function CustomError(status, message) {
    this.statusCode = status;
    this.message = message;
}

module.exports = {
  errorMiddleWare,
  CustomError,
};