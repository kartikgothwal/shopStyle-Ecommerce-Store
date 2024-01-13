exports.errorHandler = (error, req, res, next) => {
  console.log("🚀 ~ error:", error);
  let message;
  const status = error.status || 500;
  if (status == 500) {
    message = "Something went wrong!!";
  } else if (status == 401) {
    message = error.message || "Unauthorized Access";
  } else {
    message = error.message || "Something went wrong!!";
  }

  return res.status(status).json({ message: message, error: error.message });
};
