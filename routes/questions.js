var express = require("express");
var router = express.Router();
const User = require("../models/Users");
const UserQuestions = require("../models/UserQuestions");
const loginMiddleware = require("../middlewares/auth");
const Question = require("../models/Questions");
const { BadRequest } = require("../utils/errors");
const getTodayQuestion = require("../utils/getTodayQuestion");
const Questions = require("../models/Questions");
router.post("/", async (req, res, next) => {
  try {
    const { name, level, url } = req.body;
    const questionData = {
      name: name.substring(name.indexOf(" ")),
      difficulty: level.toUpperCase(),
      link: url,
      type: "LEETCODE",
    };
    await Question.create(questionData); //changing for Algoexpert
    res.status(201).json({ message: "Question Added" });
  } catch (err) {
    next(err);
  }
});
router.get("/todayQuestions", loginMiddleware, async (req, res, next) => {
  try {
    const userQuestions = await UserQuestions.find({ userId: req.user.id });
    const userQuestionIds = getTodayQuestion(userQuestions);
    console.log(userQuestionIds);
    const userQuestionsPromise = userQuestionIds.map((id) =>
      Questions.findOne({ _id: id })
    );
    const todayQuestions = await Promise.all(userQuestionsPromise);
    return res.status(200).json({ todayQuestions });
  } catch (err) {
    console.log(err);
    next(err);
  }
});
router.get("/user", loginMiddleware, async (req, res, next) => {
  try {
    const userQuestions = await UserQuestions.find({ userId: req.user.id });
    return res.status(200).json(userQuestions);
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

router.post("/reminder/:userId/:questionId", async (req, res, next) => {
  try {
    const questionExists = await UserQuestions.findOne({
      questionId: req.params.questionId,
      userId: req.params.userId,
    });
    if (questionExists) {
      throw new BadRequest("Already reminder has been set");
    }
    const { nextThreeDays, nextSevenDays, nextThirtyDays } = req.body;

    const reminderData = new UserQuestions({
      questionId: req.params.questionId,
      userId: req.params.userId,
      status: true,
      type: req.body.type,
    });
    reminderData.dateReminder.push(
      nextThreeDays,
      nextSevenDays,
      nextThirtyDays
    );
    const savedReminder = await reminderData.save();
    const userData = await User.findOne({
      _id: req.params.userId,
    });
    userData.questionsCompleted.push(savedReminder._id);
    await userData.save();
    return res.status(201).json({ message: "Reminder set" });
  } catch (err) {
    next(err);
  }
});
router.put("/reminder/:userId/:questionId", async (req, res, next) => {
  try {
    const deletedData = await UserQuestions.findOneAndDelete({
      userId: req.params.userId,
      questionId: req.params.questionId,
    });
    const userData = await User.findOne({ _id: req.params.userId });
    const removedArray = userData.questionsCompleted.filter((quesid) => {
      return quesid.toString() !== deletedData._id.toString();
    });
    userData.questionsCompleted = removedArray;
    await userData.save();
    return res.status(200).json({ message: "Reminder removed" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
