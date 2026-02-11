const express = require('express');
const {
  getStudentProgress,
  markTopicComplete,
  recordQuizAttempt,
  getAllStudents,
  blockStudent,
  unblockStudent,
  deleteStudent,
  updateTargetExam,
} = require('../controllers/progressController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

// Student routes
router.get('/progress', authMiddleware, roleMiddleware(['student']), getStudentProgress);
router.get('/progress/:studentId', authMiddleware, getStudentProgress);
router.post(
  '/mark-complete/:studentId/:topicId',
  authMiddleware,
  roleMiddleware(['student', 'admin']),
  markTopicComplete
);
router.post('/quiz-attempt/:topicId', authMiddleware, recordQuizAttempt);
router.post('/target-exam', authMiddleware, roleMiddleware(['student']), updateTargetExam);

// Admin routes
router.get('/students', authMiddleware, roleMiddleware(['admin']), getAllStudents);
router.put('/students/:studentId/block', authMiddleware, roleMiddleware(['admin']), blockStudent);
router.put(
  '/students/:studentId/unblock',
  authMiddleware,
  roleMiddleware(['admin']),
  unblockStudent
);
router.delete(
  '/students/:studentId',
  authMiddleware,
  roleMiddleware(['admin']),
  deleteStudent
);

module.exports = router;
