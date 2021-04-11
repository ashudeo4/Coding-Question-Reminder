var express = require("express");
var router = express.Router();
const User = require("../models/Users");
const Question = require("../models/Questions");
const { BadRequest } = require("../utils/errors");

router.post("/", async (req, res, next) => {
  try {
    const { name, level, url } = req.body;
    const questionData = {
      name: name.substring(name.indexOf(" ")),
      difficulty: level.toUpperCase(),
      link: url,
    };
    await Question.create(questionData);
    res.status(201).json({ message: "Question Added" });
  } catch (err) {
    next(err);
  }
});

router.get("/:type", async (req, res, next) => {
  try {
    const { type } = req.params;
    const questionData = await Question.find({ type: type.toUpperCase() });
    if (questionData.length == 0) {
      throw new BadRequest(`No question available for ${type} platform`);
    }
    return res
      .status(200)
      .json({ questionData, totalQuestion: questionData.length });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
