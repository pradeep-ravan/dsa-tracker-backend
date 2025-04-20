const express = require('express');
const router = express.Router();
const { 
  getProblems, 
  getProblemsByTopic, 
  getProblemById, 
  createProblem 
} = require('../controllers/problemController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getProblems)
  .post(protect, createProblem);

router.route('/:id')
  .get(protect, getProblemById);

router.route('/topic/:topicId')
  .get(protect, getProblemsByTopic);

module.exports = router;