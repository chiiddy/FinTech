import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();

const config = process.env.JWT_SECRET_KEY;

const verifyToken = (req, res, next) => {
  // Check if config is defined
 
if (!config) {
  console.error("Secret key is not set");
  process.exit(1);
}

  const authHeader = req.headers["authorization"]?.split(" ");
  if (req.headers["authorization"]) {
    try {
      if (authHeader[0] !== "Bearer") {
        return res.status(403).json({ message: "Login Required" });
      } else {
        jwt.verify(authHeader[1], config, (err, user) => {
          if (err) {
            console.log(err);
            return res.status(401).json({ message: "User not authorized" });
          }
          console.log(user); 
          req.user = user;
          return next();
        });
      }
    } catch (e) {
      return res.status(401).json({ message: "User not authorized" });
    }
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" });
  }
};

export default verifyToken;