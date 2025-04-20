const Topic = require('../models/topicModel');

// @desc    Get all topics
// @route   GET /api/topics
// @access  Private
const getTopics = async (req, res) => {
  try {
    const topics = await Topic.find({}).sort({ order: 1 });
    res.json(topics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get topic by ID
// @route   GET /api/topics/:id
// @access  Private
const getTopicById = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    
    if (topic) {
      res.json(topic);
    } else {
      res.status(404).json({ message: 'Topic not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a topic
// @route   POST /api/topics
// @access  Private (Admin only in a real app)
const createTopic = async (req, res) => {
  try {
    const { name, description, order } = req.body;
    
    const topic = await Topic.create({
      name,
      description,
      order
    });
    
    res.status(201).json(topic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getTopics, getTopicById, createTopic };