const Progress = require('../models/progressModel');
const Problem = require('../models/problemModel');

// @desc    Toggle problem completion status
// @route   POST /api/progress/toggle
// @access  Private
const toggleProblemStatus = async (req, res) => {
  try {
    const { problemId } = req.body;
    const userId = req.user._id;

    // Find existing progress
    let progress = await Progress.findOne({ userId, problemId });

    if (progress) {
      // Toggle completion status
      progress.completed = !progress.completed;
      progress.completedAt = progress.completed ? Date.now() : null;
      await progress.save();
    } else {
      // Create new progress entry
      progress = await Progress.create({
        userId,
        problemId,
        completed: true,
        completedAt: Date.now()
      });
    }

    res.json(progress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user progress for all problems
// @route   GET /api/progress
// @access  Private
const getUserProgress = async (req, res) => {
  try {
    const userId = req.user._id;
    const progress = await Progress.find({ userId });
    res.json(progress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user progress by topic
// @route   GET /api/progress/topic/:topicId
// @access  Private
const getUserProgressByTopic = async (req, res) => {
  try {
    const userId = req.user._id;
    const topicId = req.params.topicId;
    
    // Get all problems in the topic
    const problems = await Problem.find({ topicId });
    
    if (problems.length === 0) {
      return res.json([]);
    }
    
    // Get progress for these problems
    const problemIds = problems.map(p => p._id);
    const progress = await Progress.find({ 
      userId, 
      problemId: { $in: problemIds } 
    });
    
    res.json(progress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { 
  toggleProblemStatus, 
  getUserProgress, 
  getUserProgressByTopic 
};