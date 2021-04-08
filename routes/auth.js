var express = require("express");
var router = express.Router();
const config = require("config");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(config.get("googleCliendId"));
const User = require("../models/Users");
const { BadRequest } = require("../utils/errors");

router.post("/google", async (req, res, next) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: config.get("googleCliendId"),
  });
  const { email } = ticket.getPayload();
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new BadRequest("You are not signed up");
    }
    const payload = { user: { id: user._id } };
    const token = await jwt.sign(payload, config.get("jwtSecret"), {
      expiresIn: 36000,
    });
    return res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
