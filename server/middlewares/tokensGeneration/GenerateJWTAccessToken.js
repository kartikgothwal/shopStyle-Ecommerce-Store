const jwt = require("jsonwebtoken");
const privateKey = process.env.PRIVATE_KEY;
const publicKey = process.env.PUBLIC_KEY;
exports.generateAccessToken = (userData) => {
  try {
    return jwt.sign({ email: userData }, privateKey, {
      algorithm: "RS256",
      expiresIn: "10m",
    });
  } catch (error) {
    console.error("Error generating token:", error);
    throw error;
  }
};
exports.verifyToken = (UserRefreshTokenValue) => {
  try {
    const { UserRefreshToken } = UserRefreshTokenValue;
    return jwt.verify(UserRefreshToken, publicKey, {
      algorithm: "RS256",
    });
  } catch (error) {
    console.error("Error generating token:", error);
    throw error;
  }
};
