const User = require("../model/user");
const UserModel = User.UserModel;
const bcrypt = require("bcrypt");
const { tryCatch } = require("../utils/trycatch");
const generateAccessTokenModule = require("../middlewares/tokensGeneration/GenerateJWTAccessToken");
const generateRefreshTokenModule = require("../middlewares/tokensGeneration/GenerateJWTRefreshToken");

exports.UserRegister = tryCatch(async (req, res) => {
  const isExistingUser = await UserModel.findOne({ email: req.body.email });
  if (isExistingUser) {
    return res
      .status(400)
      .json({ message: "User already exists, Please login" });
  }
  const user = new UserModel(req.body);
  const AccessToken = generateAccessTokenModule.generateAccessToken(user.email);
  const RefreshToken = generateRefreshTokenModule.generateRefreshToken(
    user.email
  );
  const hashPassword = bcrypt.hashSync(req.body.password, 10);
  user.AccessToken = AccessToken;
  user.password = hashPassword;
  return await user
    .save()
    .then((data) => {
      res.status(201).json({
        data: { ...data, RefreshToken },
        message: "Registration successful",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
        message: "Registration failed",
      });
    });
});
exports.UserLogin = async (req, res) => {
  try {
    const isExistingUser = await UserModel.findOne({ email: req.body.email });
    if (!isExistingUser) {
      return res
        .status(400)
        .json({ message: "User doesn't Exists, please sign up" });
    }
    const isAuth = bcrypt.compareSync(
      req.body.password,
      isExistingUser.password
    );
    if (!isAuth) {
      return res.status(401).json({ message: "Incorrect Password" });
    }
    const AccessToken = generateAccessTokenModule.generateAccessToken(
      isExistingUser.email
    );
    const RefreshToken = generateRefreshTokenModule.generateRefreshToken(
      isExistingUser.email
    );
    isExistingUser.AccessToken = AccessToken;
    return await isExistingUser
      .save()
      .then((data) => {
        res.status(200).json({
          message: "login Successful",
          data: { ...data, RefreshToken },
        });
      })
      .catch((error) => {
        res.status(400).json({ message: "login failed", error: error.message });
      });
  } catch (error) {
    res.status(500).json({ message: "login failed" });
  }
};
exports.CheckUserWithCookie = async (req, res) => {
  try {
    const UserRefreshToken = req.body;
    if (!UserRefreshToken) {
      res.status(400).json({ message: "something went wrong" });
    }
    const decode = generateAccessTokenModule.verifyToken(UserRefreshToken);
    if (decode.email) {
      const isExistingUser = await UserModel.findOne({ email: decode.email });
      if (!isExistingUser) {
        return res
          .status(400)
          .json({ message: "User doesn't Exists, please sign up" });
      }
      const AccessToken = generateAccessTokenModule.generateAccessToken(
        isExistingUser.email
      );
      isExistingUser.AccessToken = AccessToken;
      return await isExistingUser
        .save()
        .then((data) => {
          res.status(200).json({
            message: "new access token added",
            data: { ...data },
          });
        })
        .catch((error) => {
          res
            .status(400)
            .json({ message: "something went wrong", error: error.message });
        });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};
