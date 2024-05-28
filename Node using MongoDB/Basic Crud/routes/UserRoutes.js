const express = require("express");
const route = express.Router();

const {
  FetchUser,
  RegisterUser,
  LoginUser,
  UpdateUser,
  deleteUser
} = require("../controllers/Users");

route.get("/",FetchUser);
route.post("/register", RegisterUser);
route.post("/login", LoginUser);
route.put("/update/:id", UpdateUser);
route.delete("/delete/:id", deleteUser);

module.exports = route;