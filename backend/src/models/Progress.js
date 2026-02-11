const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Topic',
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    quizAttempts: [
      {
        score: Number,
        totalQuestions: Number,
        attemptedAt: Date,
        answers: [Number],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Progress', progressSchema);
