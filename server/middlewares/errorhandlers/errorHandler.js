exports.errorHandler = (error, req, res, next) => {
  let message;
  const status = error.status || 500;
  if (status == 500) {
    message = "Something went wrong!!";
  } else {
    message = error.message || "Something went wrong!!";
  }
  return res.status(status).json({ message: message, error: error.message });
};
