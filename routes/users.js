var express = require("express");
var router = express.Router();
const config = require("config");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(config.get("googleCliendId"));
const { BadRequest } = require("../utils/errors");
const User = require("../models/Users");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

//Register users
router.post("/", async (req, res, next) => {
  console.log("register");
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: config.get("googleCliendId"),
  });
  const { name, email, picture } = ticket.getPayload();
  try {
    const user = await User.findOne({ email });
    if (user) {
      throw new BadRequest("User already exits");
    }
    const savedUser = await User.create({ name, email, picture });
    const payload = { user: { id: savedUser._id } };
    const token = await jwt.sign(payload, config.get("jwtSecret"), {
      expiresIn: 36000,
    });
    return res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
