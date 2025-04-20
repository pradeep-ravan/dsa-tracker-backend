const express = require('express');
const router = express.Router();
const { 
  getTopics, 
  getTopicById, 
  createTopic 
} = require('../controllers/topicController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getTopics)
  .post(protect, createTopic);

router.route('/:id')
  .get(protect, getTopicById);

module.exports = router;