const mongoose = require("mongoose");

const quizResultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  quizId: String,

  answers: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },

  accentSystem: {
    type: String,
    enum: ["visinski", "udarni", "miješani"],
    default: "miješani",
  },

  totals: {
    visinski: { type: Number, default: 0 },
    udarni: { type: Number, default: 0 },
    miješani: { type: Number, default: 0 },
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("QuizResult", quizResultSchema);