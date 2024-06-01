const expressAsyncHandler = require("express-async-handler");
const { User } = require("../services/userService");
const generateToken = require("../config/jwtToken");
const user = new User();
const registerUser = expressAsyncHandler(async (req, res) => {
  try {
    const response = await user.register(req.body);
    res.json({
      status: true,
      message: "Register Successfully",
    });
  } catch (error) {
    throw new Error(error);
  }
});
const loginUser = expressAsyncHandler(async (req, res) => {
  try {
    const response = await user.login(req.body);
    res.json({
      status: true,
      message: "Login Successfully",
      token: generateToken(response),
    });
  } catch (error) {
    throw new Error(error);
  }
});
const listUsers = expressAsyncHandler(async (req, res) => {
  try {
    const response = await user.findAll();
    res.json({
      status: true,
      message: "Data Fetched Successfully",
      data: response.rows,
      count: response.count,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteUser = expressAsyncHandler(async (req, res) => {
  try {
   const remove = await user.delete(req.params.id)
   res.json({
    status : true,
    message : "User Deleted Successfully"
   })
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { registerUser, loginUser, listUsers, deleteUser };
