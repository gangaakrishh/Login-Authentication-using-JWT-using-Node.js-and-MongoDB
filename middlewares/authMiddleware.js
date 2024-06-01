const jwt = require("jsonwebtoken");
const expressAsyncHandler = require("express-async-handler");
const UserModel = require("../models/UserModel");

const authMiddleware = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req?.headers?.authorization?.split(" ")[1];
    try {
      req.user = jwt.verify(token, process.env.jwtSecret);
      next();
    } catch (error) {
      const err = new Error("Token Expired or Not authorized");
      err.statusCode = 401;
      throw err;
    }
  } else {
    const error = new Error("There is no token attached to the Header");
    error.statusCode = 401;
    throw error;
  }
});

const isAdmin = expressAsyncHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.user._id);
  if (user.type === "admin") {
    next();
  } else {
    const error = new Error("You dont have access");
    error.statusCode = 403;
    throw error;
  }
});

module.exports = { authMiddleware, isAdmin };