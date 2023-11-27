import jwt from "jsonwebtoken";

const config = process.env.JWT_SECRET_KEY;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]?.split(" ");
  if (req.headers["authorization"]) {
    try {
      if (authHeader[0] !== "Bearer") {
        return res.status(403).json({ message: "Login Required" });
      } else {
        jwt.verify(authHeader[1], config, (err, user) => {
          if (err) {
            return res.status(401).json({ message: err.message }); // Return the error message
          }
          req.user = user;
          return next();
        });
      }
    } catch (e) {
      return res.status(401).json({ message: e.message }); // Return the error message
    }
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" });
  }
};

export default verifyToken;