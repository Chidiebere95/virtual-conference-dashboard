const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SponsorSchema = new Schema({
  name: { type: String, required: true, unique: true },
  website: { type: String, required: true, unique: true },
  icon: { type: String, required: true },
  added_by: String,
  published: {
    type: Boolean,
    default: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const SponsorModel = mongoose.model('sponsor', SponsorSchema);

module.exports = SponsorModel;
