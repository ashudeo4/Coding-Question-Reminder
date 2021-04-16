const mongoose = require("mongoose");

const UserQuestionSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  dateReminder: [{ type: Date }],
});

module.exports = mongoose.model("userquestion", UserQuestionSchema);
