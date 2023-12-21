const jwt = require("jsonwebtoken");
const publicKey = process.env.PUBLIC_KEY;
exports.UserTokenAuthorization = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }
    const token = authorizationHeader.split("Bearer ")[1];
    const decode = jwt.verify(token, publicKey, { algorithms: "RS256" });
    if (decode) {
      next();
    } else {
      console.error("JWT verification error:", error);
      return res.status(401).json({ message: "Unauthorized Access" });
    }
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(401).json({ message: "Unauthorized Access" });
  }
};
