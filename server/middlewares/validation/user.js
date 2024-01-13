const { check, validationResult } = require("express-validator");

exports.validateUserSignUp = [
  check("firstname")
    .trim()
    .custom((value) => {
      if (!value) {
        throw new Error("Firstname is required");
      }
      return true;
    })
    .isLength({ min: 2, max: 25 })
    .withMessage("firstname must be of min 2 character and max 25"),
  check("lastname")
    .trim()
    .custom((value) => {
      if (!value) {
        throw new Error("Lastname is required");
      }
      return true;
    })
    .isLength({ min: 2, max: 25 })
    .withMessage("lastname must be of min 2 character and max 25"),
  check("email")
    .custom((value) => {
      if (!value) {
        throw new Error("Email is required");
      }
      return true;
    })
    .normalizeEmail()
    .isEmail()
    .withMessage("Enter a vaild Email"),
  check("password")
    .trim()
    .custom((value) => {
      if (!value) {
        throw new Error("Password is required");
      }
      return true;
    })
    .isLength({ min: 8 })
    .withMessage("password must be of min 8 character")
    .custom((value) => {
      const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
      if (!passwordPattern.test(value)) {
        throw new Error(
          "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character."
        );
      }
      return true;
    }),
];
exports.validateUserSignIn = [
  check("email")
    .custom((value) => {
      if (!value) {
        throw new Error("Email is required");
      }
      return true;
    })
    .normalizeEmail()
    .isEmail()
    .withMessage("Enter a vaild Email"),
  check("password")
    .trim()
    .custom((value) => {
      if (!value) {
        throw new Error("Password is required");
      }
      return true;
    })
    .isLength({ min: 8 })
    .withMessage("Password must be of min 8 character")
    .custom((value) => {
      const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

      if (!passwordPattern.test(value)) {
        throw new Error(
          "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character."
        );
      }
      return true;
    }),
];
exports.userValidation = (req, res, next) => {
  const result = validationResult(req).array();

  if (!result.length) {
    return next();
  }
  const error = result[0];

  res.status(400).json({ message: error.msg });
};
