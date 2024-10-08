const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateTokenHandle = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized, token failed");
      } else {
        console.log("decoded", decoded);
        req.user = decoded.user;
        next();
      }
    });

    if (!token) {
      res.status(401);
      throw new Error("User is not authorized, token failed ");
    }
  }
});

module.exports = validateTokenHandle;
