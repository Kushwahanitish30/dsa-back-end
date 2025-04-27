const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  name: String,
  problems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }]
});

module.exports = mongoose.model('Topic', topicSchema);
