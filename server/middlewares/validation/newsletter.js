const { check, validationResult } = require("express-validator");

exports.ValidateNewsLetter = [
  check("email").normalizeEmail().isEmail().withMessage("Enter a vaild Email"),
];
exports.newsLetterValidaton = (req, res, next) => {
  const result = validationResult(req).array();
  if (!result.length) {
    return next();
  }
  const error = result[0];
  res.status(400).json({ message: error.msg });
};
