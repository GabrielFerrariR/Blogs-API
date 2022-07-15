const errorMiddleWare = (err, _req, res, _next) => {
  console.log('🚀 ~ file: error.js ~ line 11 ~ errorMiddleWare ~ err', err.message);
  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  if (err.message === 'jwt malformed') {
    return res.status(401).json({ message: 'Expired or invalid token' });
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