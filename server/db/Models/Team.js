const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'Volunteer',
  },
  img: {
    type: String,
    default:
      'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d53?d=identicon&s=600',
  },
});

const TeamModel = mongoose.model('team', TeamSchema);

module.exports = TeamModel;
