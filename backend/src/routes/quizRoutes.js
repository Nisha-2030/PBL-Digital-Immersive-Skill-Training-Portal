const express = require('express');
const {
  getQuizByTopic,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  submitQuuzAnswer,
} = require('../controllers/quizController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/quiz/:topicId', getQuizByTopic);
router.post('/quiz', authMiddleware, roleMiddleware(['admin']), createQuiz);
router.put('/quiz/:id', authMiddleware, roleMiddleware(['admin']), updateQuiz);
router.delete('/quiz/:id', authMiddleware, roleMiddleware(['admin']), deleteQuiz);
router.post('/quiz/:id/submit', authMiddleware, submitQuuzAnswer);

module.exports = router;
