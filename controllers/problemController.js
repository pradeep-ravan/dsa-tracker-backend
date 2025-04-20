const Problem = require('../models/problemModel');

// @desc    Get all problems
// @route   GET /api/problems
// @access  Private
const getProblems = async (req, res) => {
  try {
    const problems = await Problem.find({}).sort({ order: 1 });
    res.json(problems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get problems by topic ID
// @route   GET /api/problems/topic/:topicId
// @access  Private
const getProblemsByTopic = async (req, res) => {
  try {
    const problems = await Problem.find({ topicId: req.params.topicId }).sort({ order: 1 });
    res.json(problems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get problem by ID
// @route   GET /api/problems/:id
// @access  Private
const getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    
    if (problem) {
      res.json(problem);
    } else {
      res.status(404).json({ message: 'Problem not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a problem
// @route   POST /api/problems
// @access  Private (Admin only in a real app)
const createProblem = async (req, res) => {
  try {
    const { 
      title, 
      description, 
      topicId, 
      difficulty, 
      youtubeLink, 
      leetcodeLink, 
      codeforceLink, 
      articleLink,
      order 
    } = req.body;
    
    const problem = await Problem.create({
      title,
      description,
      topicId,
      difficulty,
      youtubeLink,
      leetcodeLink,
      codeforceLink,
      articleLink,
      order
    });
    
    res.status(201).json(problem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { 
  getProblems, 
  getProblemsByTopic, 
  getProblemById, 
  createProblem 
};