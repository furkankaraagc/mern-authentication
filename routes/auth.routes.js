const express = require("express");
const { protect } = require("../middleware/auth.middleware");

const {
  register,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth.contoller");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.post("/forgotPassword", forgotPassword);
router.put("/resetPassword/:resetToken", resetPassword);

module.exports = router;
