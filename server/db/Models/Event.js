const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  starts: {
    type: Date,
    required: true,
  },
  start_time: {
    type: String,
    required: true,
  },
  ends: {
    type: Date,
    required: true,
  },
  end_time: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  image: {
    type: String,
  },
  published: {
    type: Boolean,
    default: false,
  },
  sponsors: [
    {
      type: Schema.Types.ObjectId,
      ref: 'sponsor',
    },
  ],
});

const EventModel = mongoose.model('event', EventSchema);

module.exports = EventModel;
