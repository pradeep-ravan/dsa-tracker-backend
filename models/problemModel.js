const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  youtubeLink: {
    type: String
  },
  leetcodeLink: {
    type: String
  },
  codeforceLink: {
    type: String
  },
  articleLink: {
    type: String
  },
  order: {
    type: Number,
    required: true
  }
});

const Problem = mongoose.model('Problem', problemSchema);
module.exports = Problem;