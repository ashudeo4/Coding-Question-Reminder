const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["EASY", "MEDIUM", "HARD"],
    default: "EASY",
    required: true,
  },

  type: {
    type: String,
    enum: ["CUSTOM", "ALGOEXPERT", "LEETCODE"],
    default: "CUSTOM",
  },
});

module.exports = mongoose.model("question", QuestionSchema);
