const express = require("express");
const {
  registerUser,
  loginUser,
  listUsers,
  deleteUser,
} = require("../controllers/userController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/login").post(loginUser);
router.route("/:id?").get(listUsers).post(registerUser).delete(deleteUser);

module.exports = router;
