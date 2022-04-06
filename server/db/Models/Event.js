const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
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
  sponsors: [
    {
      type: Schema.Types.ObjectId,
      ref: 'sponsor',
    },
  ],
});

const EventModel = mongoose.model('event', EventSchema);

module.exports = EventModel;
