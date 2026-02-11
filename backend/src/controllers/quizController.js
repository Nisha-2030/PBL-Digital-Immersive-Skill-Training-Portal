const Quiz = require('../models/Quiz');

const getQuizByTopic = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ topic: req.params.topicId }).populate('topic');
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createQuiz = async (req, res) => {
  try {
    const { topic, questions } = req.body;

    const quiz = new Quiz({
      topic,
      questions,
    });

    await quiz.save();

    // Add quiz to topic
    const Topic = require('../models/Topic');
    await Topic.findByIdAndUpdate(topic, { $push: { quizzes: quiz._id } });

    res.status(201).json({ message: 'Quiz created successfully', quiz });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateQuiz = async (req, res) => {
  try {
    const { questions } = req.body;

    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      { questions },
      { new: true }
    );

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    res.json({ message: 'Quiz updated successfully', quiz });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    // Remove quiz from topic
    const Topic = require('../models/Topic');
    await Topic.findByIdAndUpdate(quiz.topic, { $pull: { quizzes: quiz._id } });

    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const submitQuuzAnswer = async (req, res) => {
  try {
    const { answers } = req.body;
    const quizId = req.params.id;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    let score = 0;
    const results = [];

    quiz.questions.forEach((question, index) => {
      const isCorrect = answers[index] === question.correctAnswer;
      if (isCorrect) score++;

      results.push({
        questionText: question.text,
        userAnswer: question.options[answers[index]],
        correctAnswer: question.options[question.correctAnswer],
        explanation: question.explanation,
        isCorrect,
      });
    });

    res.json({
      score,
      totalQuestions: quiz.questions.length,
      percentage: ((score / quiz.questions.length) * 100).toFixed(2),
      results,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getQuizByTopic,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  submitQuuzAnswer,
};
