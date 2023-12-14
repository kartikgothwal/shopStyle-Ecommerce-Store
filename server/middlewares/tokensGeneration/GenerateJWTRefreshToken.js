const jwt = require("jsonwebtoken");
const privateKey = process.env.PRIVATE_KEY;
const publicKey = process.env.PUBLIC_KEY;
exports.generateRefreshToken = (userData) => {
  try {
    return jwt.sign({ email: userData }, privateKey, {
      algorithm: "RS256",
      expiresIn: "1y",
    });
  } catch (error) {
    console.error("Error generating token:", error);
    throw error;
  }
};
