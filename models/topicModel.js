const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    required: true
  }
});

const Topic = mongoose.model('Topic', topicSchema);
module.exports = Topic;