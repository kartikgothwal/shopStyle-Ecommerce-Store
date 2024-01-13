require("dotenv").config();
const { UserModel } = require("../model/user");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const { tryCatch } = require("../utils/trycatch");
const { expertError } = require("../utils/expertError");
exports.forgotPassword = tryCatch(async (req, res, next) => {
  // try {
  const { email } = req.body;
  const user = await UserModel.findOne({ email: email });
  if (!user) {
    return expertError(400, "User not found");
  }
  const token = jwt.sign(
    { email: user.email, id: user._id },
    process.env.PRIVATE_KEY,
    {
      algorithm: "RS256",
      expiresIn: "10m",
    }
  );
  const link = `${process.env.CLIENT_URL}/resetpassword/${user._id}/${token}`;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_AUTH_USER,
      pass: process.env.NODEMAILER_AUTH_PASSWORD,
    },
  });
  const mailOptions = {
    from: "donotreply.shopstyle.com",
    to: email,
    subject: "Shop Styles: Reset Password",
    text: link,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("🚀 ~ transporter.sendMail ~ error:", error);
      return expertError(400, "Something went wrong, please try again");
    } else {
      return res.status(200).json({
        message: "Password reset link has been sent to your registered email",
      });
    }
  });
  // } catch (error) {
  //   error.status = 500;
  //   error.message = error.message || "Something went wrong, please try again";
  //   next(error);
  // }
});

exports.confirmUser = async (req, res, next) => {
  try {
    const { userID, token } = req.body;
    const user = await UserModel.findById(userID);
    if (!user) {
      return expertError(401, "Unauthorized Access");
    }
    const decode = jwt.verify(token, process.env.PRIVATE_KEY, {
      algorithm: "RS256",
    });
    if (!decode) {
      return expertError(401, "Unauthorized Access");
    } else {
      return res.status(200).json({ message: "Verified user", user: user._id });
    }
  } catch (error) {
    error.status = 500;
    error.message = "Unauthorized Access";
    next(error);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const { values, verifiedUser } = req.body;
    const hash = bcrypt.hashSync(values.newpassword, 10);
    const user = await UserModel.findByIdAndUpdate(verifiedUser, {
      $set: { password: hash },
    });
    return res.status(200).json({ message: "Password has been reset" });
  } catch (error) {
    error.status = 500;
    error.message = "An error occurred";
    next(error);
  }
};
