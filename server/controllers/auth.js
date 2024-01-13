const User = require("../model/user");
const UserModel = User.UserModel;
const bcrypt = require("bcrypt");
const { tryCatch } = require("../utils/trycatch");
const { expertError } = require("../utils/expertError");
const generateAccessTokenModule = require("../middlewares/tokensGeneration/GenerateJWTAccessToken");
const generateRefreshTokenModule = require("../middlewares/tokensGeneration/GenerateJWTRefreshToken");

exports.UserRegister = tryCatch(async (req, res) => {
  const isExistingUser = await UserModel.findOne({ email: req.body.email });
  if (isExistingUser) {
    return expertError(400, "User already exists, Please login");
  }
  const user = new UserModel(req.body);
  const AccessToken = generateAccessTokenModule.generateAccessToken(user.email);
  const RefreshToken = generateRefreshTokenModule.generateRefreshToken(
    user.email
  );
  const hashPassword = bcrypt.hashSync(req.body.password, 10);
  user.AccessToken = AccessToken;
  user.password = hashPassword;
  try {
    const data = await user.save();
    res.status(201).json({
      data: { ...data, RefreshToken },
      message: "Registration successful",
    });
  } catch (error) {
    error.status = 400;
    error.message = "Registration failed";
    next(error);
  }
});
exports.UserLogin = tryCatch(async (req, res) => {
  const isExistingUser = await UserModel.findOne({ email: req.body.email });

  if (!isExistingUser) {
    return expertError(400, "User doesn't Exists, please sign up");
  }
  const isAuth = bcrypt.compareSync(req.body.password, isExistingUser.password);

  if (!isAuth) {
    return expertError(401, "Incorrect Password");
  }
  const AccessToken = generateAccessTokenModule.generateAccessToken(
    isExistingUser.email
  );
  const RefreshToken = generateRefreshTokenModule.generateRefreshToken(
    isExistingUser.email
  );
  isExistingUser.AccessToken = AccessToken;
  try {
    const data = await isExistingUser.save();

    res.status(200).json({
      message: "login Successful",
      data: { ...data, RefreshToken },
    });
  } catch (error) {
    error.status = 400;
    error.message = "login failed";
    next(error);
  }
});
exports.CheckUserWithCookie = tryCatch(async (req, res) => {
  const UserRefreshToken = req.body;
  if (!UserRefreshToken) {
    return expertError(400, "something went wrong");
  }
  const decode = generateAccessTokenModule.verifyToken(UserRefreshToken);
  if (decode.email) {
    const isExistingUser = await UserModel.findOne({ email: decode.email });
    if (!isExistingUser) {
      return expertError(400, "User doesn't Exists, please sign up");
    }
    const AccessToken = generateAccessTokenModule.generateAccessToken(
      isExistingUser.email
    );
    isExistingUser.AccessToken = AccessToken;
    try {
      const data = await isExistingUser.save();
      res.status(200).json({
        message: "new access token added",
        data: { ...data },
      });
    } catch (error) {
      error.status = 400;
      error.message = "something went wrong";
      next(error);
    }
  }
});
