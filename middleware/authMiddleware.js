const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer") // we are doing this becuse this it how it will show  the Bearer the the id
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];
      // so that it will be in an array Bearer is the first array  while the data is the second

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await User.findById(decoded.id).select("-password");
      // we used id becuse that was what we passed to genrate the token and we dont want to add the password that why we remove password

      next();
      // then we end with next
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
