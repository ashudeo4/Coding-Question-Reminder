var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GoogleClientID);
const bcrypt = require("bcryptjs");
const { BadRequest } = require("../utils/errors");
const User = require("../models/Users");
const loginMiddleware = require("../middlewares/auth");

require("dotenv").config();
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

//Register users using google
router.post("/google", async (req, res, next) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GoogleClientID,
    });
    const { name, email, picture } = ticket.getPayload();
    try {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequest("User already exits");
      }
      const savedUser = await User.create({ name, email, picture });
      const payload = { user: { id: savedUser._id } };
      const token = jwt.sign(payload, process.env.JWTSECRET, {
        expiresIn: 36000,
      });
      return res.status(200).json({ token });
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
});

//Register users
router.post("/", async (req, res, next) => {
  const { email, password, password2, name } = req.body;
  console.log(email);
  try {
    let user = await User.findOne({ email });
    if (user) {
      throw new BadRequest("User already exits");
    }
    if (password !== password2) {
      throw new BadRequest("Password do not match");
    }
    user = new User({
      email,
      password,
      name,
    });
    const salt = bcrypt.genSaltSync(10);
    user.password = await bcrypt.hash(password, salt);
    const savedUser = await user.save();
    const payload = { user: { id: savedUser._id } };
    const token = jwt.sign(payload, process.env.JWTSECRET, {
      expiresIn: 36000,
    });
    return res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
});

//Get all user count
router.get("/count", async (req, res, next) => {
  try {
    const userCount = await User.countDocuments();
    return res.status(200).json({ userCount });
  } catch (err) {
    next(err);
  }
});

//Update Password
router.put("/password", loginMiddleware, async (req, res, next) => {
  try {
    let { password, password2 } = req.body.passwordInfo;
    if (password !== password2) {
      throw new BadRequest("Password does not match");
    }
    const salt = bcrypt.genSaltSync(10);
    password = await bcrypt.hash(password, salt);

    await User.findOneAndUpdate({ _id: req.user.id }, { password });
    return res.status(201).json({ message: "Password updated successfully" });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
