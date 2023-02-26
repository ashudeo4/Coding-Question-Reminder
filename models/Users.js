const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: false,
    default: "noProfilePicture",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  questionsCompleted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userquestion",
    },
  ],
});

module.exports = mongoose.model("user", UserSchema);
