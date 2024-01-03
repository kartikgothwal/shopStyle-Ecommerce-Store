// auth.js
const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth");
const {
  validateUserSignUp,
  validateUserSignIn,
  userValidation,
} = require("../middlewares/validation/user");
const {
  ValidateNewsLetter,
  newsLetterValidaton,
} = require("../middlewares/validation/newsletter");
const {
  ValidateUser,
  ValidateUserValidaton,
} = require("../middlewares/validation/forgotpassword");
const {
  forgotPassword,
  confirmUser,
  updatePassword,
} = require("../controllers/forgotpassword");

router.post(
  "/login",
  validateUserSignIn,
  userValidation,
  AuthController.UserLogin
);
router
  .post(
    "/register",
    validateUserSignUp,
    userValidation,
    AuthController.UserRegister
  )
  .post(
    "/forgotpassword",
    ValidateNewsLetter,
    newsLetterValidaton,
    forgotPassword
  )
  .post("/forgotpassword/confirmuser", confirmUser)
  .patch("/resetpassword", updatePassword)
  .post("/authuser", AuthController.CheckUserWithCookie);

exports.router = router;
