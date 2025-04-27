const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  name: String,
  description: String,
  youtubeLink: String,
  leetcodeLink: String,
  codeforcesLink: String,
  articleLink: String,
  level: { type: String, enum: ['Easy', 'Medium', 'Hard'] }
});

module.exports = mongoose.model('Problem', problemSchema);
