const express = require('express');
const {
  registerStudent,
  loginStudent,
  loginAdmin,
  getProfile,
} = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/student/register', registerStudent);
router.post('/student/login', loginStudent);
router.post('/admin/login', loginAdmin);
router.get('/profile', authMiddleware, getProfile);

module.exports = router;
