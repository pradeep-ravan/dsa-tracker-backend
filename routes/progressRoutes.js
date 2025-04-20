const express = require('express');
const router = express.Router();
const { 
  toggleProblemStatus, 
  getUserProgress, 
  getUserProgressByTopic 
} = require('../controllers/progressController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getUserProgress);

router.route('/toggle')
  .post(protect, toggleProblemStatus);

router.route('/topic/:topicId')
  .get(protect, getUserProgressByTopic);

module.exports = router;