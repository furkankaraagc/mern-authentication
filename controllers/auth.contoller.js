const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendMail = require("../utils/sendMail");

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const user = await new User({
      username,
      email,
      password,
    });

    user.password = await bcrypt.hash(user.password, 10);
    await user.save();
    sendToken(user, 201, res);
  } catch (error) {
    if (error.code === 11000) {
      res.status(500).json({
        success: false,
        error: error.message,
        message: "An account with this email already exists ",
      });
    } else {
      res.status(500).json({
        success: false,
        error: error.message,
        message: "Please enter a valid email",
      });
    }
  }
};
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(400)
      .json({ success: false, error: "please provide username and password" });
  }
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: "invalid credentials" });
    }

    async function checkUser(password) {
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res
          .status(404)
          .json({ success: false, error: "password does not match" });
      }

      sendToken(user, 200, res);
    }
    checkUser(password);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "user does not found" });
    }
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpire = Date.now() + 100 * (60 * 1000);

    await user.save();
    const resetUrl = `http://localhost:3000/resetPassword/${resetPasswordToken}`;
    const message = `
    <h1>You have requested a password reset </h1>
    <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;
    try {
      await sendMail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });
      res
        .status(200)
        .json({ success: true, data: "Email Sent.Please check your email." });
    } catch (error) {
      console.log(error);

      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();
      res.status(500).json({ error: "Email could not be sent2" });
    }
  } catch (error) {
    next(error);
  }
};
exports.resetPassword = async (req, res, next) => {
  const resetPasswordToken = req.params.resetToken;

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ error: "invalid token" });
    }

    user.password = await bcrypt.hash(req.body.password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    //jwt leri modele ekle
    console.log("kayıtsonrası");
    res.status(201).json({
      success: true,
      data: "password updated",
      token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "2h",
      }),
    });
  } catch (error) {
    res.status(404).json(error);
  }
};

const sendToken = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
  res.status(statusCode).json({ success: true, token: token });
};
