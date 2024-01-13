require("dotenv").config();
const { UserModel } = require("../model/user");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
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
        return res.status(400).json({
          message: "Something went wrong, please try again",
          error: error.message,
        });
      } else {
        return res.status(200).json({
          message: "Password reset link has been sent to your registered email",
        });
      }
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to remove", error: error.message });
  }
};

exports.confirmUser = async (req, res) => {
  try {
    const { userID, token } = req.body;
    const user = await UserModel.findById(userID);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }
    const decode = jwt.verify(token, process.env.PRIVATE_KEY, {
      algorithm: "RS256",
    });
    if (!decode) {
      return res.status(401).json({ message: "Unauthorized Access" });
    } else {
      return res.status(200).json({ message: "Verified user", user: user._id });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unauthorized Access", error: error.message });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { values, verifiedUser } = req.body;
    const hash = bcrypt.hashSync(values.newpassword, 10);
    const user = await UserModel.findByIdAndUpdate(verifiedUser, {
      $set: { password: hash },
    });
    return res.status(200).json({ message: "Password has been reset" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};
