const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SpeakerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    default: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const SpeakerModel = mongoose.model('speaker', SpeakerSchema);

module.exports = SpeakerModel;
