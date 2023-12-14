// auth.js
const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth");
const {
  validateUserSignUp,
  validateUserSignIn,
  userValidation,
} = require("../middlewares/validation/user");

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
  .post("/authuser", AuthController.CheckUserWithCookie);

exports.router = router;
