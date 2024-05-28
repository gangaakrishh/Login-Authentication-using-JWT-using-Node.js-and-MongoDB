const jwt = require("jsonwebtoken");

const generateToken = (data) => {
  return jwt.sign(data, process.env.jwtSecret, { expiresIn: "1d" });
};

module.exports = generateToken;
